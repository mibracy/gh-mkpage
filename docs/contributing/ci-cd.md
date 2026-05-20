# CI/CD pipeline

The docs site is built and deployed via GitHub Actions.

## Workflows

### Deploy docs (`docs.yml`)

| Trigger | Action |
|---------|--------|
| Push to `main` | Builds site with `squidfunk/mkdocs-material`, deploys to root of `gh-pages` |
| PR open / update | Builds site, deploys to `preview/pr-#` on `gh-pages` |
| PR merged / closed | Removes `preview/pr-#` folder from `gh-pages` |

PR previews use `keep_files: true` so they never overwrite the root site or other previews.

### CodeQL (`codeql.yml`)

Runs on push and PR to `main`, plus weekly. Scans JavaScript/TypeScript for security vulnerabilities.

## Local build

```bash
docker run --rm -v ${PWD}:/docs squidfunk/mkdocs-material build
```

## Adding a workflow

1. Create `.github/workflows/<name>.yml`
2. Test via a PR to `main` — the runner picks up new workflow files automatically

## Dependabot

Configured in `.github/dependabot.yml` for `github-actions` and `docker`. Runs weekly and opens PRs for version bumps.
