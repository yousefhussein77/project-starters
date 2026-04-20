# Customization

## Theme Customization

Use `design_system/themes/` for brand or project identity changes.

- Start from `themes/default.css`.
- Add a project theme file or adapt an existing theme override.
- Put brand-facing values such as primary colors, accent colors, and product naming at the theme layer when possible.

If a value should change per project, it usually belongs in a theme file rather than directly inside component CSS.

## Token Customization

Use `design_system/tokens/` for system-wide design primitives.

- Update token files when the change should affect the whole UI system.
- Keep tokens focused on reusable primitives like spacing scale, radius values, shadows, and typography rules.
- Avoid mixing business meaning into token names.

Change tokens carefully, because they can cascade across many components.

## Component Customization

Use `design_system/components/` for reusable component-level styling.

- Extend components when a pattern will likely be reused.
- Prefer variant classes over one-off overrides inside random pages.
- Keep components independent from one page or data flow whenever possible.
- Avoid embedding project-only colors or workflow-specific assumptions directly in shared component files.

If a change only makes sense for one screen, move it into app-specific CSS instead of weakening the starter.

## Responsive Behavior

Use `design_system/responsive/mobile.css` for shared responsive behavior.

- Keep common layout adjustments here.
- Avoid adding page-specific breakpoints unless they are broadly reusable.
- Test responsive changes against more than one layout pattern before treating them as shared defaults.

Shared responsive rules should support the system, not one isolated screen.

## JavaScript Helpers

Use `design_system/js/` for lightweight UI behaviors.

Current helpers show the intended pattern:

- `design-system-init.js` handles application-shell readiness concerns
- `password-toggle.js` adds a reusable field interaction pattern
- `validation.js` exposes a reusable validation kit for form behavior

Keep these helpers small, framework-light, and reusable. App workflows, API calls, and business rules should stay outside this directory.

## Best Practices

- customize from the lowest sensible layer: theme before component, component before page override
- keep reusable changes generic enough to survive the next project
- avoid scattered overrides that duplicate existing tokens or components
- document meaningful customization decisions when they become part of team conventions
- treat the starter as a maintained shared asset, not as a temporary dump of copied UI files
