# Adding skills

Agent skills live under `.agents/skills/<name>/` with a `SKILL.md` entrypoint.

## Steps

1.  **Create the skill directory**

    ```bash
    mkdir -p .agents/skills/<name>/references
    ```

2.  **Write `SKILL.md`** — the skill instructions for the agent. Include progressive disclosure, code snippets, reference links.

3.  **Create a demo file** at `docs/skills/<name>-demo.md`

    The pre-commit hook enforces this, so it must exist before committing. Follow existing demo patterns: brief description, capabilities list, ROI to human.

4.  **Register in the nav** — add an entry under `Skills` in `mkdocs.yml`

5.  **Register in `AGENTS.md`** — add a bullet to the Installed skills section

6.  **Update the skills index** — add a row to the table in `docs/skills/index.md`

7.  **Commit and push**

    ```bash
    git add .agents/skills/<name>/ docs/skills/<name>-demo.md
    git commit -m "Add <name> skill"
    ```

## Demo file template

```markdown
# <Name> Demo

Brief description.

**Capabilities:**
1. Thing it can do
2. Thing it can do
3. Thing it can do

## ROI to human

Why this skill matters.
```
