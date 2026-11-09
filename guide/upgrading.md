# Upgrading

Read the release notes on [GitHub](https://github.com/Ammonode/panel/releases) first. Back up the database and `.env` before upgrading.

```bash
sudo -u postgres pg_dump ammonode > ammonode-$(date +%F).sql
```

## Installed with the script

Run the install script again. It pulls the latest code, rebuilds, migrates and restarts, and keeps your configuration:

```bash
curl -sSL https://raw.githubusercontent.com/Ammonode/panel/main/install.sh | sudo bash -s -- --yes \
  --domain panel.example.com --email you@example.com --password 'your-admin-password'
```

Or by hand:

```bash
cd /var/www/ammonode
sudo -u ammonode git pull
sudo -u ammonode bun install --frozen-lockfile
sudo -u ammonode bun run build
sudo -u ammonode bun apps/server/src/cli.ts migrate
sudo systemctl restart ammonode
```

## Docker

```bash
docker compose pull
docker compose up -d
```

Migrations run when the container starts.

## Daemon

```bash
curl -sSL https://raw.githubusercontent.com/Ammonode/daemon/main/install.sh | sudo bash
```

The installer replaces the binary, keeps `/etc/ammonode/config.yml` and restarts the daemon. Game servers keep running while the daemon restarts.
