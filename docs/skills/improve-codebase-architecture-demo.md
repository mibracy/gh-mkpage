# Improve Codebase Architecture Demo

Surface architectural friction and propose **deepening opportunities** — refactors that turn shallow modules into deep ones.

**Key concepts:**
- **Module** — anything with an interface + implementation
- **Depth** — leverage at the interface (much behaviour behind small API)
- **Seam** — where behaviour can be altered without editing in place
- **Adapter** — concrete thing satisfying an interface at a seam

Informed by domain language in CONTEXT.md and decisions in docs/adr/.

## ROI to human

Smaller interfaces, less coupling, easier testing. Pays off every future change.
