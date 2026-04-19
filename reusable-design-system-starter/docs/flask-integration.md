# Flask Integration

This is the recommended way to apply the design system in future Flask projects.

## Target Layout

```text
app/
  static/
    design_system/
      tokens/
      themes/
      components/
      responsive/
      js/
      images/
  templates/
    design_system/
      base_layout.html
      navbar.html
```

## Base Template Example

```html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{% block title %}Project{% endblock %}</title>

  <link rel="stylesheet" href="{{ url_for('static', filename='design_system/tokens/colors.css') }}">
  <link rel="stylesheet" href="{{ url_for('static', filename='design_system/tokens/spacing.css') }}">
  <link rel="stylesheet" href="{{ url_for('static', filename='design_system/tokens/radius.css') }}">
  <link rel="stylesheet" href="{{ url_for('static', filename='design_system/tokens/shadows.css') }}">
  <link rel="stylesheet" href="{{ url_for('static', filename='design_system/tokens/typography.css') }}">

  <link rel="stylesheet" href="{{ url_for('static', filename='design_system/themes/starter-theme.css') }}">

  <link rel="stylesheet" href="{{ url_for('static', filename='design_system/components/layout.css') }}">
  <link rel="stylesheet" href="{{ url_for('static', filename='design_system/components/cards.css') }}">
  <link rel="stylesheet" href="{{ url_for('static', filename='design_system/components/buttons.css') }}">
  <link rel="stylesheet" href="{{ url_for('static', filename='design_system/components/forms.css') }}">
  <link rel="stylesheet" href="{{ url_for('static', filename='design_system/components/password-field.css') }}">
  <link rel="stylesheet" href="{{ url_for('static', filename='design_system/components/alerts.css') }}">
  <link rel="stylesheet" href="{{ url_for('static', filename='design_system/components/navbar.css') }}">

  <link rel="stylesheet" href="{{ url_for('static', filename='design_system/responsive/mobile.css') }}">
  {% block head_extra %}{% endblock %}
</head>
<body class="ui-shell">
  {% include "design_system/navbar.html" %}
  <main class="ui-page-wrap ui-section-stack">
    {% block content %}{% endblock %}
  </main>

  <script type="module">
    import { initPasswordToggles } from "{{ url_for('static', filename='design_system/js/password-toggle.js') }}";
    import { createValidationKit, defaultProfiles } from "{{ url_for('static', filename='design_system/js/validation.js') }}";
    import { initNavbarDisclosure } from "{{ url_for('static', filename='design_system/js/navbar.js') }}";

    initPasswordToggles();
    initNavbarDisclosure();

    const validationKit = createValidationKit({ profiles: defaultProfiles });
    validationKit.init();
  </script>
  {% block scripts %}{% endblock %}
</body>
</html>
```

## Recommended Styling Strategy

- keep generic rules inside the design system
- keep app-specific layout polish inside `app/static/css/project.css`
- keep print-only document styles inside the app unless the print component is truly reusable

## Recommended Template Strategy

- use the design system for layout skeletons and shared shells
- keep business pages in the project app
- treat reports, receipts, and dashboards as app templates unless you deliberately extract a reusable pattern
