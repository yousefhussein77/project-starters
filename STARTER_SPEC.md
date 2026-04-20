# Starter Spec

This file defines the minimum contract for adding or maintaining a starter in this repository.

## Standard Starter Structure

Use a simple, self-contained folder structure. Not every starter needs every folder, but the shape should stay understandable.

```text
starter-name/
  README.md
  CHANGELOG.md                # recommended once the starter begins evolving
  docs/                       # optional but recommended for non-trivial starters
  examples/ or templates/     # include when the starter benefits from reference usage
  starter files and folders
```

## Required Files

Each starter must include:

- `README.md`

Recommended for any starter that is more than minimal:

- `CHANGELOG.md`
- `docs/overview.md`
- `docs/customization.md` or another focused customization guide

Add `examples/` or `templates/` when example usage materially helps adoption.

## Minimum README Requirements

Every starter `README.md` should include, at minimum:

- what the starter is
- who it is for
- what is included
- what is intentionally excluded
- folder structure summary
- how to adopt or integrate it
- main customization points
- recommended next steps after adoption

The README should let a new developer understand the starter in a few minutes.

## Documentation Requirements

Starter docs should explain the parts that are not obvious from filenames alone.

- Use `docs/overview.md` to explain structure and architectural intent.
- Use `docs/customization.md` when the starter expects theme, token, layout, or behavior changes.
- Keep documentation short, direct, and implementation-aware.
- Prefer concrete guidance over theoretical language.

## Preview and Example Requirements

Add previews, templates, or examples when they reduce ambiguity.

- Use `templates/` for starter-ready layout files or integration references.
- Use `examples/` for sample usage patterns when the starter is not tied to one template engine.
- Do not add demo material that is large, noisy, or harder to maintain than the starter itself.

## Naming Conventions

- Starter folder names must use kebab-case.
- Names should reflect purpose, such as `reusable-design-system-starter`.
- Avoid temporary project names unless the starter is intentionally project-bound.
- Use conventional file names so contributors know where to look.

## Include

Starters should include:

- reusable structure
- focused documentation
- clear adoption guidance
- realistic defaults
- small, maintainable examples when useful

## Exclude

Starters should not include:

- secrets or environment-specific values
- unrelated business logic
- client-only branding that blocks reuse
- unused code copied from another project
- heavy tooling that is not required for the starter's purpose

## When a Starter Is `usable`

A starter can be marked as `usable` when:

- its purpose is clear
- its structure is coherent
- its README is complete
- adoption steps are documented
- included versus excluded scope is explicit
- the reusable parts can be identified without digging through unrelated files

`draft` means still forming and not yet documented enough for confident reuse.

`production-candidate` means the starter is stable, clearly documented, and ready to be used as a strong default in real projects with minimal clarification.

## Quality Checklist

Before a starter is accepted or upgraded in status, verify:

- folder name is clear and consistent
- starter is self-contained
- `README.md` is complete and current
- docs match the actual files
- examples or templates are present when helpful
- reusable code is separated from app-specific code
- no unnecessary dependency or large generated output was added
- a new developer could understand the starter quickly
