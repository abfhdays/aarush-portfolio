import type { WritingArticle } from "@/types/content";

export const versaMlops: WritingArticle = {
  title: "An MLOps story",
  date: "Draft · Oct 2026",
  excerpt: "What a customer-side namespace should know about where our models live, and the design review that changed my answer",
  link: "/writing/versa-mlops/",
  status: "published",
  body: `My third project at Versa Networks started small. Our data science team had a set of Python jobs that trained a killchain classifier, the model our User and Entity Behavior Analytics (UEBA) service uses to place security activity into stages of an attack lifecycle. My job was to turn those jobs into something my senior engineer could trigger and schedule on our Kubernetes development cluster.

That part took a few weeks. Getting the model from the end of that pipeline into serving took most of the rest of my summer, and the part of that design I learned the most from is one I got wrong first.

This post is about a single boundary in that system: what a customer-side namespace should know about where our models live. My first design worked, it was locked down, and it gave the customer side far more knowledge than it needed. It took a review comment from the engineering lead on my team, and some time stepping back from my own design, before I could see that.

---

## Some context

The training pipeline loaded MITRE ATT&CK data into ArangoDB, trained technique embeddings with node2vec, generated training sequences, trained a BiLSTM classifier with attention, and exported an ONNX model with a few supporting JSON files. I mapped it into an Argo DAG and added a final step that publishes the result:

\`\`\`text
01 Load the technique graph
   ├── 02 Train embeddings
   └── 03 Generate sequences
       └── 04 Train the classifier
           └── 05 Export the model bundle
               └── 06 Publish the release
\`\`\`

I packaged the workflow as a Helm chart that went into our product release infrastructure. That was the original task.

The more interesting problem was what happened to the output. The classifier, about 70 MB across five files, was copied into the UEBA API's container image. Every retrain meant a Jenkins rebuild of a service whose code hadn't changed. The product also ran in three kinds of environments: Versa-managed cloud, customer-managed cloud, and on-prem Kubernetes. The model needed a release lifecycle of its own.

I split that lifecycle into two halves.

> **Publication:** make a complete, immutable model release available.\\
> **Activation:** decide which release a particular serving deployment should run.

On the publication side, the Argo step wrote each release under \`models/<version>/\` with a manifest listing every file's size and SHA-256, a digest for the whole bundle, and compatibility metadata. A small \`channels/stable.json\` pointed at the current release, and it only moved after the release was fully written.

On the activation side, two Go binaries ran in each customer-side UEBA namespace. An **activator** CronJob resolved which release the namespace should run and wrote that version and digest into the serving Deployment's pod template, which made Kubernetes roll the pods. A **fetcher** init container in each new pod downloaded exactly that release, verified it, and moved it into place before the API started. Cloud deployments followed \`stable\` automatically; on-prem deployments stayed pinned to a version an operator chose, using the same Job.

Everything in the rest of this post lives in the gap between those halves. A namespace on the activation side has to read what the publication side wrote. How it does that turned out to be the most important design question in the project.

---

## My first answer: read the bucket

The publisher wrote to a GCS bucket, so I had the activator and fetcher read from that bucket. The delivery client had a small store interface, with a filesystem backend for tests and a GCS backend for real clusters.

I spent a fair amount of time making the access careful:

- The publishing pipeline held the only writer credential.
- Each customer-side namespace got its own read-only credential, created by Vault during onboarding and granted through that namespace's tenant policy.
- The fetcher verified every downloaded file against the manifest before the API could load it.

It worked in our POC cluster, and I was happy with it. To run, a serving namespace needed configuration along these lines:

\`\`\`text
store kind:          gcs
store reference:     gs://<bucket>/<prefix>
reader credential:   per-namespace, from Vault
\`\`\`

The delivery image also carried the GCS client and the dependency tree that came with it.

---

## The review

The engineering lead on my team left two comments on the design. Paraphrasing:

> **Engineering review**
>
> Are channel.json and manifest.json GCP concepts, or artifacts that our workflow owns? If they're ours, make that boundary explicit.

My first reaction was to answer exactly that question. I went back and checked. The files were ours: the Argo publish step wrote them, and GCS only stored the bytes. Nothing about the release format depended on GCP. I was ready to say the design was fine and just needed clearer documentation.

The second comment didn't fit that answer.

> **Engineering review**
>
> The namespaced delivery pods shouldn't care about GCP or its storage format. They should talk to the Deployment API; the storage adapter should own the GCP-specific details.

I had treated these as the same question. They weren't. The first was about who owns the *format*. The second was about who should *talk to the storage*. Owning the format didn't make it right for every customer-side namespace to reach into our bucket.

---

## What the customer side knew

What finally made it click was writing two lists.

The first was everything a customer-side namespace had to know for delivery to work in my design:

\`\`\`text
our models live in GCS
the bucket name and prefix
how we lay out versions and channels
which storage backend to use
a cloud credential for reading it
a cloud SDK, built into the image running in their namespace
\`\`\`

The second was what that namespace was actually responsible for:

\`\`\`text
ask for the release it was told to run
check that the bytes it received are that release
\`\`\`

The second list was much shorter. Everything else in the first list described how *we* store and serve models. Changing the bucket, the credential scheme, or the backend would have meant new configuration, and possibly a new image, in every customer-side namespace, for a change that had nothing to do with them.

I had been asking whether a pod could access GCS securely. Underneath the review comment was a better question:

> **Why does this pod know GCS exists?**

---

## Moving the reads behind the Deployment API

We already had a service in the right place. The onboarding Deployment API runs in a shared, Versa-run namespace and already provisions customer namespaces. It was also already built with ports and adapters: the core declares interfaces for what it needs from infrastructure, such as opening a stored object, and a GCloud adapter implements them. The platform's own storage access already sat behind an abstraction there.

I added three token-gated routes to it:

\`\`\`http
GET /killchain/model/channels/{channel}
GET /killchain/model/releases/{version}/manifest
GET /killchain/model/releases/{version}/files/{name}
\`\`\`

The API checks the token and path parameters, opens the object through its storage port, and either returns the channel or manifest JSON or streams the file as raw bytes. It reads the bucket with its own identity, so the change didn't add a new kind of cloud credential anywhere.

I mapped errors by kind instead of collapsing them into one failure:

- **401:** missing or bad token
- **404:** unknown release
- **502:** the storage backend answered badly
- **503:** model delivery isn't set up on this deployment

When a fetch fails inside a customer-side namespace, the status code tells you which side of the boundary to look at.

The split of work mattered as much as the routes. The API streams file bytes without interpreting them. The delivery client still reads manifests, checks compatibility (bundle schema, ONNX opset, minimum API version), and verifies every file's size and hash. The Python publisher and the Go fetcher compute the bundle digest the same way, and a shared golden fixture keeps the two languages in agreement. Because verification runs from publisher to fetcher, the API in the middle can stay a thin pipe. Nothing downstream has to trust it to have read the right object.

After the change, a serving namespace's configuration came down to:

\`\`\`text
Deployment API address
token
\`\`\`

I deleted the GCS backend and the cloud SDK dependencies from the delivery image. The fetcher fails closed: an empty or unreadable credential is an error, never an unauthenticated request and never a fallback to whatever identity the pod happens to have. The inference service itself never calls the API or the bucket; it only loads the files the fetcher installed.

The responsibilities ended up much narrower than where I started:

> **Deployment API:** storage access\\
> **Activator:** which release to run\\
> **Fetcher:** download and verify that release\\
> **Inference service:** load the files on disk

![Architecture diagram showing the training cluster publishing to the model store, the Deployment API reading it, and customer-side namespaces reading through the API.](/writing/killchain/model-delivery-architecture.png "Customer-side namespaces read model releases through the Deployment API. Only the platform holds the store credential.")

---

## A token that protected nothing

The first version of the API kept one thing from my original design: each customer-side namespace got its own token. A namespace sent its token along with its namespace name, and the API's middleware checked that the pair matched.

Going back through that path, I noticed what happened right after the check: the middleware discarded the namespace. Every read resolved against the same process-wide store reference. Every namespace received byte-identical content from the same bucket.

The per-namespace token was protecting a distinction the store didn't make.

That was hard to see while each namespace held its own GCS reader credential, because per-namespace credentials looked like the careful default. Once every namespace was talking to one API, the question became simpler: what does this API actually distinguish between callers? For model reads, the answer was nothing.

So I replaced it with a single platform token. Requests carry one header. The namespace header went away on both sides, along with the per-namespace token storage and the Vault route that served it. The Deployment API reads the token from a Vault mount it already had.

I'm careful about what this claims:

- Rotation is now cluster-wide. Every serving namespace has the same token, so rotating it means updating all of them together.
- It is not per-tenant isolation. Any namespace with the token can read any model release. For one shared classifier, that matches what the store actually serves.
- What did improve is what a leak gets you. A leaked namespace credential used to be a cloud credential. Now it's a token for three read-only routes, with no cloud access behind it.

---

## Where it ended up

![Sequence diagram showing namespace onboarding, publication, activation, rollout through the Deployment API, and recovery.](/writing/killchain/publication-activation-recovery.png "The full path: onboarding, publication, activation, rollout, and recovery.")

In our POC cluster we tested the Deployment API boundary end to end, along with running delivery from a plain Kubernetes secret instead of Vault access and keeping the token grant across upgrades. That is POC cluster evidence, not a customer production rollout. The work, which grew to more than 15,000 lines across the workflow, publisher, delivery components, API, Helm charts, and tests, moved into QA while I kept integrating it into the main product deployment.

There's a lot of that project I haven't written about here: readiness checks that compare the loaded model with the one the pod asked for, rollback and holds when a rollout fails, and why I didn't adopt Argo Rollouts. Those might be another post.

---

## What I took away

My first design wasn't broken. It authenticated properly, it verified every byte, and it ran. If someone had asked whether it was secure, I could have defended it.

The question I hadn't asked was who each piece of knowledge belonged to. A customer-side namespace is code that runs in an environment we don't fully control and might have to upgrade one cluster at a time. Every fact it holds about our storage is something we'd have to change there too.

The review didn't hand me the answer. It pointed out that I'd merged two questions, and separating them led me to make the lists. The single platform token came out of the same exercise a step later, once the boundary was clean enough to see what it was actually protecting.

Now, when I design something that runs on the other side of a boundary, I write those two lists before I write the client: what it would know, and what it needs to know. Most of the design comes out of the difference.`,
};
