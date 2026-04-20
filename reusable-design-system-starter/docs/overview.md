# Overview

## Architecture

This starter is organized around a simple idea: keep reusable interface foundations in one place, and keep app-specific implementation outside of that layer.

The architecture is split into four reusable concerns:

- `design_system/tokens/`: low-level primitives such as colors, spacing, shadows, radius, and typography
- `design_system/themes/`: theme overrides that define a product or brand identity on top of the tokens
- `design_system/components/`: reusable UI building blocks such as buttons, forms, cards, alerts, layout, and navigation
- `design_system/js/`: lightweight behavior helpers that support the reusable UI layer without becoming app logic

Responsive behavior is kept in `design_system/responsive/`, and starter template assembly lives in `templates/`.

## Role of `design_system`

`design_system/` is the reusable core of this starter. It should contain only assets that make sense across multiple projects or across multiple pages inside the same project.

If a file exists here, it should answer at least one of these questions:

- Does this define a reusable visual token?
- Does this style a reusable component pattern?
- Does this support reusable layout behavior?
- Does this provide lightweight UI behavior that is not tied to one business workflow?

## Role of `templates`

`templates/` is not the product. It is reference material that shows how to wire the starter into a real application.

In this starter, `templates/base_layout.html` demonstrates:

- the recommended CSS loading order
- where starter scripts should be loaded
- how the design system can be mounted inside a template-driven app

## Reusable Assets vs App-Specific Code

Keep reusable assets inside the starter when they are:

- generic across products
- stable across pages
- useful as a shared visual or interaction baseline

Keep code outside the starter when it is:

- tied to one business domain
- specific to one page or workflow
- coupled to app routes, data, or backend rules
- unlikely to be reused in the next project

This boundary is what keeps the starter valuable over time.

## How To Think About Adoption

When adopting this starter in a real project, think of it as a base layer, not a finished product.

- Start by understanding the tokens and theme files.
- Use the provided component classes before creating custom alternatives.
- Add project-specific branding through a theme or separate app stylesheet.
- Treat template files as integration references, not as rigid final structure.

The strongest adoption pattern is: reuse the shared layer, isolate the project layer, and only push changes back into the starter when they remain broadly useful.
