# Site configuration

## Theme

Uses `squidfunk/mkdocs-material` with the following features:

- `navigation.instant` — SPA-like fetch + DOM swap for faster navigation
- `navigation.instant.progress` — progress bar during page loads
- `navigation.indexes` — uses folder `index.md` as section overview
- `navigation.tracking` — URL hash updates on scroll

## Palette

The first palette entry is the default (dark mode). Two schemes:

| Scheme | Default | Colors |
|--------|---------|--------|
| `slate` | Yes | `primary: brown`, `accent: amber` |
| `default` | No | `primary: brown`, `accent: amber` |

The toggle icon swaps between sun and moon.

## Markdown extensions

Only `pymdownx.superfences` with Mermaid custom fences is configured directly in `mkdocs.yml`. The full extension set in the mkdocs-material skill (`SKILL.md`) is available for reference but not enabled — add extensions as needed.

## Plugins

| Plugin | Purpose |
|--------|---------|
| `search` | Full-text client-side search |

More plugins (blog, social, offline) can be added; see the mkdocs-material skill for config.
