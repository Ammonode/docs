# Extensions

The core of Ammonode stays small. Payment gateways, provisioners, extra pages, widgets and themes are extensions. Stripe, PayPal and Game Servers are themselves built-in extensions using the same API you can use.

## Types

| `type` | Purpose |
|---|---|
| `gateway` | Accept payments ([example](./server#payment-gateways)) |
| `server` | Provision services when they are paid, suspended or cancelled ([example](./server#provisioners)) |
| `addon` | Anything else: pages, widgets, API routes, scheduled tasks, event hooks |
| `theme` | Restyle the panel ([themes](./themes)) |

## Layout

An extension is a folder in `storage/extensions/` with an `extension.json`:

```txt
storage/extensions/hello-world/
├── extension.json
├── server.ts      # runs inside the panel (optional)
└── web.js         # runs in the browser (optional)
```

```json
{
  "id": "hello-world",
  "name": "Hello World",
  "type": "addon",
  "version": "1.0.0",
  "description": "A page, a menu item, a dashboard widget and an API route.",
  "author": "You",
  "homepage": "https://github.com/you/ammonode-hello-world",
  "ammonode": ">=0.1.0",
  "server": "server.ts",
  "web": "web.js"
}
```

| Field | |
|---|---|
| `id` | Unique, lowercase, used in URLs: `/api/extensions/<id>/…` |
| `type` | `gateway`, `server`, `addon` or `theme` |
| `version` | Your version. Also used to bust the browser cache |
| `ammonode` | Range of Ammonode versions you support |
| `server` | Server entry, a TypeScript or JavaScript module run by Bun. No build step needed |
| `web` | Browser entry, a plain ES module |
| `stylesheet` | CSS file, for themes |

## Install an extension

1. Copy the folder into `storage/extensions/` (in Docker, the `storage` volume).
2. Restart the panel.
3. Enable it under **Admin → Extensions** and fill in its settings.

To remove it, disable it and delete the folder.

## Stability

Everything exported by the SDK (`packages/sdk` in the panel repository) follows semantic versioning: the manifest, the server API, the web API, slot names and theme tokens. Do not import panel internals; they change without notice.

For TypeScript types, copy `packages/sdk/src/index.ts` into your project or reference it from a checkout of the panel. Type-only imports are removed when Bun runs your file, so they cost nothing at runtime.

Continue with the [server API](./server) and the [web API](./web).
