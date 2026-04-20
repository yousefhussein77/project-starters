# Project Starters

`project-starters` is a curated starter library for reusable project foundations, UI systems, and practical app starting points.

The goal is simple: keep proven starters in one place, document them clearly, and make them easy to adopt, review, and improve over time.

## Project Philosophy

- Keep each starter self-contained and easy to understand.
- Prefer practical structure over heavy tooling.
- Separate reusable foundations from app-specific implementation.
- Improve starters gradually without breaking the current repository idea.
- Treat documentation as part of the starter contract, not as an optional extra.

## How To Use a Starter

1. Choose the starter that matches your project type.
2. Copy the starter folder into your new project or use it as a reference.
3. Read the starter `README.md` before making changes.
4. Keep reusable improvements general, and move business-specific logic into your actual app.
5. If you improve the reusable part, bring that change back into this library.

## Available Starters

### `reusable-design-system-starter`

- Name: `reusable-design-system-starter`
- Type: Frontend design system starter
- Status: `usable`
- Description: Reusable CSS, themes, tokens, layout patterns, and lightweight JavaScript helpers for web apps and internal tools.
- Use it when: You want a structured design-system foundation that can be adopted inside a Flask or server-rendered web app without pulling in a full framework or rewriting UI basics from scratch.

## Standards for Every Starter

Every starter in this repository should follow the same baseline contract:

- Use a clear, descriptive folder name.
- Stay self-contained inside its own directory.
- Include a focused `README.md` that explains purpose, audience, included parts, and excluded parts.
- Use a structure that a new developer can understand quickly.
- Keep reusable assets separate from app-specific code.
- Avoid unnecessary dependencies, generators, or hidden setup steps.
- Document any adoption steps, customization points, and known limitations.
- Reach at least `usable` quality before being presented as ready for normal adoption.

The full reference for new starters lives in [STARTER_SPEC.md](/d:/PROJECT%20STARTERS/project-starters-main/STARTER_SPEC.md).

## Repository Structure

```text
project-starters/
  README.md
  CONTRIBUTING.md
  STARTER_SPEC.md
  ROADMAP.md
  reusable-design-system-starter/
```

## How to Contribute

Contributions should improve clarity, reuse, and maintainability.

- Follow the starter contract in [STARTER_SPEC.md](/d:/PROJECT%20STARTERS/project-starters-main/STARTER_SPEC.md).
- Use [CONTRIBUTING.md](/d:/PROJECT%20STARTERS/project-starters-main/CONTRIBUTING.md) for contribution flow and pull request expectations.
- Prefer improving documentation and starter quality before adding more starters.
- Treat `reusable-design-system-starter` as the first reference example for future starter quality.

## Current Direction

This repository is evolving from a simple starter collection into a clearer starter library.

That means:

- better root-level documentation
- a shared contract for every starter
- stronger starter-level docs
- gradual growth without aggressive restructuring
