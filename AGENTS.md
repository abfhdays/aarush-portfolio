# Aarush's portfolio

## Purpose and scope

Personal software engineering website for Aarush Ghosh, a third/fourth-year
University of Waterloo student. Audience: engineering recruiters, prospective
teammates, and engineers reading project write-ups. Prioritize concrete evidence
of engineering ownership, technical judgment, and results, with a personal voice.

- Live site: https://aaarushgg.com/
- Repository: https://github.com/abfhdays/aarush-portfolio
- Content inspiration: https://www.bryandeng.ca/ (concise introduction, projects,
  writing) and https://martinsit.ca/ (current work, concrete outcomes, previous
  experience, projects, writing). References, not templates to copy.
- This preparation pass preserves content, styling, routes, navigation,
  animations, and project expand/collapse behavior.
- Later work: update information, slightly refine aesthetics, and publish a
  technical article about the newest internship project. The final section list
  and article outline are still to be decided with Aarush.

## Content sources and future updates

Latest supplied resume: `/Users/aarushghosh/Downloads/Resume/Aarush_Resume___2026_09_04.pdf`.
This local file is context, not a portable build dependency. The existing
`public/resume.pdf` and external resume link have not been replaced.

Facts read from the September 4, 2026 resume:

- Waterloo: Bachelor of Statistics & Computational Math, Computer Science minor,
  co-op; expected graduation April 2028. Confirm academic year before publication.
- Versa Networks, Software Engineer Intern, May 2026–Present as of that resume:
  UEBA model training and delivery across Kubernetes clusters, Argo Workflows,
  MLflow, a Go delivery service, Helm, CronJob reconciliation, sidecars, and
  Redis-backed tenant provisioning. Intended internship blog subject; the article
  itself has not been supplied or written.
- Qorsa, Machine Learning Engineer Intern, January–April 2026: Dgraph-backed
  GraphRAG storage, ingestion, vLLM deployment, CI/CD, and IAM authentication.
- Waterloo, Software Developer, January–April 2025: tuition forecasting and
  PySpark ETL. CGI, AI Developer Intern, May–August 2024: analytics RAG and
  text-to-SQL pipelines.
- Projects/extracurriculars include reLive (McHacks 13 winner, Go backend,
  PostgreSQL worker queue, S3 uploads) and WAT.ai anomaly detection research.

Current `content/` predates this resume. It omits Versa and contains different
education phrasing, Qorsa technology details, and some metrics. Reconcile these
using the resume and Aarush's explanations during the content update; do not
combine conflicting claims or invent metrics, publication links, or end dates.

## Architecture and editing map

- `app/`: Next.js App Router pages: `/`, `/projects/`, `/work/`, `/writing/`.
  Work and projects exist even though the landing navigation does not link to
  them. Preserve these routes unless a later task explicitly changes them.
- `components/layout/`: navigation, section, page header, and page layout.
- `components/home/`: profile and landing navigation.
- `components/projects/`: interactive project item and Markdown rendering.
- `components/work/`, `components/writing/`: experience and writing list items.
- `content/`: typed plain data for profile, work, projects, writing, navigation.
  Edit copy here rather than embedding it in route components.
- `types/content.ts`: shared data contracts. UI-only props stay with components.
  Plain objects are sufficient; avoid classes, a CMS, or speculative abstractions.
- `lib/`: asset paths and Markdown/syntax helpers.
- `public/`: images, resume PDF, custom-domain CNAME.
- `app/globals.css`: theme, typography, animations, Markdown and demo styling.

Use server components by default; only project expansion needs client state.
Markdown renders trusted repository-authored raw HTML and custom syntax
highlighting. Preserve these renderers when changing project descriptions.
Writing currently lists an external placeholder post. No local article routes
or blog engine exist yet; choose their structure when implementing that feature.

## Development and delivery

See `README.md` for one-time Node/LazyVim setup and daily commands. Use npm and
the lockfile. Node 22 matches `.nvmrc` and GitHub Actions. No environment variables,
credentials, backend, or database are required locally.

Run `npm run lint`, `npm run typecheck`, and `npm run build` before handoff.
Next.js 15, React 19, strict TypeScript, Tailwind 4; static export to `out/`.
Preview `out/` with a static HTTP server; `next start` cannot serve this export.
Never edit generated `.next/`, `out/`, or `next-env.d.ts`.

`.github/workflows/deploy.yml` publishes `out/` to GitHub Pages on pushes to
`master` or manual dispatch. Pushing `master` publishes the site. Do not commit,
push, or deploy without explicit authorization.

`PAGES_BASE_PATH` configures deployment under a repository subpath. Next exposes
it as `NEXT_PUBLIC_BASE_PATH`; use `assetPath()` for local component image paths.
Markdown contains relative image paths; preserve their behavior in a refactor
and revisit them explicitly during later content work.

## Working conventions

- Surgical edits; match the touched file's existing conventions.
- Search for an existing instance with the same workload before proposing a pattern.
- Keep data, presentation, and interactive behavior in their respective layers.
- Use shared content types instead of duplicating them in component prop interfaces.
- Preserve DOM structure and classes during behavior-preserving refactors.
- Comments describe the current mechanism, not change history.
- Distinguish static checks, local browser evidence, and live deployment evidence.
- Inspect the final diff and preserve unrelated work. Stage intended changes for
  lazygit review; staging does not authorize a commit or publication.

## Preparation status (October 1, 2026)

Component organization, shared content typing, common navigation/layouts, and
asset/Markdown helpers are in place. The broken lint dependencies were aligned
with Next.js 15; `typecheck` and `.nvmrc` were added. Lint, type checking, and the
static build passed locally with Node 22. Browser checks matched the pre-refactor
DOM for all four routes at 1280px and 390px widths, including expanded/collapsed
projects, in development and the production export. No deployment was performed.
Content updates, aesthetic changes, and the Versa article remain future work.

Next.js and its lint preset use the patched 15.5.27 release;
`package.json` overrides Next's pinned PostCSS with patched PostCSS 8. ESLint 9
remains within the preset's supported peer range but is end-of-life; a maintained
lint toolchain is follow-up work, and its install warning does not block development.
A fresh `npm ci` reported zero vulnerabilities after the dependency updates.
Lint, type checking, build, and production browser comparisons passed again locally.
