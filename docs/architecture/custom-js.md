# Custom JavaScript

## Style picker (`prefs.js`)

Provides a modal for choosing primary and accent colors. Persists to `localStorage.__style_picker`.

### How it works

1. On `DOMContentLoaded` and `DOMContentSwitch`, restores saved colors by setting `data-md-color-primary` and `data-md-color-accent` on `<body>`.
2. Injects a palette button into the header (before the dark/light toggle).
3. Opens a modal with color swatches on click.
4. Reset clears saved prefs and reloads, returning to Material defaults.

### Persistence

Uses `localStorage` with key `__style_picker` (stringified JSON `{primary, accent}`).

## Mermaid zoom (`mermaid-zoom.js`)

Adds pan and zoom to all Mermaid SVG diagrams.

### How it works

1. A `MutationObserver` watches `.md-content` for new `svg` elements that are children of `.mermaid`.
2. On `DOMContentSwitch` (instant navigation), scans for any Mermaid SVGs already present.
3. Wraps each SVG in a transparent overlay and attaches `wheel` (zoom) and `mousedown/mousemove/mouseup` (pan) handlers.
4. Zoom centers on cursor position using CSS `transform: scale()` + `translate()`.

## Page transitions

On `DOMContentSwitch`, the `.md-content` element gets a CSS animation (fade in + translateY) via `@keyframes pageEnter`. The animation is reset on each navigation via `requestAnimationFrame`.
