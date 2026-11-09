# Web API

The `web` entry is a plain ES module loaded in the browser after sign in. Its default export receives the web API, which is also available as `window.Ammonode`.

```js
export default function register({ React, ui, api, registry }) {
  const h = React.createElement

  function Page() {
    const [data, setData] = React.useState(null)
    React.useEffect(() => {
      api.get('/extensions/hello-world/greeting').then(setData)
    }, [])
    return h(
      ui.Card,
      null,
      h(ui.CardHeader, { title: 'Hello World', subtitle: 'This page comes from an extension.' }),
      h('div', { className: 'px-5 pb-5 text-sm' }, data ? data.greeting : 'Loading…'),
    )
  }

  registry.addRoute({ path: '/hello', area: 'client', component: Page })
  registry.addNavItem({ id: 'hello', label: 'Hello', to: '/x/hello', area: 'client', order: 50 })
  registry.addSlot('dashboard.bottom', 'hello-widget', () => h('div', null, 'Hi from an extension'))
}
```

::: tip Use the panel's React
Always use `React` from the API. Bundling your own copy of React breaks hooks. If you use JSX with a bundler, mark `react` as external and map it to `window.Ammonode.React`, or use `jsx` from the API as the JSX runtime.
:::

## What you get

| Member | |
|---|---|
| `version` | API version, currently `1` |
| `React`, `jsx` | The panel's React and `react/jsx-runtime` |
| `ui` | UI kit: `Card`, `CardHeader`, `CardFooter`, `Button`, `Input`, `Field`, `Pill`, `IconTile`, `ArcGauge`, `Toggle`, `Empty`, `Modal`, `Sparkline` |
| `api` | `get`, `post`, `put`, `patch`, `delete` on `/api/…` with the user's session |
| `registry` | Where you add pages, menu items, widgets and overrides |
| `queryClient`, `router` | The panel's TanStack Query client and router |

## Registry

### `addRoute({ path, area, component })`

Client pages are served at `/x/<path>`, admin pages at `/admin/x/<path>`.

### `addNavItem({ id, label, to, area, icon?, order?, permission?, requires? })`

Adds a sidebar item. `permission` hides it from staff without that permission (admin area). `requires` names a boolean setting that must be on, e.g. `tickets.enabled`.

### `addSlot(slot, id, component, order?)`

Places a component in a named spot:

| Slot | Where | Props |
|---|---|---|
| `dashboard.top` / `dashboard.bottom` | Customer dashboard | |
| `admin.dashboard` | Bottom of the admin overview | |
| `server.console.sidebar` | Next to the console | `server` |
| `server.tabs` | Server page tab bar | `server` |
| `topbar.actions` | Top bar, next to notifications | |

### `override(name, component)`

Replaces a core component. `Sidebar` (props `user`, `collapsed`, `onCollapse`) and `Topbar` (props `user`, `onMenu`) can be overridden. Mostly for themes that change the layout.

## Styling

The panel uses Tailwind. Utility classes already used by the panel work in your components. Classes the panel does not use are not in its stylesheet, so ship your own CSS for anything else, or use inline styles. Colors should come from the [theme tokens](./themes) (`var(--am-surface)`, `var(--am-text)` …) so your extension follows the active theme and dark mode.

## Files

Files in the extension folder are served at `/extension-assets/<id>/<file>`. `web.js` may import other files from its folder with relative imports.
