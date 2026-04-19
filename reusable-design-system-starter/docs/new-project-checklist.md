# New Project Checklist

Use this checklist every time you start a new project from this design system.

## 1. Copy The Starter

- Copy `design_system/` into the new project.
- Serve it from the framework's static and template directories.
- Ignore any temporary cache files such as `__pycache__/`.

## 2. Create A Theme

- Duplicate `themes/starter-theme.css`.
- Rename it to the new project theme.
- Set the project brand name variable.
- Set primary and accent colors.
- Add or reference the new logo.

## 3. Wire The Base Template

- Load tokens first.
- Load the selected theme second.
- Load components third.
- Load responsive styles last.
- Load shared JS once in the base template.

## 4. Build Only With Shared Classes

- Use `.ui-card` for surface blocks.
- Use `.ui-field` and `.ui-label` for form fields.
- Use `.ui-input`, `.ui-select`, and `.ui-textarea` for inputs.
- Use `.ui-btn` for buttons.
- Use `.ui-navbar` for the main navigation shell.

## 5. Isolate Project-Specific Styling

- Put project-only tweaks in one override file.
- Keep the override file small.
- Never edit generic component files to solve one page's special case unless the change is truly reusable.

## 6. Review Validation

- Reuse validation primitives from `python/validation/`.
- Reuse browser validation from `js/validation.js`.
- Add business-specific validation in the project app, not in the starter.

## 7. Finish With A Boundary Check

Ask:

- can this component be copied to another project with the same meaning
- does this file mention app-specific terms
- is this color or wording part of the theme, or part of the component

If the answer is app-specific, move it out of the starter.
