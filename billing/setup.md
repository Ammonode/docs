# Products and plans

Everything here lives under **Admin → Products** and **Admin → Settings**.

## Categories and products

Products are grouped into categories, which become the sections of the store. A product has:

- **Name**, **URL slug**, **Description** (Markdown) and **Category**;
- **Stock** and a **Per customer limit** (leave empty for no limit);
- **Hidden**: hide it from the store while keeping a direct link working.

## Plans (pricing)

Each plan is a billing cycle the customer can choose:

| Type | |
|---|---|
| Free | No invoice is created |
| One-time | Paid once, never renews |
| Recurring | Renews every *N* days, weeks, months or years |

A plan can have a price per currency and an optional setup fee. Prices in other currencies are converted with the exchange rate when you leave them empty.

## Provisioning

Under **Provisioning** pick the server extension that runs when the product is paid. For game servers choose **Game Servers** and set:

- the **egg** and the **location** servers are created in;
- memory, swap, disk, CPU, block IO;
- how many databases, backups and extra ports the customer gets;
- whether the server starts right after installing.

The customer chooses a server name at checkout. Products without a server extension are billed only (licences, services you deliver by hand).

## Config options

Config options are choices made when ordering, such as extra memory or a game version. Types: `select`, `radio`, `checkbox`, `text`, `number`, `slider`.

Each option can be attached to several products. Set **Environment variable** to pass the chosen value to the server: for game servers it overrides a resource (`memory`, `disk`, `cpu`, `swap`, `databases`, `backups`, `allocations`) or an egg variable such as `MINECRAFT_VERSION`. Every value can have its own plans to charge extra for it.

## Upgrade paths

List the products a service may switch to. Upgrades charge the prorated difference. Downgrades apply right away. The node is checked for room before the upgrade is invoiced.

## Coupons

**Admin → Coupons**: a percentage or fixed amount, optionally limited to some products, a number of uses, an expiry date and how many payments it applies to (first payment only, N cycles or forever).

## Currencies and taxes

**Admin → Settings → Currencies and taxes**:

- add currencies with an exchange rate relative to the default one; customers pick theirs in the top bar;
- add tax rates per country (and optionally per state), then enable **Taxes** and choose whether prices include tax.

## Billing settings

| Setting | |
|---|---|
| Invoice number format | Pattern used for invoice numbers |
| Create renewal invoices | Days before the due date |
| Suspend after | Days overdue before a service is suspended |
| Terminate after | Days overdue before a service is deleted |
| Cancel unpaid orders after | Days before an unpaid new order is cancelled |
| Account credit | Let customers add funds and pay invoices with them |
| Affiliate program | Commission paid to referrers, as account credit |

Staff can also create invoices by hand from **Admin → Invoices** and record offline payments.

Next: [Stripe and PayPal](./gateways).
