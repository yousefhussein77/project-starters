# Contributing

This repository accepts changes that improve starter quality, clarity, and reuse.

## Adding a New Starter

1. Create a new top-level starter folder with a clear kebab-case name.
2. Follow the structure and requirements in [STARTER_SPEC.md](./STARTER_SPEC.md).
3. Add a starter `README.md` before treating the starter as reviewable.
4. Make the starter's included scope and excluded scope explicit.
5. Add basic adoption steps so a new developer knows how to start using it.
6. Add previews, templates, or examples when they materially reduce ambiguity.
7. Update the root [README.md](./README.md) so the starter appears in `Available Starters`.

## Updating an Existing Starter

1. Preserve the current purpose of the starter.
2. Prefer small, practical improvements over broad refactors.
3. Update starter documentation when behavior, structure, or adoption guidance changes.
4. Keep file organization understandable for someone seeing the starter for the first time.
5. Keep adoption steps current if integration or customization guidance changes.
6. If examples or previews become misleading, update them with the same change.
7. If a change reduces reuse or increases coupling to one project, do not merge it as a general starter improvement.

## Naming Rules

- Use kebab-case for starter folder names.
- Choose names that describe the starter's function, not a temporary project name.
- Use consistent, predictable names for common documentation files such as `README.md`, `CHANGELOG.md`, and `docs/`.
- Prefer simple names for folders like `templates`, `examples`, `tokens`, `components`, or `docs`.

## Do Not Add

- App-specific secrets, credentials, or environment files.
- Generated build output unless it is intentionally part of the starter.
- Large binary assets that are not essential to understanding or using the starter.
- Unused duplicate files.
- Experimental tooling, scaffolding layers, or dependencies that do not materially improve the starter itself.
- Project-specific business rules presented as reusable defaults.

## Documentation Expectations

Every contribution should keep documentation practical and easy to scan.

- Root docs should explain how the repository works as a library.
- Starter docs should explain what the starter is, who it is for, what it includes, and what it intentionally excludes.
- Adoption steps should be clear enough for a new developer to follow quickly.
- If customization is expected, document the main extension points.
- README quality should be strong enough that a developer can understand the starter without opening many files first.
- When a starter benefits from visual confirmation, add lightweight previews or examples instead of long explanation.

## Scope Expectations

Each starter should draw a clear boundary between reusable and app-specific work.

- Include reusable structure, assets, templates, and guidance that can survive the next project.
- Exclude business-specific flows, secrets, client-only branding, and code that only makes sense in one application.
- If a file would need to be rewritten for almost every adopter, it probably does not belong in the starter.

## Adoption Expectations

Starter docs should help a new adopter answer these questions quickly:

- what should be copied into a real project
- what should stay outside the starter
- what can be customized safely first
- whether preview pages, templates, or examples are available
- what the recommended next steps are after initial adoption

## Pull Request Checklist

Before opening a pull request, confirm that:

- the change fits the starter-library direction of this repository
- the relevant starter remains self-contained
- documentation was updated where needed
- included versus excluded scope is still clear
- adoption steps still match the actual files
- previews or examples were updated if they are part of the starter
- no unnecessary dependency was introduced
- no aggressive restructuring was done without clear need
- naming and folder structure remain consistent
- the root `README.md` still reflects the current repository contents

## Review Expectations

Reviews will favor:

- clarity over cleverness
- reusability over project-specific shortcuts
- conservative structure changes
- documentation that makes adoption faster for the next developer
