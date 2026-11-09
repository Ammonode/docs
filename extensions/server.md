# Server API

The `server` entry runs inside the panel process. Its default export is an object:

```ts
import type { ServerExtension } from '@ammonode/sdk'

export default {
  // Fields on the extension's settings page in the admin area.
  settings: [
    { key: 'greeting', label: 'Greeting', type: 'text', default: 'Hello!' },
    { key: 'api_key', label: 'API key', type: 'password' },
  ],

  register(api) {
    api.on('invoice.paid', async ({ invoiceId }) => {
      api.log.info('invoice paid', invoiceId)
    })

    // Handles /api/extensions/<id>/*
    api.routes(async (request, path) => {
      if (path === '/greeting') {
        const s = await api.settings()
        return Response.json({ greeting: s.greeting })
      }
      return new Response('Not found', { status: 404 })
    })

    api.schedule('0 * * * *', async () => {
      // every hour
    })
  },
} satisfies ServerExtension
```

## Settings fields

Types: `text`, `password`, `url`, `email`, `number` (`min`, `max`), `boolean` and `select` (`options`). Every field takes `key`, `label`, an optional `description` and `default`. `password` values are encrypted with `APP_KEY`, and leaving one empty in the form keeps the stored value.

## The `api` object

| Member | |
|---|---|
| `id`, `url` | Extension id, panel URL (no trailing slash) |
| `settings()` | Current settings, secrets decrypted |
| `on(event, handler)` | Listen to an event (see below). Errors are logged, never thrown into the core |
| `routes(handler)` | Handle HTTP requests under `/api/extensions/<id>/`. Uses standard `Request` and `Response` |
| `schedule(cron, task)` | Run a task on a cron expression. Runs once across all panel instances |
| `markInvoicePaid(id, tx)` | Record a payment: `{ gateway, transactionId, amount, fee? }`. Idempotent per transaction id |
| `getInvoice(id)` | `{ id, status, currency, total, userId }`, to check amounts before marking paid |
| `log.info` / `log.error` | Prefixed with the extension id |

### Events

`user.created`, `invoice.created`, `invoice.paid`, `service.created`, `service.suspended`, `service.terminated`, `server.created`, `server.installed`, `ticket.created`, `ticket.replied`.

## Payment gateways

Add a `gateway` object and set `"type": "gateway"`:

```ts
export default {
  settings: [{ key: 'secret', label: 'Secret key', type: 'password', required: true }],
  gateway: {
    label: () => 'My Gateway',
    async pay(ctx) {
      // ctx.invoice: { id, number, total: { amount, currency }, description }
      // ctx.returnUrl / ctx.cancelUrl: where to send the customer afterwards
      // ctx.extensionUrl: https://panel/api/extensions/<id>, for webhooks
      const session = await createCheckout(ctx)
      return { redirect: session.url } // or { html: '<form …>' }
    },
  },
  register(api) {
    api.routes(async (request, path) => {
      if (path !== '/webhook') return new Response('Not found', { status: 404 })
      const event = await verify(request) // always verify signatures
      const invoice = await api.getInvoice(event.invoiceId)
      if (invoice && invoice.total === event.amount && invoice.currency === event.currency) {
        await api.markInvoicePaid(invoice.id, {
          gateway: api.id,
          transactionId: event.id,
          amount: event.amount,
        })
      }
      return new Response('ok')
    })
  },
} satisfies ServerExtension
```

An optional `refund(ctx)` lets staff refund from the invoice page.

## Provisioners

Add a `provisioner` and set `"type": "server"`. It is called when a service changes state:

| Method | |
|---|---|
| `create(ctx)` | Service paid for the first time. Return data to keep (e.g. `{ serverId }`); it comes back as `ctx.service.properties` |
| `suspend(ctx)` / `unsuspend(ctx)` | Overdue / paid again |
| `terminate(ctx)` | Cancelled or overdue past the terminate delay |
| `upgrade?(ctx)` | The customer moved to another product or changed config options |
| `checkUpgrade?(ctx)` | Throw an `Error` with a message to refuse an upgrade before it is invoiced |
| `productSettings?()` | Fields on the product's **Provisioning** section |
| `checkoutFields?(product)` | Fields the customer fills in at checkout |
| `loginUrl?(ctx)` | Link shown on the service page |

`ctx` contains `service`, `user`, `product` (with its settings), `configOptions` (keyed by environment variable), `checkoutConfig` and the extension `settings`. If a method throws, the job is retried with an increasing delay and the error is written to the panel log.
