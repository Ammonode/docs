# Install the panel

There are three ways to install the panel. The install script is the quickest.

## Install script

On a fresh Ubuntu 22.04+ or Debian 12+ server, as root:

```bash
curl -sSL https://raw.githubusercontent.com/Ammonode/panel/main/install.sh | sudo bash
```

The script asks for the domain and the first administrator, then:

- installs PostgreSQL, Bun and Caddy (automatic HTTPS);
- creates the database with a random password;
- downloads the panel to `/var/www/ammonode` and builds it;
- writes `.env`, runs the migrations and creates your admin account;
- installs the `ammonode` systemd service.

Point your domain's DNS at the server **before** running it so Caddy can get a certificate.

Options for unattended installs:

| Option | |
|---|---|
| `--domain <name>` | Domain or IP the panel is reached on |
| `--email <address>` | Administrator email |
| `--username <name>` | Administrator username (default `admin`) |
| `--password <secret>` | Administrator password |
| `--branch <name>` | Branch or tag to install (default `main`) |
| `--dir <path>` | Install directory (default `/var/www/ammonode`) |
| `--no-webserver` | Skip Caddy, serve on port 3000 only |
| `--yes` | Do not ask for confirmation |

```bash
curl -sSL https://raw.githubusercontent.com/Ammonode/panel/main/install.sh -o install.sh
sudo bash install.sh --domain panel.example.com --email you@example.com \
  --password 'a-strong-password' --yes
```

Running the script again is safe: it updates the code, keeps your `APP_KEY` and settings, and restarts the service.

## Docker Compose

Any machine with Docker works:

```bash
mkdir ammonode && cd ammonode
curl -sSLO https://raw.githubusercontent.com/Ammonode/panel/main/docker-compose.yml
curl -sSL https://raw.githubusercontent.com/Ammonode/panel/main/.env.example -o .env
```

Edit `.env`:

```ini
APP_URL=https://panel.example.com
APP_KEY=        # openssl rand -base64 32
DB_PASSWORD=    # any long random string
TRUST_PROXY=true   # when a reverse proxy sits in front
```

Start it and create the first administrator:

```bash
docker compose up -d
docker compose exec panel bun apps/server/src/cli.ts user:make --admin \
  --email you@example.com --username admin --password 'a-strong-password'
```

The panel listens on port `3000` (change the host port with `PANEL_PORT`). Migrations run automatically every time the container starts. Put a [web server](./webserver) in front of it for HTTPS.

Data lives in two volumes: `storage` (uploads, extensions, local backups) and `db`.

## Manual install

```bash
# PostgreSQL
sudo apt install -y postgresql git unzip
sudo -u postgres psql -c "CREATE USER ammonode WITH PASSWORD 'change-me';"
sudo -u postgres psql -c "CREATE DATABASE ammonode OWNER ammonode;"

# Bun
curl -fsSL https://bun.sh/install | bash

# Panel
git clone https://github.com/Ammonode/panel.git /var/www/ammonode
cd /var/www/ammonode
bun install --frozen-lockfile
bun run build
cp .env.example .env
bun apps/server/src/cli.ts key:generate   # paste the key into APP_KEY
```

Set `APP_URL` and `DATABASE_URL` in `.env`, then:

```bash
bun apps/server/src/cli.ts setup     # migrate, seed and create an admin
bun apps/server/src/index.ts         # start
```

Run it as a service with systemd:

```ini
# /etc/systemd/system/ammonode.service
[Unit]
Description=Ammonode panel
After=network.target postgresql.service

[Service]
User=ammonode
WorkingDirectory=/var/www/ammonode
ExecStart=/usr/local/bin/bun apps/server/src/index.ts
Restart=always

[Install]
WantedBy=multi-user.target
```

## Command line

```bash
bun apps/server/src/cli.ts <command>
```

| Command | |
|---|---|
| `key:generate` | Print a new `APP_KEY` |
| `migrate` | Apply database migrations |
| `seed` | Insert default roles, settings and currencies (safe to repeat) |
| `user:make [--admin] --email --username --password` | Create a user |
| `setup` | `migrate` + `seed` + create an admin interactively |

::: warning Keep APP_KEY safe
`APP_KEY` encrypts stored secrets such as gateway keys and node tokens. If you lose it those secrets must be entered again. Back it up together with the database.
:::

Next: [web server](./webserver), then [install the daemon](./install-daemon).
