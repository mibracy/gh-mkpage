# Local development

## Prerequisites

- Docker (for mkdocs-material image)
- Git with hooks installed

## Preview the site

```bash
docker run --rm -it -p 8000:8000 -v ${PWD}:/docs squidfunk/mkdocs-material
```

Opens at `http://localhost:8000`. Live-reloads on file changes.

## Install git hooks

```bash
git config core.hooksPath .githooks
```

The pre-commit hook enforces that every new skill under `.agents/skills/<name>/` has a matching demo file at `docs/skills/<name>-demo.md`.

## Build without serving

```bash
docker run --rm -v ${PWD}:/docs squidfunk/mkdocs-material build
```

Output lands in `site/` (gitignored).
