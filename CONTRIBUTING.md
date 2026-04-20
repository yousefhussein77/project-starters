# Contributing

This repository accepts changes that improve starter quality, clarity, and reuse.

## Adding a New Starter

1. Create a new top-level starter folder with a clear kebab-case name.
2. Follow the structure and requirements in [STARTER_SPEC.md](/d:/PROJECT%20STARTERS/project-starters-main/STARTER_SPEC.md).
3. Add a starter `README.md` before treating the starter as reviewable.
4. Keep reusable assets inside the starter and keep project-specific code out.
5. Update the root [README.md](/d:/PROJECT%20STARTERS/project-starters-main/README.md) so the starter appears in `Available Starters`.

## Updating an Existing Starter

1. Preserve the current purpose of the starter.
2. Prefer small, practical improvements over broad refactors.
3. Update starter documentation when behavior, structure, or adoption guidance changes.
4. Keep file organization understandable for someone seeing the starter for the first time.
5. If a change reduces reuse or increases coupling to one project, do not merge it as a general starter improvement.

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

## Pull Request Checklist

Before opening a pull request, confirm that:

- the change fits the starter-library direction of this repository
- the relevant starter remains self-contained
- documentation was updated where needed
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
