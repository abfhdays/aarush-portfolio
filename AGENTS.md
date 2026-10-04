# Aarush's portfolio

## Purpose and scope

Personal software engineering website for Aarush Ghosh, a University of Waterloo
student graduating in April 2028. Audience: engineering recruiters, prospective
teammates, and engineers reading project write-ups. Prioritize concrete evidence
of engineering ownership, technical judgment, and results, with a personal voice.

- Live site: https://aaarushgg.com/
- Repository: https://github.com/abfhdays/aarush-portfolio
- Content inspiration: https://www.bryandeng.ca/ (concise introduction, projects,
  writing) and https://martinsit.ca/ (current work, concrete outcomes, previous
  experience, projects, writing). References, not templates to copy.
- Initial preparation preserved content, styling, routes, navigation,
  animations, and project expand/collapse behavior.
- Current visual direction: a subtle flickering square grid across all pages, the existing
  light palette and illustrations, self-hosted Manrope, deliberate text spacing,
  a non-clickable about label on the home page, and separate external profile
  links inline with each page's navigation.
  Grid reference: https://21st.dev/@dillionverma/components/flickering-grid.
- The first engineering article is drafted in the existing Work in Progress
  route. Aarush will iterate on the prose before publication.

## Content sources and future updates

Latest supplied resume: `/Users/aarushghosh/Downloads/Resume/Aarush_Resume___2026_09_04.pdf`.
This local file is context, not a portable build dependency. `public/resume.pdf`
contains this resume, and the profile's resume URL points to that local asset.

Facts read from the September 4, 2026 resume:

- Waterloo: Bachelor of Statistics & Computational Math, Computer Science minor,
  co-op; expected graduation April 2028. The bio omits an unconfirmed academic year.
- Versa Networks, Software Engineer Intern, May 2026–Present as of that resume:
  UEBA model training and delivery across Kubernetes clusters, Argo Workflows,
  MLflow, a Go delivery service, Helm, CronJob reconciliation, sidecars, and
  Redis-backed tenant provisioning. The first article covers the killchain
  training and model-delivery project; its draft is based on Aarush's Google Doc
  and referenced local design notes.
- Qorsa, Machine Learning Engineer Intern, January–April 2026: Dgraph-backed
  GraphRAG storage, ingestion, vLLM deployment, CI/CD, and IAM authentication.
- Waterloo, Software Developer, January–April 2025: tuition forecasting and
  PySpark ETL. CGI, AI Developer Intern, May–August 2024: analytics RAG and
  text-to-SQL pipelines.
- Projects/extracurriculars include reLive (McHacks 13 winner, Go backend,
  PostgreSQL worker queue, S3 uploads) and WAT.ai anomaly detection research.

Current profile and experience data in `content/info.ts` and `content/work.ts`
reflect this resume, with Versa first. The UW employment bullet is last in the
homepage bio; its work-page entry remains removed at Aarush's request.
The bio uses the resume's degree wording, Qorsa technologies,
and reLive concurrency metric; the project tags include the McHacks 13 win.
Do not combine conflicting claims or invent metrics, publication links, or end dates.

## Architecture and editing map

- `app/`: Next.js App Router pages: `/`, `/projects/`, `/work/`, `/writing/`.
  The first local article route is `/writing/versa-mlops/`.
  Work and projects exist even though the landing navigation does not link to
  them. Preserve these routes unless a later task explicitly changes them.
- `components/layout/`: navigation, section, page header, and page layout.
- `components/home/`: profile and landing navigation.
- `components/projects/`: interactive project item and Markdown rendering.
- `components/work/`, `components/writing/`: experience and writing list items.
- `content/`: typed plain data for profile, work, projects, writing, navigation.
  Edit copy here rather than embedding it in route components.
  `content/writing.ts` lists posts; `content/writing/versa-mlops.ts` owns the
  first article's metadata and Markdown body.
- `types/content.ts`: shared data contracts. UI-only props stay with components.
  Plain objects are sufficient; avoid classes, a CMS, or speculative abstractions.
- `lib/`: asset paths and Markdown/syntax helpers.
- `public/`: images, resume PDF, custom-domain CNAME.
  `public/fonts/` contains the locally bundled Manrope variable font and its license.
- `app/globals.css`: theme, typography, animations, Markdown and demo styling.

Use server components by default; project expansion and the canvas background
are isolated client components.
Project Markdown renders trusted repository-authored raw HTML and custom syntax
highlighting. Preserve these renderers when changing project descriptions.
Writing uses compact title/date rows linked to local article pages. The
first article is "From a naive POC training pipeline to automated model serving
in live customer clusters: an MLOps story", labeled
"Draft · Oct 2026" while Aarush iterates on publication copy.
`components/writing/Article.tsx` renders GitHub-flavored Markdown without raw HTML,
with reading styles scoped to
`.article-content`, separate from the project demo's terminal styles. Add actual
article content in `content/writing/`; keep routes as thin page compositions.
Martin Sit is a reference for text structure and spacing only; retain this site's
palette, illustrations, and grid.

For another article, follow the existing `versa-mlops` pattern:

1. Add a typed `WritingArticle` in `content/writing/<slug>.ts`, including its
   Markdown body and internal link `/writing/<slug>/`.
2. Add that object to `writingPosts` in `content/writing.ts`.
3. Add `app/writing/<slug>/page.tsx` composing `PageLayout`, `Article`, and
   `articleNavigation`, with metadata derived from the same content object.

The current article's date is draft metadata. Confirm the publication date before
replacing it with a publication date.

Article source: https://docs.google.com/document/d/1kpy7L3B12e4iGUbFTdYY3M1oNC_PwIVcnIcGXFL-Qu4/edit
and its referenced local killchain design and implementation notes. Both supplied
diagrams are bundled in `public/writing/killchain/` and open at full size from the
article. Preserve the distinction between recorded POC cluster evidence and
offline-only checks; the notes do not establish a customer production rollout.

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
Project Markdown image rendering resolves local paths from the public asset root through
`assetPath()`; external image URLs remain external. Preserve this behavior when
adding descriptions, including deployments with a base path.
The article renderer applies the same asset-root handling to Markdown images and
their full-size links.

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
static build passed locally with Node 22. Before visual refinements, browser checks
matched the pre-refactor DOM for all four routes at 1280px and 390px widths,
including expanded/collapsed projects, in development and the production export.
No deployment was performed.
Resume-based content updates are in place. The Versa article is now drafted;
publication remains future work.

Next.js and its lint preset use the patched 15.5.27 release;
`package.json` overrides Next's pinned PostCSS with patched PostCSS 8. ESLint 9
remains within the preset's supported peer range but is end-of-life; a maintained
lint toolchain is follow-up work, and its install warning does not block development.
A fresh `npm ci` reported zero vulnerabilities after the dependency updates.
Lint, type checking, build, and production browser comparisons passed again locally.

## Visual refinement status (October 3, 2026)

A fixed canvas grid of 3px gray squares with 9px gaps and a maximum opacity of
0.14 covers every route. A radial mask softens the texture behind the reading
column. Squares flicker slowly, remain static for reduced motion, and pause when
the tab is hidden. `components/layout/FlickeringGrid.tsx` adapts the Magic UI
reference without new dependencies; its MIT license is alongside the component.
Home navigation shows a non-clickable about label and a writing link. External
profile links share the navigation row on every page, with outward arrows and no
divider. Home navigation uses smaller text and gaps on narrow screens to keep
the row together. Self-hosted Manrope provides a subtle
typography change. The landing page fits tested desktop/laptop viewports without
scrolling (1366×700, 1366×768, 1280×720, 1440×900, 1024×768); narrow or shorter
windows retain natural scrolling. Text spacing, continuation indents, and
narrow-screen title/image sizing were refined without changing portfolio copy.
Element defaults live in Tailwind's base layer so spacing utilities take effect.
Project Markdown images now load from the asset root instead of the current route.
The writing index uses linked title/date rows inspired by Martin Sit. A local
Work in Progress article has metadata and a Markdown placeholder, with separate
reading typography for headings, paragraphs, lists, quotes, and code blocks.
The initial placeholder has since been replaced by the killchain article draft
described above; the publication copy still needs Aarush's review.
Lint, type checks, and static export passed locally. Development and production
browser checks covered all five routes at 320, 390, 768, and 1280px, including
actual font loading, article navigation, image loading, overflow, and project
expansion/collapse. The five laptop/desktop landing sizes above were checked for
no scrolling and full content visibility. No deployment was performed.
October 3 production-export checks also verified the canvas at those four widths,
including 2x pixel density, resizing, animation, reduced motion on load and
preference changes, and simulated hidden/visible tab transitions. All five
landing viewports still fit without scrolling; no browser errors were observed.
