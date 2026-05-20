# AGENTS.md — gh-mkpage

This repository has no files, no commits, and no remotes configured. It is a blank git repository.

Treat it as a greenfield project. There are no existing conventions, configs, toolchains, or tests to preserve.

## Conventions

- **Every skill needs a demo file.** Adding a skill under `.agents/skills/<name>/` requires a corresponding `docs/skills/<name>-demo.md`. Enforced by `.githooks/pre-commit`.

## Installed skills

- **caveman** (`juliusbrussee/caveman@caveman`) — ultra-compressed communication mode. Cuts token usage ~75%. Intensity levels: lite, full (default), ultra, wenyan variants. Installed at `.agents/skills/caveman`.
- **create-readme** (`github/awesome-copilot@create-readme`) — generates a README.md from project review.
- **mermaid-diagrams** (`softaworks/agent-toolkit@mermaid-diagrams`) — creates software diagrams from text using Mermaid syntax.
- **diagnose** — disciplined debug loop for hard bugs and performance regressions.
- **grill-me** — interview the user relentlessly to stress-test a plan or design.
- **grill-with-docs** — grill plan against existing domain model and docs, updates CONTEXT.md/ADRs inline.
- **handoff** — compact conversation into a handoff doc for another agent.
- **improve-codebase-architecture** — find deepening/refactoring opportunities informed by domain language.
- **prototype** — build throwaway prototypes for design exploration.
- **setup-matt-pocock-skills** — run first to configure issue tracker, labels, and doc layout for the other skills.
- **tdd** — red-green-refactor test-driven development loop.
- **to-issues** — break plans/PRDs into tracer-bullet issues on the tracker.
- **to-prd** — turn conversation context into a published PRD.
- **triage** — triage issues through a state machine with roles.
- **write-a-skill** — create new agent skills with proper structure.
- **zoom-out** — get broader context about unfamiliar code sections.
