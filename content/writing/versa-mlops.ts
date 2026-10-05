import type { WritingArticle } from "@/types/content";

export const versaMlops: WritingArticle = {
  title: "An MLOps story",
  date: "Draft · Oct 2026",
  excerpt: "From a naive POC training pipeline to automated model serving in live customer clusters",
  link: "/writing/versa-mlops/",
  status: "published",
  body: `My third project at Versa Networks started with a fairly small task: take an existing machine learning training pipeline and make it something my senior engineer could reliably trigger and schedule inside our Kubernetes development environment.

The model was a killchain classifier used by our User and Entity Behavior Analytics (UEBA) service to classify security activity across stages of an attack lifecycle.

The training pipeline and classifier came from the data science work. My responsibility was to make that work repeatable on Kubernetes and design the infrastructure around how its outputs reached serving.

That distinction mattered more as the project went on. A successful training run could produce the right files while leaving the deployment problem mostly unanswered.

> Which model should an existing cluster run?\\
> How does it discover a new one?\\
> What happens if only part of a release arrives?\\
> If an update fails, can the previous model keep serving?

Following those questions widened the project from a training workflow into our team's first end-to-end MLOps delivery path.

This post is mostly about that progression, and the architecture changes that came from trying to make each handoff explicit.

---

## Starting with the training workflow

The original pipeline loaded MITRE ATT&CK data into a graph database, trained technique embeddings with node2vec, generated training sequences, trained a BiLSTM classifier with attention, and exported an ONNX model with its supporting JSON files.

I mapped that work into an Argo DAG and added publication as the final step.

\`\`\`text
01 Load the technique graph
   ├── 02 Train embeddings
   └── 03 Generate sequences
       └── 04 Train the classifier
           └── 05 Export the model bundle
               └── 06 Publish the release
\`\`\`

![Argo workflow showing a successful training run from graph loading through model publication.](/writing/killchain/argo-training-workflow.png "A successful run of the training and publication workflow.")

Steps 02 and 03 could run in parallel. ArangoDB held the graph, while intermediate file outputs lived on a shared persistent volume.

I used a \`ReadWriteMany\` volume so workflow pods could share artifacts even when Kubernetes placed them on different nodes. Each run also received its own workspace so two scheduled runs could not mutate the same intermediate files.

I kept all six stages in one image because they shared dependencies and the same filesystem contract. Each Argo step called a different Python entry point. This kept the workflow YAML focused on orchestration and gave the pipeline one dependency resolution and one image digest to manage.

Some of the more useful problems appeared outside the DAG. A volume could provision correctly and still fail to mount because its backing storage was on the wrong network. Running containers as non-root exposed shared-volume permission assumptions. Resource configuration also had to avoid assuming that every environment had the same GPU capacity.

> A valid workflow graph and a workflow you can ship are different milestones.

I packaged the workflow and supporting Kubernetes resources into a Helm chart that was eventually integrated into our product release infrastructure.

At that point, the training workflow had a reliable output.

The output was still just a set of files.

---

## The model needed its own release lifecycle

The serving service originally received its classifier through files baked directly into its container image.

Retraining therefore meant rebuilding the service through Jenkins even when none of the application code had changed.

The deployment environments also varied: Versa-managed cloud, customer-managed cloud, and on-prem Kubernetes. I wanted the model to have a lifecycle independent from the service while preserving the service's existing startup and rollout behavior.

I separated two decisions.

> **Publication:** make a complete, immutable model release available.\\
> **Activation:** choose which release a particular serving deployment should run.

![Architecture diagram showing separate model publication and activation paths.](/writing/killchain/model-delivery-architecture.png "The model has its own release lifecycle, while serving workloads consume it through a separate activation and delivery path.")

The publisher wrote immutable versions under \`models/<version>/\`. A manifest contained the expected files, their sizes and SHA-256 hashes, a bundle digest, and compatibility metadata.

A small \`channels/stable.json\` document pointed to the currently selected release.

The important rule was simple.

> **The channel moves last.**

If publishing v43 failed halfway through, an incomplete v43 could remain in storage, but \`stable\` would continue pointing to the previous complete release.

I originally used publish locks, then replaced them with storage-level atomic operations. The publisher claimed a version using a create-only GCS precondition, while the channel update used compare-and-swap against the current object generation.

That also meant:

> manifest exists does not necessarily mean release is complete.

A caller addressing a version directly still had to verify the complete bundle.

The publisher was Python and the delivery path was Go, so the bundle digest became a small protocol between the two. Both implementations hashed file records in the same deterministic order, and a shared golden fixture checked that they agreed.

\`stable\` also had a deliberately narrow meaning. It meant the artifact was completely published. It did not mean the new classifier was more accurate.

Model-quality gating and artifact integrity were separate concerns.

---

## A CronJob selects; an init container installs

The delivery component became two Go binaries packaged in the same image.

They shared manifest and compatibility code, but their responsibilities were intentionally different.

The activator ran as a namespace-level CronJob. It resolved the desired model, checked its manifest, recorded progress, and patched the serving Deployment's pod-template annotations with the model version and bundle digest.

\`\`\`text
model.version = v43
model.digest = sha256:8f...
\`\`\`

Changing the pod template caused Kubernetes to create a new ReplicaSet.

The model update could therefore reuse the rollout mechanism Kubernetes already provided instead of introducing a separate deployment system.

The fetcher ran as an init container in each replacement pod.

Its input was much smaller.

\`\`\`text
desired version: v43
desired digest: sha256:8f...
\`\`\`

It downloaded exactly that release into a staging directory, checked file sizes and hashes, validated compatibility information such as the bundle schema and ONNX opset, and renamed the completed directory into place.

Only then could the application container start.

The useful boundary was:

\`\`\`text
Activator:
"What should this deployment run?"

Fetcher:
"Do I have exactly that release on disk?"

Application:
"Load the files already on disk."
\`\`\`

I extended the existing serving Helm chart with the activator, init container, model state, scoped RBAC, and rollout settings. Cluster-specific details stayed in values rather than templates, and disabling model delivery preserved the original workload.

### Why rolling delivery

Retraining was infrequent, and the UEBA API already loaded its classifier at process startup.

A rolling update reused that lifecycle.

I considered a permanent delivery sidecar, but it would have changed the problem. If a sidecar replaced model files while the application was already running, I would also need a model-reload contract and synchronization between the delivery process and inference process.

The init-container contract was smaller.

> Before the application starts, install and verify the model it was told to run.

I also considered a dedicated inference server such as Triton. Its explicit model-control mode separates making a model available from loading it, but adopting it would have changed an existing serving integration that already worked well with startup loading.

For this project, pinned startup loading plus Kubernetes rolling replacement fit the workload better.

### Common deployment path

Both deployment modes used the same activator and fetcher.

- **Track stable:** resolve the channel and its release on each reconciliation.
- **Pinned:** resolve the release declared in configuration without following the channel.

Cloud deployments could follow \`stable\` automatically. On-prem deployments could use the same activation path while remaining pinned.

An operator could also run the activator as a one-shot Job. An operator hold prevented the next scheduled reconciliation from immediately restoring the configured target.

The polling interval was five minutes by default.

A push model could reduce that delay, but it would add notification infrastructure and connectivity assumptions across deployment environments. Model updates were infrequent, and the serving clusters could already initiate requests.

The concrete trade-off was therefore:

> A deployment following \`stable\` may wait one reconciliation interval for an update.

For this workload, that was acceptable.

---

## Feedback changed the storage boundary

My first design had the customer-side activator and fetcher read model releases directly from the model bucket.

It worked, but architecture review exposed a more useful question than whether those pods could access GCS.

> **Engineering review**
>
> Are channel.json and manifest.json GCP concepts, or artifacts that our workflow owns? If they're ours, make that boundary explicit.

They were ours. The workflow produced them; GCS only stored them.

A second review comment went further.

> **Engineering review**
>
> The namespaced delivery pods shouldn't care about GCP or its storage format. They should talk to the Deployment API; the storage adapter should own the GCP-specific details.

That changed the architecture.

The issue was no longer:

> Can the customer-side component securely access GCS?

It became:

> **Why does the customer-side component know GCS exists?**

I moved model reads behind the existing onboarding Deployment API and implemented three token-gated endpoints.

\`\`\`http
GET /killchain/model/channels/{channel}
GET /killchain/model/releases/{version}/manifest
GET /killchain/model/releases/{version}/files/{name}
\`\`\`

The API authenticated requests and handled access to storage. The delivery client still interpreted manifests, performed compatibility checks, and verified downloaded bytes.

The service already followed a ports-and-adapters architecture. Its storage port described how to open an object, while the provider adapter implemented the cloud-specific operation.

The resulting boundary became:

\`\`\`text
Customer namespace
  |
  | HTTP
  v
Deployment API
  |
  | storage port
  v
GCS adapter
  |
  v
Model storage
\`\`\`

Before the change, a serving namespace needed to understand things like:

\`\`\`text
bucket
GCP credential
object location
\`\`\`

Afterward, it needed:

\`\`\`text
Deployment API address
platform token
\`\`\`

I removed the GCS backend and cloud-storage dependencies from the delivery image.

The inference process knew even less. It made no model-store calls at all; it only consumed local files.

The responsibilities were now much clearer.

> **Platform API:** storage access\\
> **Activator:** release selection\\
> **Fetcher:** download, verification, installation\\
> **Inference service:** load the installed classifier

There was still an accepted limitation: the credential at this layer was shared at the platform level, so this was not a claim of per-tenant authorization isolation.

The important change was not adding another component. It was removing storage knowledge from components that did not need it.

---

## Readiness and recovery completed the delivery path

![Diagram showing model publication, activation, rollout, and failure recovery transitions.](/writing/killchain/publication-activation-recovery.png "Publication, activation, rollout, and recovery are separate transitions.")

Once the release could reach a pod, there was still another boundary to define: what did Kubernetes mean by ready?

Consider:

\`\`\`text
process: running
desired model: v43
loaded model: v42
\`\`\`

The HTTP server may be running perfectly.

For this deployment, it is still wrong.

For model-required deployments, I added readiness checks that verified the classifier had loaded and that its loaded version and digest matched the pod's desired version and digest.

> **Running with the wrong model is not ready.**

The serving chart required at least two replicas when delivery was enabled and used \`maxUnavailable: 0\`.

During an update, healthy old replicas could remain available while replacement pods fetched and loaded the new model.

A simplified failure case looked like this:

\`\`\`text
pod A -> v42 -> Ready
pod B -> v42 -> Ready

activate v43

pod C -> fetch v43 -> checksum failure -> NotReady
pod A/B continue serving
\`\`\`

These mechanisms protected availability during the model-update failures I was designing around. They did not claim to validate prediction quality or protect against unrelated infrastructure failures.

If a rollout failed to converge before its deadline and a last-good release existed, the activator attempted one rollback.

The word one mattered.

Without a hold, a reconciler running every five minutes could do this indefinitely:

\`\`\`text
activate bad v43
       ↓
      fail
       ↓
rollback to v42
       ↓
next tick sees stable=v43
       ↓
activate bad v43 again
\`\`\`

After successful recovery, the activator therefore held the failed target rather than retrying it on every tick.

A different version on \`stable\` could clear an automatic hold. An operator hold required explicit operator action.

If rollback itself failed, the controller recorded the failure and stopped blindly retrying.

There was also a bootstrap constraint:

> You cannot roll back until there is a known-good release to roll back to.

The first activation therefore had no previous runtime-delivered release available for recovery.

---

## Why I kept native Deployments

I evaluated Argo Rollouts while working through rollback and recovery.

It could replace some of my rollout-deadline logic and would provide a natural path toward progressive delivery.

For example, a canary can explicitly describe progression:

\`\`\`yaml
steps:
  - setWeight: 10
  - pause:
      duration: 1h
  - setWeight: 20
  - pause: {}
\`\`\`

That is useful when the question is:

> How should traffic progressively move to a new version?

My delivery problem still contained several model-specific steps outside that boundary:

\`\`\`text
resolve release
verify manifest
download bundle
verify files
check compatibility
install model
manage holds
\`\`\`

Argo Rollouts would not remove those responsibilities.

The larger cost was operational.

Argo Workflows ran in the training environment. The serving environments were separate customer clusters. Using Rollouts would mean introducing another controller and set of CRDs into every serving cluster.

For the scope of this project, that dependency removed less complexity than it introduced.

I kept native Deployments and the smaller model-specific reconciler.

I would revisit that decision if we needed metric-driven canaries, finer traffic control, or if Rollouts were already an accepted dependency in the serving environments.

---

## Result and my learnings

After several iterations of architecture design and code review, the system grew to more than 15,000 lines across the workflow, publisher, delivery components, API integration, Helm charts, and tests. It moved into QA while I continued integrating the infrastructure into the main product deployment.

The line count is not particularly interesting on its own.

The change in the boundary of the project is.

I started with:

> Run these training jobs correctly.

By the end, the model moved through a much longer path:

\`\`\`text
training
    ↓
publication
    ↓
selection
    ↓
delivery
    ↓
installation
    ↓
rollout
    ↓
readiness
    ↓
recovery
\`\`\`

What drew me further into the project was the handoff after training.

Every time I followed the artifact one step closer to serving, there was another concrete question to answer:

> Which version was selected?\\
> Which bytes actually arrived?\\
> Which process loaded them?\\
> Which component is allowed to know about storage?\\
> Who owns recovery when the rollout fails?

The individual Kubernetes mechanisms were rarely the difficult part.

A CronJob is understandable in isolation. So is an init container. So is a readiness probe.

The difficult parts were the contracts between them.

A manifest described the expected release, but its existence alone did not prove publication had completed.

A channel selected a release, but said nothing about model quality.

A Deployment annotation described the desired model, but did not prove the application had loaded it.

A running process could still be unready.

The storage review was probably the clearest example of how my thinking changed. My first implementation was functional: the namespaced delivery components could authenticate to the bucket and retrieve the right files.

But the stronger design question was not whether that could work.

It was whether that responsibility belonged there.

Moving storage behind the Deployment API made the customer-side component smaller, removed cloud-specific knowledge from it, and made the system boundary easier to reason about.

The same pattern showed up in other decisions.

I kept polling because immediate propagation was not a requirement.

I used an init container because the application already loaded its classifier at startup.

I kept native Deployments because we did not need enough of Argo Rollouts to justify operating another controller in every cluster.

The question I kept coming back to became:

> **What is the smallest contract each component actually needs?**

I started with a workflow around training scripts.

Following the model through each handoff is what turned it into a platform problem.`,
};
