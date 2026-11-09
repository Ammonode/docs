# Stripe and PayPal

Both gateways ship with the panel. Enable them under **Admin → Extensions**. Secrets are stored encrypted with `APP_KEY`.

## Stripe

1. In the Stripe dashboard open **Developers → API keys** and copy the **secret key** (`sk_live_…`, or `sk_test_…` for testing).
2. Open **Developers → Webhooks → Add endpoint**:
   - URL: `https://panel.example.com/api/extensions/stripe/webhook`
   - Event: `checkout.session.completed`
3. Copy the endpoint's **signing secret** (`whsec_…`).
4. In **Admin → Extensions → Stripe** paste both keys, set the checkout label and enable it.

Customers pay on Stripe Checkout. The invoice is marked paid when the webhook arrives, so the webhook is required.

Test locally with the Stripe CLI:

```bash
stripe listen --forward-to localhost:3000/api/extensions/stripe/webhook
```

## PayPal

1. At [developer.paypal.com](https://developer.paypal.com) create an app under **Apps & Credentials** and copy the **client ID** and **secret**. Use the Sandbox tab for testing.
2. In **Admin → Extensions → PayPal** enter them, tick **Sandbox** when using sandbox credentials, and enable it.
3. Recommended: add a webhook in the app pointing to `https://panel.example.com/api/extensions/paypal/webhook` with the event `PAYMENT.CAPTURE.COMPLETED`, and paste its **webhook ID** into the settings.

The payment is captured when the customer returns to the panel. The webhook covers customers who close the tab before that.

## Other gateways

Any provider can be added as an extension. See [writing a gateway](/extensions/server#payment-gateways).
