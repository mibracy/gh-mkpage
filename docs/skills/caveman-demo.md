# Caveman Demo

Caveman mode cuts token usage ~75%. Levels:

- **lite** — no filler, keep full sentences
- **full** — drop articles, fragments OK
- **ultra** — abbreviate prose, arrows for causality

Example: *Why component re-render?*
- lite: "Your component re-renders because you create a new object reference each render."
- full: "New object ref each render. Wrap in `useMemo`."
- ultra: "Inline obj prop → new ref → re-render. `useMemo`."
