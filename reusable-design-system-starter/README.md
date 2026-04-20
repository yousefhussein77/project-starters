# Reusable Design System Starter

## What This Starter Is

`reusable-design-system-starter` is a reusable frontend foundation for server-rendered web apps and internal tools. It packages design tokens, themes, component styles, responsive helpers, and lightweight JavaScript utilities in a structure that can be moved into a real application with minimal friction.

## Who It Is For

This starter is for teams that want:

- a reusable UI baseline without adopting a large frontend framework
- a cleaner starting point for Flask or template-driven web apps
- a design-system layer that can be branded and extended per project

## What Is Included

- `design_system/tokens/`: base tokens for color, spacing, radius, shadows, and typography
- `design_system/themes/`: theme-level variable overrides
- `design_system/components/`: reusable UI component styles
- `design_system/responsive/`: responsive helpers and mobile adjustments
- `design_system/js/`: small JavaScript helpers for shell boot, password toggle, and validation setup
- `templates/base_layout.html`: example base layout showing how assets are assembled
- `docs/`: guidance for architecture and customization

## What Is Intentionally Excluded

- app-specific routes, views, or backend code
- page-level business logic
- project-only branding that should not be shared across adopters
- build tooling or framework setup beyond what is needed to understand the starter
- deep component variants for every possible product scenario

## Folder Structure

```text
reusable-design-system-starter/
  README.md
  CHANGELOG.md
  docs/
    customization.md
    overview.md
  design_system/
    components/
    js/
    responsive/
    themes/
    tokens/
  templates/
    base_layout.html
```

## How To Integrate It

1. Copy `design_system/` into your application's static assets.
2. Use `templates/base_layout.html` as a reference for stylesheet and script loading order.
3. Start with `themes/default.css`, then add or replace a project theme.
4. Keep app-specific scripts, pages, and business rules outside the reusable starter files.
5. Rename or replace example theme files only after you understand which values are reusable tokens versus project overrides.

## Customization Guide Summary

- Update base primitives in `design_system/tokens/` when the change should affect the whole system.
- Update `design_system/themes/` when branding or project-level identity changes.
- Extend `design_system/components/` carefully so component behavior stays reusable.
- Adjust `design_system/responsive/mobile.css` for layout behavior that should stay shared.
- Keep `design_system/js/` focused on generic helpers rather than app workflows.

Detailed guidance lives in [docs/overview.md](/d:/PROJECT%20STARTERS/project-starters-main/reusable-design-system-starter/docs/overview.md) and [docs/customization.md](/d:/PROJECT%20STARTERS/project-starters-main/reusable-design-system-starter/docs/customization.md).

## Recommended Next Steps After Adoption

1. Create a project theme file that overrides brand-facing variables only.
2. Map your app layouts to the provided component and layout primitives.
3. Move any project-only CSS and JS into separate app files from day one.
4. Document local conventions so future reusable improvements can come back into this starter cleanly.
