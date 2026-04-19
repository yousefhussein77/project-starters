# Reusable Design System Starter

A reusable design system starter for web projects that need a clean UI foundation, flexible branding, shared components, responsive behavior, and reusable validation helpers.

This starter is built to be:

- brandable for different companies and logos
- adaptable to different forms and field requirements
- reusable across multiple projects
- easy to copy into a new codebase

## What Is Included

- `tokens/` for shared design variables
- `themes/` for project identity and branding
- `components/` for reusable UI building blocks
- `responsive/` for shared mobile behavior
- `js/` for browser-side helpers
- `python/validation/` for reusable server-side validation helpers
- `templates/` for layout starters
- `examples/` for quick reference integrations
- `docs/` for reuse guidance

## Best Fit

Use this starter when you need:

- a reusable UI foundation for internal systems
- a starter for admin panels or dashboards
- a base design system for client projects
- a project that changes brand identity from client to client

## Not Included

This starter does not try to include:

- business-specific pages
- project-specific routes
- report-specific templates
- client-owned assets
- one-domain assumptions

Those should stay inside the final project that uses this starter.

## Quick Start

1. Copy `reusable-design-system-starter/` into your new project.
2. Move it into your framework's served static and template folders if needed.
3. Start from `themes/starter-theme.css`.
4. Update the brand name, colors, and logo assets.
5. Connect the CSS and JS from your base template.
6. Build pages using the shared classes and helpers.

## Included Themes

- `themes/default.css` for a neutral fallback
- `themes/starter-theme.css` for new projects
- `themes/example-client.css` as a branded example

## Validation

The starter includes generic validation building blocks for both browser and Python usage.

Generic browser profiles:

- `person-name`
- `phone`
- `username`
- `safe-text`
- `select-required`
- `password`
- `password-confirm`
- `reason`

Optional locale-specific examples:

- `arabic-full-name`
- `yemen-mobile`

## Documentation

Read these files before integrating it into a project:

- [README.md](./README.md)
- [docs/flask-integration.md](./docs/flask-integration.md)
- [docs/new-project-checklist.md](./docs/new-project-checklist.md)
- [docs/reuse-map.md](./docs/reuse-map.md)
- [docs/store-and-reuse.md](./docs/store-and-reuse.md)

## Folder Structure

```text
reusable-design-system-starter/
  components/
  docs/
  examples/
  js/
  python/
  responsive/
  templates/
  themes/
  tokens/
  README.md
```

## Philosophy

Keep the starter generic.

Move only reusable patterns into the starter, and keep client-specific logic, wording, and visuals inside the final project.
