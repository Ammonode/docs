# Themes

A theme is an extension with `"type": "theme"` and a stylesheet. Only one theme is active at a time; enabling a theme disables the previous one.

```txt
storage/extensions/midnight/
├── extension.json
└── theme.css
```

```json
{
  "id": "midnight",
  "name": "Midnight",
  "type": "theme",
  "version": "1.0.0",
  "description": "Teal accent and rounder corners.",
  "ammonode": ">=0.1.0",
  "stylesheet": "theme.css"
}
```

## Design tokens

The panel is styled entirely through CSS variables. A theme overrides the ones it wants, for light mode on `:root` and for dark mode on `.dark`:

```css
:root {
  --am-accent-from: #34d1bf;
  --am-accent-to: #0e8f86;
  --am-ring: #0e8f86;
  --am-nav-active: #0b4f4a;
  --am-primary: #0b4f4a;
  --am-radius: 20px;
}
.dark {
  --am-nav-active: #34d1bf;
  --am-nav-active-fg: #04211f;
  --am-primary: #34d1bf;
  --am-primary-fg: #04211f;
}
```

| Token | Light default | Used for |
|---|---|---|
| `--am-canvas` | `#f3f4f6` | Page background |
| `--am-surface` | `#ffffff` | Cards, sidebar, top bar |
| `--am-surface-2` | `#f6f7f9` | Inset areas, hover |
| `--am-border` | `#e6e7eb` | Borders and dividers |
| `--am-text` | `#1b1d27` | Main text |
| `--am-muted` | `#6b6f7b` | Secondary text |
| `--am-subtle` | `#9a9eab` | Icons, placeholders |
| `--am-primary` / `--am-primary-fg` | `#1c1f2b` / `#ffffff` | Primary buttons |
| `--am-nav-active` / `--am-nav-active-fg` | `#1f2230` / `#ffffff` | Active sidebar item |
| `--am-accent-from` / `--am-accent-to` | `#8d9bff` / `#6a5ae0` | Gradients, charts, logo tile |
| `--am-ring` | `#6a5ae0` | Focus ring |
| `--am-info-bg` / `--am-info-fg` | `#e5edff` / `#3d68d8` | Info badges |
| `--am-success-bg` / `--am-success-fg` | `#dff6e8` / `#1f8f52` | Success badges |
| `--am-warn-bg` / `--am-warn-fg` | `#fff1d6` / `#b26b00` | Warnings |
| `--am-danger-bg` / `--am-danger-fg` / `--am-danger-border` | `#ffe9e2` / `#e5602f` / `#f8c7b2` | Errors, destructive actions |
| `--am-neutral-bg` / `--am-neutral-fg` | `#ececef` / `#6b6f7b` | Neutral badges |
| `--am-radius` | `14px` | Card corner radius |

Tokens are part of the stable API: they keep their names across minor versions.

## Going further

A theme can also have a `web` entry and call `registry.override('Sidebar', …)` or `registry.override('Topbar', …)` to change the layout. See the [web API](./web#override-name-component). Prefer tokens where possible: they survive panel updates without changes.

## Logo and name

The company name and logo are settings, not part of a theme: **Admin → Settings → Branding**.
