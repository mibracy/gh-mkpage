# gh-mkpage

[![CI](https://github.com/mibracy/gh-mkpage/actions/workflows/docs.yml/badge.svg)](https://github.com/mibracy/gh-mkpage/actions/workflows/docs.yml)
[![CodeQL](https://github.com/mibracy/gh-mkpage/actions/workflows/codeql.yml/badge.svg)](https://github.com/mibracy/gh-mkpage/actions/workflows/codeql.yml)
[![GitHub Pages](https://img.shields.io/github/deployments/mibracy/gh-mkpage/github-pages?label=pages&logo=github)](https://mibracy.github.io/gh-mkpage/)
[![Dependabot alerts](https://img.shields.io/github/dependabot/alerts/mibracy/gh-mkpage?label=vulnerabilities)](https://github.com/mibracy/gh-mkpage/security/dependabot)

Generate and deploy markdown documentation pages from GitHub using automated CI/CD. → **[Documentation](https://mibracy.github.io/gh-mkpage/)**

## Features

- **MkDocs + Material theme** — modern docs site with search, navigation, code highlighting
- **Mermaid diagram support** — render flowcharts, sequence diagrams, and more inline
- **GitHub Actions CI/CD** — auto-builds on push to `main`, deploys to `gh-pages`
- **PR previews** — each PR gets a `preview/pr-#` folder on `gh-pages`, auto-cleaned on merge
- **Agent skill ecosystem** — 15+ installed skills for caveman comms, TDD, triage, code review, handoff, and more
- **Demo enforcement** — pre-commit hook requires a demo file for every new skill

## Quick start

```bash
git clone https://github.com/mibracy/gh-mkpage.git
cd gh-mkpage
# Preview locally
docker run --rm -it -p 8000:8000 -v ${PWD}:/docs squidfunk/mkdocs-material
```

## Project structure

```
.agents/skills/     # Installed agent skills
.githooks/          # Pre-commit hook (skill-demo enforcement)
.github/workflows/  # CI/CD pipeline
docs/
  index.md          # Entry page
  skills/           # Skill demo files
  updates/          # Project progress logs
mkdocs.yml          # Docs site config
AGENTS.md           # Agent workspace instructions
```

## Docs workflow

| Trigger | Deployment |
|---|---|
| Push to `main` | Root of `gh-pages` |
| PR open / update | `preview/pr-#` on `gh-pages` |
| PR merged / closed | `preview/pr-#` removed |

> [!NOTE]
> PR previews use `keep_files: true` so they never overwrite the root site or other PR previews.

## Requirements

- Docker (for local preview)
- GitHub repository with Pages enabled

## License

MIT
