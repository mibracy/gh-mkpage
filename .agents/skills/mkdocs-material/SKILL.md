---
name: mkdocs-material
description: >
  Expert guidance for building documentation sites with Material for MkDocs.
  Use when user asks about configuring mkdocs, adding diagrams, customizing theme,
  setting up navigation, writing docs pages, or improving their docs site.
---

# Material for MkDocs Skill

Build professional documentation sites with MkDocs + Material theme. Covers config, content creation, theme customization, and deployment.

## mkdocs.yml essentials

```yaml
site_name: My Project
site_url: https://example.org/project
repo_url: https://github.com/user/repo
edit_uri: edit/main/docs/

theme:
  name: material
  features:
    - navigation.instant
    - navigation.instant.progress
    - navigation.tracking
    - navigation.sections
    - navigation.indexes
    - navigation.top
    - search.highlight
    - content.tabs.link
    - content.code.copy
    - content.code.select
  palette:
    - scheme: slate
      primary: brown
      accent: amber
      toggle:
        icon: material/weather-sunny
        name: Switch to light mode
    - scheme: default
      primary: brown
      accent: amber
      toggle:
        icon: material/weather-night
        name: Switch to dark mode
  font:
    text: Roboto
    code: Roboto Mono
  icon:
    logo: material/book
    repo: fontawesome/brands/github
```

## Navigation patterns

Available features (pick what fits):

| Feature | Effect |
|---------|--------|
| `navigation.tabs` | Top-level sections as tabs at top (above 1220px) |
| `navigation.tabs.sticky` | Lock tabs below header on scroll |
| `navigation.sections` | Group top-level nav entries as expandable sections |
| `navigation.indexes` | Use index.md as section overview page |
| `navigation.instant` | SPA-like page loads via fetch + DOM swap |
| `navigation.instant.progress` | Progress bar during instant nav |
| `navigation.tracking` | Update URL hash as user scrolls |
| `navigation.top` | Floating back-to-top button |
| `navigation.footer` | Previous/next links below content |
| `toc.integrate` | Sidebar nav includes table of contents |
| `search.highlight` | Highlight search terms in results |
| `search.suggest` | Suggest search completions |
| `search.share` | Shareable search result links |

## Palette — color schemes

Define dark + light schemes. First entry is default. Material maps color names to CSS variables automatically.

```yaml
palette:
  - scheme: slate           # dark
    primary: indigo
    accent: indigo
  - scheme: default         # light
    primary: indigo
    accent: indigo
```

Supported primary/accent values: red, pink, purple, deep-purple, indigo, blue, light-blue, cyan, teal, green, light-green, lime, yellow, amber, orange, deep-orange, brown, grey, blue-grey.

## Markdown extensions — full config

Apply all for maximum expressive power:

```yaml
markdown_extensions:
  - abbr
  - admonition
  - attr_list
  - def_list
  - footnotes
  - md_in_html
  - toc:
      permalink: true
      toc_depth: 3
  - pymdownx.arithmatex:
      generic: true
  - pymdownx.betterem:
      smart_enable: all
  - pymdownx.caret
  - pymdownx.details
  - pymdownx.emoji:
      emoji_index: !!python/name:material.extensions.emoji.twemoji
      emoji_generator: !!python/name:material.extensions.emoji.to_svg
  - pymdownx.highlight:
      anchor_linenums: true
      line_spans: __span
      pygments_lang_class: true
  - pymdownx.inlinehilite
  - pymdownx.keys
  - pymdownx.mark
  - pymdownx.smartsymbols
  - pymdownx.superfences:
      custom_fences:
        - name: mermaid
          class: mermaid
          format: !!python/name:pymdownx.superfences.fence_code_format
  - pymdownx.tabbed:
      alternate_style: true
  - pymdownx.tasklist:
      custom_checkbox: true
  - pymdownx.tilde
```

## Content patterns

### Admonitions (callouts)

```markdown
> [!NOTE]
> Useful info.

> [!TIP]
> Best practice suggestion.

> [!WARNING]
> Proceed with caution.

> [!DANGER]
> Irreversible action.
```

### Content tabs

```markdown
=== "Unix"
    ```bash
    ./script.sh
    ```

=== "Windows"
    ```powershell
    .\script.ps1
    ```
```

### Code annotations (numbered)

```markdown
```python
def hello():  # (1)
    print("world")
```

1. Entry point.
```

### Annotated diagrams

```markdown
```mermaid
flowchart LR
  A[Dev] -->|push| B{CI}  # (1)
  B --> C[Staging]
  B --> D[Prod]
```

1. Triggers build + deploy workflow.
```

### Keys + shortcuts

```markdown
Press ++ctrl+alt+del++ to reboot.
```

### Task lists

```markdown
- [x] Done
- [ ] Pending
```

### Math (LaTeX)

```markdown
$$\sum_{i=1}^{n} i = \frac{n(n+1)}{2}$$
```

### Emoji shortcuts

```markdown
:material-account: — Material icon
:fontawesome-brands-github: — FontAwesome brand
:octicons-code-24: — Octicon
```

## Plugins

```yaml
plugins:
  - search
  - tags               # page tag index
  - blog               # blog section
  - rss                # RSS/Atom feeds
  - social:            # OG image generation
      cards_layout: default/variant
  - offline            # PWA offline support
  - privacy:           # local asset bundling
      enabled: !ENV [CI, false]
```

## Best practices

- **One page per topic.** Break large docs into focused pages linked from an index.
- **Use index.md as section landing.** Set `navigation.indexes` and place `index.md` in each folder.
- **Prefer admonitions over bold/italic** for warnings, notes, and tips.
- **Use content tabs** for platform-specific instructions (Unix vs Windows, npm vs pnpm).
- **Set `site_url` correctly.** Required for search, sitemap, social cards.
- **Use `edit_uri`** so readers can suggest edits directly on GitHub.
- **Avoid deep nesting.** Max 3 levels of sidebar hierarchy.
- **Turn on `content.code.copy`** — every code block gets a copy button.
- **Use `navigation.instant`** for fast page transitions but test with custom JS first.
- **Run `mkdocs build --strict`** to catch broken links in CI.
- **Place `extra_css` and `extra_javascript`** in `docs/stylesheets/` and `docs/javascripts/` respectively.
- **For Mermaid, use `pymdownx.superfences` custom fences** — don't use the mkdocs-mermaid2-plugin, Material has built-in support.

## Common troubleshooting

- **Mermaid not rendering in build output:** Mermaid renders client-side only. Built HTML should not contain SVG — it's generated in-browser.
- **nav hidden on mobile:** Use `navigation.sections` and check viewport width.
- **Palette toggle missing:** Each palette entry needs a `toggle` with `icon` and `name`.
- **Copy button not showing:** Add `content.code.copy` to theme features.
- **Sidebar not showing index page:** Add `navigation.indexes` feature and place `index.md` in the folder.
