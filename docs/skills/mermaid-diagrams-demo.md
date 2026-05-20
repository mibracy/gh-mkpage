# Mermaid Diagrams Demo

Create professional software diagrams from text. Zoom/pan with mouse wheel + drag.

## Diagram types

### Flowchart — CI/CD pipeline

```mermaid
flowchart TD
  A[Push to main] --> B{Build site}
  B --> C[Site dir]
  C --> D{Deploy target}
  D -->|main branch| E[gh-pages root]
  D -->|PR| F[gh-pages/preview/pr-N]
  E --> G[github.io]
  F --> G
  H[PR closed] --> I[Cleanup preview/pr-N]
```

### Sequence — API auth flow

```mermaid
sequenceDiagram
  participant C as Client
  participant G as Gateway
  participant A as Auth Service
  participant D as Database
  C->>G: GET /api/resource
  G->>A: Validate token
  A->>D: Check session
  D-->>A: Valid
  A-->>G: OK
  G->>G: Rate limit check
  G-->>C: 200 + data
```

### Class — Domain model

```mermaid
classDiagram
  class User {
    +UUID id
    +String name
    +String email
    +login() Token
    +logout() void
  }
  class Project {
    +UUID id
    +String slug
    +String repoUrl
    +deploy() void
  }
  class Deployment {
    +UUID id
    +String branch
    +String status
    +rollback() void
  }
  User "1" --> "*" Project : owns
  Project "1" --> "*" Deployment : has
```

### Entity Relationship — Schema

```mermaid
erDiagram
  USER ||--o{ PROJECT : owns
  PROJECT ||--|{ DEPLOYMENT : has
  PROJECT ||--o{ SKILL : configures
  USER {
    uuid id PK
    string name
    string email
  }
  PROJECT {
    uuid id PK
    string slug
    string repo_url
  }
  DEPLOYMENT {
    uuid id PK
    string branch
    string status
    datetime created_at
  }
```

### State — Deployment lifecycle

```mermaid
stateDiagram-v2
  [*] --> Queued
  Queued --> Building
  Building --> Deploying
  Deploying --> Live
  Deploying --> Failed
  Live --> RollingBack
  RollingBack --> Live
  Failed --> Queued
  Live --> [*]
```

### Git graph — Branch strategy

```mermaid
gitGraph
  commit id: "init"
  commit id: "docs"
  branch feat/new-skill
  commit id: "skill-wip"
  commit id: "demo-file"
  checkout main
  commit id: "ci-fix"
  merge feat/new-skill
  commit id: "release"
```

### Gantt — Sprint timeline

```mermaid
gantt
  title Sprint 1
  dateFormat  YYYY-MM-DD
  section Setup
  Repo init          :done, 2026-05-19, 1d
  Skills install     :done, 2026-05-19, 1d
  section Docs
  MkDocs config      :done, 2026-05-19, 1d
  CI/CD pipeline     :done, 2026-05-19, 1d
  section Polish
  Theme customization:active, 1d
  README             :done, 2026-05-19, 1d
```

## ROI to human

Diagrams that live in version control, stay current with code, and render anywhere.
