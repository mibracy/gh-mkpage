# Update 2 — Docs site + CI/CD pipeline

**Date:** 2026-05-19

Docs infrastructure online:

- `mkdocs.yml` — Material theme + Mermaid fences
- `docs/skills/` — demo files for all 14 skills
- `docs/index.md` — entry page, links every skill demo
- `.github/workflows/docs.yml` — 3-job workflow:
  - Push to `main` → build + deploy to `gh-pages` root
  - PR open/sync → build + deploy to `gh-pages/preview/pr-#/`
  - PR close → cleanup `preview/pr-#/` folder
- Docker image: `squidfunk/mkdocs-material`

Project updates folder (`docs/updates/`) live and tracked.

Next: set up issue tracker, define project goal, start building.
