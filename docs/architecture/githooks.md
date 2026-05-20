# Git hooks

## Pre-commit hook

Location: `.githooks/pre-commit`

Purpose: Enforce that every new skill under `.agents/skills/<name>/` has a matching demo file at `docs/skills/<name>-demo.md`.

How it works:

1. Finds all directories under `.agents/skills/`
2. For each, checks that `docs/skills/<name>-demo.md` exists
3. If any are missing, prints the list and exits non-zero

### Install

```bash
git config core.hooksPath .githooks
```

The hook only checks files that are staged in the current commit, so existing skills without demos won't block unrelated changes.
