# Mail and sign in

## Email

The panel sends invoices, password resets, email verification and ticket replies. Configure SMTP in `.env`:

```ini
MAIL_HOST=smtp.example.com
MAIL_PORT=587
MAIL_USERNAME=postmaster@example.com
MAIL_PASSWORD=secret
MAIL_FROM_ADDRESS=no-reply@example.com
MAIL_FROM_NAME="Example Hosting"
```

Restart the panel and send a test message from **Admin → Settings → Email settings**. Mail settings saved there override the values in `.env`. Without an SMTP host, emails are not sent.

## Sign in with Discord, Google or GitHub

Under **Admin → Settings → Sign in with** enable a provider and enter its client ID and secret. The callback URL to register with the provider is shown there and follows this pattern:

```
https://panel.example.com/api/auth/oauth/<provider>/callback
```

| Provider | Where to create the app |
|---|---|
| Discord | [discord.com/developers/applications](https://discord.com/developers/applications) → OAuth2 |
| Google | Google Cloud console → APIs & Services → Credentials → OAuth client ID (web application) |
| GitHub | Settings → Developer settings → OAuth Apps |

How accounts are matched:

- a provider account already connected to a user signs that user in;
- otherwise a user with the same **verified** email is connected automatically;
- otherwise a new account is created, if registration is open.

Customers can connect and disconnect providers from **Account → Security**.

## Two factor authentication

Users enable TOTP two factor authentication from **Account → Security** and receive recovery codes.
