# Architecture

How the pieces of **gh-mkpage** fit together — from config to custom JS to deployment.

## Layers

```mermaid
flowchart LR
  A[mkdocs.yml] --> B[MkDocs build]
  C[docs/ *.md] --> B
  D[extra_css] --> B
  E[extra_js] --> B
  B --> F[Static HTML site]
  F --> G[gh-pages branch]
  G --> H[GitHub Pages]
```

## Component guide

| Component | Location | Purpose |
|-----------|----------|---------|
| Site config | `mkdocs.yml` | Theme, nav, extensions, plugins |
| Custom CSS | `docs/stylesheets/extra.css` | Style picker modal, light sepia background |
| Custom JS | `docs/javascripts/prefs.js` | Style picker logic, palette persistence |
| Custom JS | `docs/javascripts/mermaid-zoom.js` | Mermaid diagram zoom + pan |
| Content | `docs/` | All markdown pages |
| Skills | `.agents/skills/` | Agent skill instructions |
| Hooks | `.githooks/` | Pre-commit demo enforcement |
| CI/CD | `.github/workflows/` | Build, deploy, CodeQL |

## Theme combos

Open the style picker (paintbrush icon in the header) to try these:

| Primary | Accent | Scheme | Vibe |
|---------|--------|--------|------|
| brown | amber | slate | Default — earthy dark |
| teal | cyan | slate | Deep tech dark |
| deep-purple | amber | slate | Royal dark |
| blue-grey | light-blue | slate | Muted professional |
| brown | amber | default | Default — warm light (sepia bg) |
| blue | orange | default | Clean light with pop |
| green | lime | default | Fresh light |
| red | orange | default | Warm light |
