import type { WritingArticle } from "@/types/content";

export const versaMlops: WritingArticle = {
  title: "From a naive POC training pipeline to automated model serving in live customer clusters: an MLOps story",
  date: "Draft · Oct 2026",
  excerpt: "From a naive POC training pipeline to automated model serving in live customer clusters",
  link: "/writing/versa-mlops/",
  status: "published",
  body: `My first task on this project at Versa Networks was to turn an existing machine learning training pipeline into an Argo workflow in our POC cluster. By the end, I was owning the path from a training run to a model running in a customer serving environment: publication, delivery, activation, readiness, and recovery.

The model was a killchain classifier used by our User and Entity Behavior Analytics (UEBA) service. The training pipeline and classifier came from the data science work; my responsibility was to make that work repeatable on Kubernetes and design the infrastructure around how its outputs reached serving.

That distinction mattered. A successful training run could produce the right files and still leave the deployment problem unsolved. How would an existing cluster discover a new model? What would happen if only half the release arrived? Could a failed update leave the previous model serving?

Following those questions is what expanded the project. This post walks through the decisions I made, the feedback that changed the design, and what I was able to verify in the POC environment.

## Starting with the training workflow

The original pipeline loaded MITRE ATT&CK data into an ArangoDB graph, trained technique embeddings with node2vec, generated training sequences, trained a BiLSTM classifier with attention, and exported an ONNX model with its supporting JSON files.

I mapped that work into an Argo DAG and added a sixth step for publication:

\`\`\`text
01 Load the technique graph
   ├── 02 Train embeddings
   └── 03 Generate sequences
       └── 04 Train the classifier (needs both 02 and 03)
           └── 05 Export the model bundle
               └── 06 Publish the release
\`\`\`

Steps 02 and 03 could run in parallel. The graph lived in ArangoDB, while the file outputs between later steps lived on a shared persistent volume. I used a ReadWriteMany volume so separate pods could share those artifacts, including when scheduled on different nodes, and prevented overlapping scheduled runs from writing into the same workspace.

The persistent workspace also made partial runs useful. I could rerun training or export without rebuilding every earlier output. But it introduced a subtle safety problem: files left by a previous run still existed after a later run failed. Allowing skipped or omitted dependencies was necessary for partial execution; treating an omitted export as permission to publish was dangerous. I made publication require a successful export unless an operator explicitly opted into publishing the existing artifacts.

I packaged the six steps in one image because they shared dependencies and a filesystem contract. Each step invoked its Python entry point directly. That kept workflow YAML focused on orchestration and avoided interpolating workflow parameters into shell commands. One image also meant one dependency resolution and one digest pin for the whole pipeline.

Some of the work was less visible than the DAG. A volume could provision successfully and still fail to mount because its backing storage was on the wrong network. Running the containers as a non-root user required the shared volume's group permissions to match. Those were useful reminders that a rendered workflow and a runnable workflow are different milestones.

## The model needed its own release lifecycle

The serving service originally received its model through files baked into its container image. Retraining therefore meant rebuilding the service image through Jenkins, even when the application code had not changed.

That coupling became the next problem I took on. The deployment architecture included Versa-managed cloud, customer-managed cloud, and on-prem Kubernetes environments. I wanted the model to have its own version while preserving the service's existing startup and rollout behavior.

I separated two decisions:

- **Publication:** make a complete, immutable model release available.
- **Activation:** choose which release a particular serving deployment should run.

The publisher wrote releases under \`models/<version>/\`. A manifest recorded each file's name, size, and SHA-256, along with the bundle digest and compatibility metadata. A small channel document at \`channels/stable.json\` named the selected version and digest.

The channel pointer moved only after the release files had been committed and verified. If publication failed halfway through, channel-following deployments kept seeing the previous release. An incomplete version prefix could remain after an abrupt failure, but it would not become the channel's target.

I also replaced publish locks with an atomic version claim. In GCS, the publisher created the version's manifest with a create-only precondition; only the winner could write that release. This uses GCS's [generation-match preconditions](https://docs.cloud.google.com/storage/docs/request-preconditions). The channel update then used compare-and-swap against its current generation.

That ordering has an important consequence: a manifest can exist before every file has arrived. Its presence alone does not prove a release is complete. The channel moves last, and a caller addressing a version directly still has to verify the entire bundle.

The publisher was Python and the delivery code was Go, so the digest format had to be a shared protocol. Both implementations hashed file records sorted by name, using the same name, hash, and size encoding. A shared golden fixture checked that both languages produced the same bundle digest.

At this stage, \`stable\` meant a completely published release. It did not mean the model had passed an accuracy threshold. Model-quality gating and staged promotion remained separate work; readiness and checksums could not answer that question.

## Feedback changed the storage boundary

![Model delivery architecture showing the training cluster, immutable release store, shared Deployment API, and per-customer activator and serving pods.](/writing/killchain/model-delivery-architecture.png)

*The final delivery boundary. Serving workloads read through the shared Deployment API. Select the diagram to view it at full size.*

My initial design had the customer-side delivery components pull releases from the model bucket directly. Feedback from my engineering manager and mentors made me reconsider that boundary: a customer deployment should not need to know how or where the platform stored its models.

I moved the reads behind the existing onboarding Deployment API and implemented three token-gated endpoints:

\`\`\`text
GET /killchain/model/channels/{channel}
GET /killchain/model/releases/{version}/manifest
GET /killchain/model/releases/{version}/files/{name}
\`\`\`

The first two returned the stored JSON documents; the third streamed the requested file. The API checked authentication and path parameters, while the delivery client validated manifests, compatibility, and downloaded bytes.

I followed the service's existing ports-and-adapters architecture. Its storage port already described how to open an object, and the provider adapter handled the cloud-specific operation. The model-release service could build the application path and return a reader through that port without making GCS part of the caller's interface.

Serving namespaces received an API address and a platform token. They received no bucket reference or GCS credential, and I removed the GCS backend and cloud-storage dependencies from the delivery image. The inference process itself made no model-store calls; it consumed local files.

This was a concrete change in responsibility. Storage access belonged to the platform API, release selection belonged to the activator, and file installation belonged to the fetcher. It also exposed an accepted limitation: the credential was shared at the platform level, so this was not a claim of per-tenant authorization isolation.

## A CronJob selects; an init container installs

I built the delivery component as two Go binaries in one image. They shared manifest and compatibility code, but had different jobs and permissions.

The **activator** ran as a namespace CronJob. It resolved a target, checked the manifest, recorded progress, and patched the serving Deployment's pod-template annotations with the model version and bundle digest. Kubernetes then performed the rolling update.

The **fetcher** ran as an init container in each replacement pod. It downloaded the exact pinned release into a staging directory, checked file sizes and hashes, and renamed the completed directory into place. It also checked the bundle schema, ONNX opset, and minimum API version before installation. The API started against those local files.

I created a Helm chart for the training workflow and extended the existing serving chart with the activator, init container, model state, scoped RBAC, and rollout settings. Cluster-specific values stayed in configuration rather than being baked into the templates. Delivery was optional in the existing chart, so I also checked that disabling it preserved the original workload without the delivery resources.

An [init container](https://kubernetes.io/docs/concepts/workloads/pods/init-containers/) gave me the startup ordering this required: installation had to complete before the application container started. The existing application already loaded its classifier at startup, and retraining was infrequent. A permanent delivery sidecar would have added another lifecycle to coordinate; changing files under a running process would also have required a model-reload contract.

I considered a dedicated inference server such as Triton. Its [explicit model-control mode](https://docs.nvidia.com/deeplearning/triton-inference-server/user-guide/docs/user_guide/model_management.html) separates model availability from loading, but adopting it would have changed the existing serving integration. For this project, a pinned startup load and rolling replacement fit the workload.

Both deployment modes used the same recurring activator:

- **Track stable:** resolve the channel and then its release manifest on each tick.
- **Pinned:** resolve the release declared in configuration, without following the channel.

An operator could also run the activator as a one-shot Job. Taking an operator hold prevented the next scheduled tick from restoring the standing target. That distinction kept a temporary override from silently becoming permanent configuration.

The polling interval was five minutes by default. I accepted that delay because updates were infrequent and the serving environment could initiate its own requests. A push path would have added environment-specific notification infrastructure and connectivity assumptions. A fresh install could wait up to one tick for its first pin; an upgrade could keep existing replicas serving during that wait.

## The version had to belong to the pod

The most consequential correction was where a pod learned its desired model version.

Initially, the containers read that value from a shared ConfigMap. This seemed natural because the activator already used it for state. But imagine a healthy pod on version A while the ConfigMap has advanced to version B. If B is bad, the old pod should keep serving A. A container restart could instead reread B from the ConfigMap and compare it with the A files already on disk. A replacement from the old ReplicaSet could likewise fetch B.

Keeping the old replicas alive during a rollout was not enough if a restart could change what those replicas thought they should run.

The desired version and digest were already present in the pod-template annotations as the rollout trigger. I changed both the fetcher and API to read their own pod's annotations through the [Downward API](https://kubernetes.io/docs/concepts/workloads/pods/downward-api/). For example:

\`\`\`yaml
- name: MODEL_DESIRED_VERSION
  valueFrom:
    fieldRef:
      fieldPath: metadata.annotations['killchain.versa.com/model-version']
\`\`\`

Each ReplicaSet now carried the version its pods were created to run. Updating the Deployment template selected a version for new pods without changing the identity of the old ones.

This also made ownership clearer. Helm rendered the static field references; the activator owned the model annotations. I avoided having Helm and the activator both write the selected version into the same environment-variable fields.

I moved the activation timestamp out of the pod template as well. A fresh timestamp made every activation, including rollback, produce a different template hash. With only the version and digest changing, restoring the previous model could reproduce the previous good template and let Kubernetes reuse its ReplicaSet.

I still retained an explicit last-good record. Deployment history records previous templates, not which one actually passed readiness. A manual rollout undo also needed a hold; otherwise the activator could immediately reassert the failed target.

## Readiness and recovery completed the delivery path

![Sequence diagram showing onboarding, immutable publication, scheduled activation, verified pod installation, readiness, and rollback to the last-good release.](/writing/killchain/publication-activation-recovery.png)

*Publication, activation, rollout, and recovery are separate transitions. Select the diagram to view it at full size.*

For model-required deployments, I added readiness that checked whether the classifier had loaded and whether its loaded version and digest matched the pod's desired version and digest. A running process with the wrong model was not ready.

The serving chart required at least two replicas when delivery was enabled and used \`maxUnavailable: 0\`. Together, these mechanisms let healthy old replicas remain in service while replacements fetched and loaded the new release. They protected availability during the tested update failures; they did not validate prediction quality or guarantee availability through unrelated node failures.

If a rollout failed to converge before its deadline and a last-good release existed, the activator attempted one rollback. After successful recovery it held the failed target rather than retrying it every five minutes. A different stable version could clear the automatic hold; an operator hold required an explicit operator action. If rollback itself failed, the controller recorded the failure and stopped retrying blindly.

That recovery depended on having established a last-good baseline. The first activation had no previous runtime-delivered release to restore.

I evaluated Argo Rollouts here because it could replace some of my deadline and rollback logic. It supports [bounded abort behavior](https://argo-rollouts.readthedocs.io/en/stable/features/specification/) as well as progressive delivery, so dismissing it as useful only for canaries would have been unfair.

The deciding cost was operational: it would require a controller and CRDs in every serving cluster. Argo Workflows in the training cluster did not supply that dependency in customer clusters. Rollouts also would not remove external release resolution, bundle verification, or operator holds. For this scope, I kept native Deployments and the smaller model-specific reconciler. I would revisit that decision if we needed metric-driven canaries or the serving environments already operated Rollouts.

## What the environment tests taught me

I verified the delivery path in the POC cluster, including channel tracking, pinned activation, rollback, operator holds, ReplicaSet reuse, and model-aware readiness. An eight-scenario delivery validation pass also covered authentication, onboarding, upgrades, credential modes, and failure handling.

One upgrade test made the availability behavior tangible. Missing Vault access left the replacement ReplicaSet blocked in initialization for roughly 200 seconds. The old replicas kept serving. After the access grant was reapplied, the deployment converged without dropping below two ready replicas.

A fresh-platform test found a different class of problem. The Deployment API needed the platform token before its injected secrets could finish initializing, but the token was originally created during namespace onboarding. That could make the first onboarding attempt fail because the API was not ready yet. An upgrade with an old ReplicaSet still serving could hide the dependency.

I moved token creation into the platform bootstrap before Helm started the API, preserving an existing token on reinstall. The fix passed offline checks, but the recorded evidence still required a fresh-cluster rerun. That distinction was part of evaluating the result, not a detail to smooth over.

I also kept the rollout coordination work separate from the model-delivery mechanics. The feature had to integrate with parallel API changes, preserve the existing classifier interface, and remain reviewable. I separated training, orchestration, and delivery changes for review, then brought them together on the shared integration line. Owning the feature included making the changes understandable to the engineers who would merge and operate them.

The result was a training and publication workflow running in the POC environment, plus a delivery path exercised against real serving Deployments without rebuilding the API image for each model change. The recorded upgrade and recovery scenarios preserved serving capacity. That was evidence for the rollout design in that environment, not evidence of a fleet-wide customer production rollout.

Other checks remained open in the notes, including GPU training, observing the parallel steps on different nodes, and live validation of some partial-run paths. Fully disconnected artifact delivery and model-quality promotion were also outside the completed scope.

## What I would carry into the next project

What drew me further into this project was the handoff after training. Every time I followed the output one step closer to serving, there was another concrete question to resolve: which version was selected, which bytes arrived, which process loaded them, and who owned recovery.

The feedback on storage access changed the architecture more than adding another component would have. It made the application boundary explicit and removed cloud-specific responsibilities from customer workloads. The restart case taught me to look for state that sat outside the object Kubernetes actually versioned.

If I were starting again, I would define the release contract and ownership boundaries earlier, and test a truly fresh platform alongside upgrades from the beginning. I would also plan model-quality gates and staged promotion before expanding automatic channel following to more deployments.

I began with a workflow around training scripts. I left with a much more concrete understanding of engineering ownership: following an artifact through every handoff, deciding what each component promises, and checking those promises in the environment where they have to hold.`,
};
