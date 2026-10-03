# Aarush's portfolio

Personal portfolio at [aaarushgg.com](https://aaarushgg.com), built with Next.js 15,
React 19, TypeScript, and Tailwind CSS 4. It exports a static site to GitHub Pages.
See [AGENTS.md](AGENTS.md) for context, content sources, and future work.

## One-time setup on macOS

Node runs the development/build tools; npm installs packages. TypeScript is a
project dependency: no global installation or manual compilation is needed.

Your machine already has Homebrew, Node 26, npm, Neovim, and LazyVim. Use Node 22
to match GitHub Actions and `.nvmrc`:

```sh
brew install node@22
export PATH="$(brew --prefix node@22)/bin:$PATH"
node --version
npm --version
```

Add that `export PATH=...` line to `~/.zshrc` to keep it in new terminals. If you
already use nvm instead, run `nvm install` and `nvm use` in the repository; they
read `.nvmrc`. Choose one approach. Node 22 remains a supported LTS release
([Node release schedule](https://nodejs.org/en/about/previous-releases)).

```sh
cd ~/Desktop/aarush-portfolio
npm ci
npm run lint
npm run typecheck
```

`npm ci` installs exact lockfile versions. Run it initially and after pulling
dependency changes. Use `npm install <package>` when intentionally changing
dependencies, and include the resulting lockfile changes in review.

You may see an ESLint 9 deprecation warning. It is currently retained because the
Next.js 15 lint preset supports ESLint versions 7–9. The warning does not prevent
development; moving to a maintained lint toolchain is separate follow-up work.
The scoped PostCSS override in `package.json` replaces Next.js 15's pinned older
copy with a patched PostCSS 8 release. Keep it until the upstream dependency is
patched or the framework is upgraded.

### LazyVim

Open the repository root so the editor finds `tsconfig.json` and local packages:

```sh
nvim .
```

Your config already enables `lang.typescript` and the TypeScript `tsc`, Biome,
and Oxc extras. On another machine, enable `lang.typescript` with `:LazyExtras`
and restart Neovim ([LazyVim TypeScript guide](https://www.lazyvim.org/extras/lang/typescript)).

Open `app/page.tsx`, allow Mason to install its language tools, and use `:Mason`
and `:checkhealth vim.lsp` to diagnose setup. With a language server attached,
`K` shows hover information, `gd` jumps to a definition, `<leader>cr` renames a
symbol, and `<leader>ca` opens code actions.

The authoritative repo lint command is `npm run lint` (ESLint); Biome/Oxc editor
diagnostics are separate. Avoid whole-file formatting of untouched code and
match existing conventions.

## Daily development

In one terminal:

```sh
cd ~/Desktop/aarush-portfolio
# If using nvm: nvm use
npm run dev
```

Open http://localhost:3000. In a second terminal run `nvim .`, edit, and save
with `:w`; Next.js refreshes the browser. Stop the server with `Ctrl-C`. No
`.env` file, database, or backend is required.

```sh
# Before reviewing a change
npm run lint
npm run typecheck
npm run build
git diff
```

To preview the production export, stop the dev server and serve `out/`:

```sh
python3 -m http.server 3000 --directory out
```

Visit the same localhost URL. `next start` is incompatible with this project's
`output: "export"` ([Next.js static export docs](https://nextjs.org/docs/app/guides/static-exports)).

If port 3000 is occupied, run `npm run dev -- --port 3001` and use localhost:3001.
If the first type check needs generated `next-env.d.ts`, run `npm run dev` or
`npm run build` once, then retry `npm run typecheck`.

## Where to edit

| Change | Location |
| --- | --- |
| Bio, interests, profile links | `content/info.ts` |
| Work experience | `content/work.ts` |
| Projects and demos | `content/projects.ts`, `content/irouter-demo.ts` |
| Writing list | `content/writing.ts` |
| First engineering article | `content/writing/work-in-progress.ts` |
| Article layout and typography | `components/writing/Article.tsx`, `.article-content` in `app/globals.css` |
| Navigation links | `content/navigation.ts` |
| Routes and page composition | `app/**/page.tsx` |
| UI components | `components/` |
| Shared data types | `types/content.ts` |
| Theme and typography | `app/globals.css` |
| Images and downloadable files | `public/` |

Only project expansion needs client state. Content is plain typed data, without
a CMS or object-oriented framework. The writing index links to the local
`/writing/work-in-progress/` article, now a draft of "From a Training Pipeline to
Safe Model Delivery". Edit its Markdown `body` in
`content/writing/work-in-progress.ts`; its two diagrams live in
`public/writing/killchain/` and can be opened at full size from the article.
Manrope is bundled in `public/fonts/` with its license; the site loads it locally.

## Deployment

GitHub Actions uses Node 22 and publishes `out/` on pushes to `master` or manual
dispatch. `public/CNAME` sets the custom domain. Review before publishing.
`PAGES_BASE_PATH` is supplied by Pages for subpath deployments; leave it unset
locally. `assetPath()` prefixes component images consistently. Images are
unoptimized because GitHub Pages has no Next.js image server.
