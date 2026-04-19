# Reuse Map

This file answers the practical question:

- what stays generic
- what moves into the theme layer
- what should not be copied as-is from a specific client project

## Keep Generic

These should stay reusable across future projects with little or no change:

- `tokens/colors.css`
- `tokens/spacing.css`
- `tokens/radius.css`
- `tokens/shadows.css`
- `tokens/typography.css`
- `components/alerts.css`
- `components/buttons.css`
- `components/cards.css`
- `components/forms.css`
- `components/layout.css`
- `components/navbar.css`
- `components/password-field.css`
- `responsive/mobile.css`
- `js/password-toggle.js`
- `js/navbar.js`
- `js/validation.js`
- `python/validation/core.py`
- `python/validation/presets.py`
- `templates/base_layout.html`
- `templates/navbar.html`

Why:

- they define reusable interface rules
- they do not depend on one business domain
- they solve repeated UI problems you will have in other projects

## Move To Theme

These values should be customized per project, not hardcoded into generic components:

- brand name
- primary brand color
- accent color
- logo sizing variables
- project-specific font choices
- optional theme tone such as "formal", "banking", "charity", or "retail"

Current files:

- `themes/default.css`
- `themes/starter-theme.css`
- `themes/example-client.css`

Recommended next usage:

- keep `default.css` as the neutral fallback
- start future projects from `starter-theme.css`
- treat `example-client.css` as a sample branded theme only

## Do Not Copy As-Is From Any App

These items belong to the app itself and should not be moved into the generic design system unchanged:

- business text
- receipt-specific print logic
- report-specific layouts
- page-specific dashboard content
- route names
- database-driven labels
- client-owned images and logos

Examples of app-owned items:

- `app/templates/transactions/receipt.html`
- `app/templates/reports/*.html`
- app-owned images
- large page-specific blocks inside project CSS files

Those are good references, but they are not starter assets.

## What To Extract From App Pages

If a page in a project has good reusable ideas, extract only the pattern:

- card shell
- field grouping
- summary stat card pattern
- message banner pattern
- page header rhythm

Do not extract:

- project wording
- project numbers
- project domain terms

## Healthy Boundary

Use this rule:

- if it explains how a UI piece looks or behaves in general, it belongs in `design_system/`
- if it explains what one specific app does, it belongs in that app
