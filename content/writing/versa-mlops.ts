import type { WritingArticle } from "@/types/content";

export const versaMlops: WritingArticle = {
  title: "An MLOps story",
  date: "Draft · Oct 2026",
  excerpt: "From a training workflow to serving versioned models in customer clusters",
  link: "/writing/versa-mlops/",
  status: "published",
  body: `My third assignment during my summer internship with Versa Networks started with a fairly contained task: take an existing machine learning training pipeline and make it run reliably on our Kubernetes POC cluster.

The pipeline trained a killchain classifier that would be consumed by an important User and Entity Behavior Analytics service. The data science work already existed. My responsibility was to make the training process repeatable and eventually design the infrastructure around how its outputs reached serving.

The first version of the problem was mostly about orchestration. The pipeline consisted of several Python jobs with dependencies between them, some shared intermediate state, and different compute requirements. Argo Workflows was already available in our development environment, so I began by mapping the existing training process into an Argo DAG.

That part was relatively straightforward. What became more challenging and interesting was the work that followed implementing the workflow.

A successful training run could produce the right files without answering how those files should reach an existing customer deployment. A serving application still needs to discover a new model, verify it, load it, and recover if an update failed. The environments doing this were also not all under our direct control: the product ran across Versa-managed cloud, customer-managed cloud, and on-prem Kubernetes clusters.

Following those questions widened the project from training orchestration into a full-fledged MLOps design for model delivery.

## Starting with the training workflow

The original pipeline loaded MITRE ATT&CK data into a graph database, trained technique embeddings with node2vec, generated training sequences, trained a BiLSTM classifier with attention, and exported an ONNX model along with several supporting JSON files.

I represented it as six Argo steps:

\`\`\`text
01 Load the technique graph
   ├── 02 Train embeddings
   └── 03 Generate sequences
       └── 04 Train the classifier (depends on 02 and 03)
           └── 05 Export the model bundle
               └── 06 Publish the release
\`\`\`

The embeddings and sequence generation could run independently. Training depended on both.

Intermediate file outputs lived on a shared persistent volume. I used a \`ReadWriteMany\` volume because the workflow pods could be scheduled on different nodes, and gave each workflow invocation a separate workspace so overlapping scheduled runs could not modify the same files.

This also made partial execution useful. I could rerun training or export without necessarily recreating all of the earlier artifacts.

I initially considered separating the stages into different images. In practice, they shared nearly all of their Python dependencies and the same filesystem contract. I kept them in one image and had each Argo step invoke a different entry point. This left the workflow definition responsible for orchestration rather than packaging and gave the pipeline one dependency resolution and one image digest to manage.

Some of the more useful problems only appeared once I ran this outside the simplest development path. A volume could provision successfully while still being unreachable from the node where the pod was scheduled. Running the containers as a non-root user exposed group-permission assumptions on the shared filesystem. Resource requests had to work in clusters without assuming a particular GPU configuration.

None of these changed the DAG itself very much, but they changed what I considered a completed data pipeline. Getting the graph of jobs right was only one part of making the pipeline portable and complete across the environments where it would actually run.

I packaged the workflow and its supporting resources into a Helm chart, which took many iterations and was finally integrated into our product release infrastructure.

At that point the training workflow had a reliable output. The next question was what that output represented.

## Giving the model its own release lifecycle

The serving application originally received its model through files baked into the application image.

This coupled two things that changed for different reasons. Retraining the classifier required rebuilding the UEBA consumer application through our CI/CD even when the application itself had not changed.

I wanted a model release to be versioned independently from a service release.

The useful distinction became **publication** and **activation**.

- **Publication** creates a complete immutable model release on the internally managed Versa side.
- **Activation** determines which of those releases a particular serving deployment should use on the customer-managed side.

The publisher stored releases under a versioned prefix:

\`\`\`text
models/
└── <version>/
    ├── model.onnx
    ├── ...
    └── manifest.json
\`\`\`

Each manifest recorded the contract: the expected files, their sizes and SHA-256 hashes, a digest for the complete bundle, and compatibility metadata required by the serving application.

Separately, a small channel document represented the currently selected version:

\`\`\`text
channels/stable.json
\`\`\`

The ordering here mattered more than the layout.

The channel moved only after the release had been written and verified. If publication stopped halfway through, an incomplete version could remain in storage, but deployments following \`stable\` would continue to see the previous release.

My first approach used a publish lock. I later replaced it with storage-level preconditions.

The publisher claimed a version by creating its manifest using a create-only GCS precondition. If two publishers attempted to create the same version, only one could succeed. Updating the channel similarly used compare-and-swap against its current object generation.

This removed a separate locking mechanism, but introduced an important detail: because the manifest participated in claiming the version, the existence of a manifest did not by itself prove that every file had finished uploading.

Consumers therefore verified the complete bundle rather than treating the manifest as a completion marker.

The publisher was written in Python while the delivery components were written in Go. Once both sides needed to calculate the same bundle digest, the digest format became a small protocol between them.

Both implementations sorted file records by name and hashed the same encoding of each file's name, SHA-256, and size. I added a shared golden fixture so changes to either implementation could not silently change the definition of a bundle.

## Selecting a model and installing it

For delivery, I ended up designing two Go binaries packaged in the same image.

The first component, the **activator**, ran periodically as a Kubernetes CronJob. It resolved the desired model release, validated its manifest, and patched the serving Deployment's pod-template annotations with the selected version and bundle digest.

Changing the pod template caused Kubernetes to create a new ReplicaSet, so the model update could use the application's existing Deployment rollout behavior rather than introducing a separate rollout system.

The second component, the **fetcher**, ran as an init container in each replacement pod.

It:

1. Downloaded the exact release named on the pod.
2. Wrote the files into a staging directory.
3. Checked their expected sizes and hashes.
4. Validated compatibility information such as the bundle schema and ONNX opset.
5. Renamed the completed directory into place.

Only after the fetcher completed could the application container start.

This matched the behavior of the existing service particularly well because the classifier was already loaded during application startup and model updates were relatively infrequent.

I considered making the fetcher a permanent sidecar instead of a regular init container. That would have allowed the deployment to watch for new models while the application remained running, but it would also have required a contract for replacing or reloading a classifier inside a live process. The application did not have that contract, and adding one would have introduced synchronization between the model files, delivery process, and inference process.

An init container made the invariant simpler: when the application starts, the requested model has already been installed.

I also considered a dedicated inference server such as [Triton](https://docs.nvidia.com/deeplearning/triton-inference-server/user-guide/docs/user_guide/model_management.html). Its model-management functionality would solve some of these problems more directly, but adopting it would have changed the serving integration around an application that already loaded the ONNX classifier itself.

For this workload, I preferred to preserve that integration and let Kubernetes replace pods when their model changed.

The activator supported two forms of selection:

- **Follow \`stable\`:** resolve the channel again on each reconciliation. This supported cloud deployments that could autonomously poll for a new model release.
- **Pin a release:** select a particular version. This supported on-prem deployments where an operator could explicitly define a model release and trigger activation manually.

## Moving storage behind the platform boundary

My initial delivery design had the activator and fetcher reading model releases directly from the model bucket.

It worked, but during architecture reviews my engineering manager and mentors questioned why a customer deployment needed to know anything about the platform's storage backend.

That changed the design.

I moved model access behind an existing onboarding Deployment API and added three authenticated endpoints:

\`\`\`http
GET /killchain/model/channels/{channel}
GET /killchain/model/releases/{version}/manifest
GET /killchain/model/releases/{version}/files/{name}
\`\`\`

The first two exposed the channel and manifest documents. The file endpoint streamed a requested artifact.

This moved cloud-storage ownership back into the platform.

The onboarding service already followed a ports-and-adapters design. Its storage port described how the application opened an object, while the provider adapter implemented the GCS-specific operation. Model delivery could therefore use the existing storage abstraction without exposing GCS to its callers.

After the change, serving namespaces received an API address and platform credential. They no longer needed a bucket reference or GCS credential, and I removed the GCS client and cloud-storage dependencies from the delivery image.

The inference process itself remained unaware of all of this. It only read local files installed before startup.

This review changed how I thought about the boundary more generally. I had originally focused on whether the customer-side component could access the release securely. The more useful question was whether storage access belonged on the customer side at all.

The resulting responsibilities were narrower:

- The platform API accessed storage.
- The activator selected a release.
- The fetcher installed it.
- The application loaded local files.

![Model delivery architecture showing the training workflow, versioned release store, platform API, activator, and serving pods.](/writing/killchain/model-delivery-architecture.png)

*Serving workloads access model releases through the platform API rather than the underlying object store.*

## Readiness is about the loaded model

Once the release could reach a pod, I needed Kubernetes to distinguish between a process that was merely running and one that was actually ready to serve the selected model.

For model-required deployments, I extended readiness to check that the classifier had loaded successfully and that its loaded version and bundle digest matched the version and digest requested by the pod.

This made model identity part of serving readiness.

The serving chart also required at least two replicas while delivery was enabled and configured the Deployment with \`maxUnavailable: 0\`. During an update, existing replicas could continue serving while replacement pods downloaded and loaded the new release.

If installation failed, the replacement pod never became ready and Kubernetes retained the old healthy replicas.

This protected availability for the model-update failures I was designing around. It did not claim to handle unrelated infrastructure failures or say anything about the predictive quality of the new model.

![Sequence diagram of publication, activation, verified installation, rollout, and recovery.](/writing/killchain/publication-activation-recovery.png)

*Publication, activation, rollout, and recovery.*

The remaining case was a rollout that never converged.

If a rollout exceeded its deadline and a previously successful release was known, the activator attempted to restore that release. After a successful rollback it placed the failed target on hold instead of trying the same update again at every polling interval.

A newly published stable version could clear an automatically created hold. A hold requested by an operator required an explicit operator action.

If rollback itself failed, the controller recorded the failure rather than repeatedly alternating between two releases.

Recovery also depended on history. The first model delivered through this mechanism had no previous runtime-delivered model to restore, so rollback was only available after a known-good baseline had been established.

## Why I kept native Deployments

I evaluated Argo Rollouts while implementing recovery.

It could replace some of the deadline and rollback logic and would provide a better foundation for progressive delivery if we later wanted model canaries or metric-based promotion.

The complication was where it would have to run.

Argo Workflows existed in the training environment. The models, however, were served across separate customer Kubernetes environments. Using Argo Rollouts would require operating its controller and CRDs in each of those clusters.

It also would not remove most of the model-specific work. Release resolution, artifact verification, compatibility checks, installation, and operator holds would still exist.

For the scope I was working on, the additional controller did not remove enough complexity to justify becoming another dependency of every serving environment.

I kept native Deployments and the smaller model-specific reconciler. I would make a different decision if progressive delivery became important enough to justify the additional cluster dependency, or if Rollouts were already part of those environments.

## What I learned from building it

The implementation eventually grew across the training workflow, publisher, delivery binaries, API endpoints, Helm charts, tests, and integration work, with more than 15,000 lines of new code moving through review and QA.

The size was less interesting to me than the change in scope.

I began with a pipeline that ended when a model file was exported. By the end of the project I was thinking about the model as something that moved through several distinct states:

\`\`\`text
training → publication → selection → installation
         → rollout → readiness → recovery
\`\`\`

Most of the difficult decisions were at the boundaries between those states.

- The Python publisher and Go client needed a common definition of a release.
- The activator needed to select a model without installing it.
- The fetcher needed to install files without deciding which version should be selected.
- Kubernetes readiness needed to reflect what the application had actually loaded rather than what the Deployment intended to run.

The storage review was probably the most useful example. The first design was functional, but it assigned a responsibility to the wrong side of the system. Moving storage access behind the platform API made the customer component smaller and made the boundary easier to reason about.

There were similar decisions throughout the project. I did not add a live model-reload protocol because startup loading already matched the update frequency. I accepted a five-minute polling interval because there was no corresponding requirement for immediate activation. I did not introduce another rollout controller because the functionality it removed was smaller than the operational dependency it added.

Those decisions made me more careful about starting with the behavior a system actually needs and then choosing the infrastructure around it.

The individual Kubernetes mechanisms were rarely the difficult part. Argo DAGs, CronJobs, init containers, readiness probes, Deployment patches, and Helm templates each have fairly understandable behavior in isolation.

The more interesting part was deciding what each mechanism was allowed to mean.

- A published manifest described a release but did not by itself prove publication had finished.
- A \`stable\` channel selected an artifact but did not claim that the model was statistically better.
- A Deployment annotation described the desired model but did not prove that the application had loaded it.
- A running process was not necessarily a ready process.

Making those distinctions explicit produced most of the final architecture.

The project started as a way to run an existing training pipeline on Kubernetes. Following the model beyond the end of that workflow is what turned it into a real MLOps system.`,
};
