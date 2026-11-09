# Web server

The panel serves both the API and the web interface on one port (`3000` by default). Put a reverse proxy in front of it for HTTPS. The install script sets up Caddy for you.

Whatever proxy you use, set this in `.env` and restart the panel:

```ini
TRUST_PROXY=true
```

With it the panel reads the visitor's IP from `X-Forwarded-For`, which rate limiting, sessions and the activity log rely on. Leave it `false` when the panel is reachable directly, otherwise clients could fake their IP.

## Caddy

```txt
panel.example.com {
	encode zstd gzip
	reverse_proxy 127.0.0.1:3000
}
```

## Nginx

```nginx
server {
    listen 443 ssl http2;
    server_name panel.example.com;

    ssl_certificate     /etc/letsencrypt/live/panel.example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/panel.example.com/privkey.pem;

    client_max_body_size 100m;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}

server {
    listen 80;
    server_name panel.example.com;
    return 301 https://$host$request_uri;
}
```

## Cloudflare

Proxying the panel through Cloudflare works. Keep `TRUST_PROXY=true`. Nodes must **not** be proxied through Cloudflare on the SFTP port; use a DNS-only record for node hostnames.
