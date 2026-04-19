# Reusable Design System Starter

Starter reusable frontend package extracted from the current Zakat System UI structure.

## Purpose

This package is meant to live in the separate `project-starters` repository as a reusable starter.
It keeps the runtime naming professional and direct:

- `design_system/` for reusable CSS and JS assets
- `templates/` for starter template examples

Inside real applications, the recommended runtime path is still `app/static/design_system/`.
The repository or collection name can remain `project-starters/`.

## Included

- `design_system/tokens/`: design tokens
- `design_system/themes/`: starter themes
- `design_system/components/`: reusable component styles
- `design_system/responsive/`: responsive helpers
- `design_system/js/password-toggle.js`: password toggle helper
- `design_system/js/validation.js`: generic validation kit
- `design_system/js/design-system-init.js`: boot/reveal initializer
- `templates/base_layout.html`: starter layout example

## Suggested Usage

1. Copy `design_system/` into your app static assets.
2. Load the CSS files in this order:
   - `tokens/*`
   - `themes/default.css`
   - project theme
   - `components/*`
   - `responsive/*`
3. Load `design_system/js/design-system-init.js` as a module.
4. Keep app-specific scripts outside the starter package.

## Notes

- App-specific files such as `app.js`, `app-validation.js`, and project page CSS are intentionally excluded.
- This package is focused on reusable frontend structure only.
