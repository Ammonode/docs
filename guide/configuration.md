# Configuration

## Panel

The panel reads `.env` in its install directory. Restart it after editing (`systemctl restart ammonode`, or `docker compose up -d`).

| Variable | Default | |
|---|---|---|
| `APP_URL` | `http://localhost:3000` | Public URL, without a trailing slash. Used in emails, webhooks and OAuth callbacks |
| `APP_PORT` | `3000` | Port the panel listens on |
| `APP_KEY` | none | Encryption key, at least 32 characters. Generate with `key:generate` |
| `APP_ENV` | `production` | `production`, `development` or `test` |
| `APP_TIMEZONE` | `UTC` | Timezone for schedules and invoices |
| `DATABASE_URL` | none | `postgres://user:password@host:5432/database` |
| `STORAGE_PATH` | `./storage` | Uploads, extensions and local backups |
| `TRUST_PROXY` | `false` | Read client IPs from `X-Forwarded-For`. See [web server](./webserver) |
| `MAIL_HOST` | none | SMTP server. See [mail](./mail-oauth) |
| `MAIL_PORT` | `587` | |
| `MAIL_USERNAME` / `MAIL_PASSWORD` | none | |
| `MAIL_FROM_ADDRESS` | `no-reply@example.com` | |
| `MAIL_FROM_NAME` | `Ammonode` | |

Docker Compose also uses `DB_PASSWORD` (database container password) and `PANEL_PORT` (host port).

Most other settings (company name, branding, billing, taxes, OAuth, backup storage) are changed in **Admin → Settings** and stored in the database.

## Daemon

The daemon reads `/etc/ammonode/config.yml` (change it with `--config`). `ammonode-daemon configure` writes the connection values; everything else has a default.

```yaml
debug: false
uuid: …            # written by `configure`
token_id: …
token: …
remote: https://panel.example.com

api:
  host: 0.0.0.0
  port: 8080
  ssl:
    enabled: false
    cert: ""
    key: ""
  upload_limit: 100          # MiB
  trusted_origins: []        # extra origins allowed to open the websocket

system:
  root_directory: /var/lib/ammonode
  log_directory: /var/log/ammonode
  data: /var/lib/ammonode/volumes
  archive_directory: /var/lib/ammonode/archives
  backup_directory: /var/lib/ammonode/backups
  tmp_directory: /tmp/ammonode
  username: ammonode
  timezone: UTC
  disk_check_interval: 150   # seconds
  sftp:
    bind_address: 0.0.0.0
    bind_port: 2022
    read_only: false
  crash_detection:
    enabled: true
    timeout: 60              # no automatic restart if the previous crash was less than this many seconds ago

docker:
  network:
    name: ammonode_nw
    interface: 172.18.0.1
    subnet: 172.18.0.0/16
    gateway: 172.18.0.1
    driver: bridge
    mtu: 1500
  dns: [1.1.1.1, 1.0.0.1]
  tmpfs_size: 100            # MiB
  container_pid_limit: 512
  installer_limits:
    memory: 1024             # MiB
    cpu: 100                 # percent
  overhead: 0                # extra MiB added to each container's memory limit
```

Restart with `systemctl restart ammonode-daemon` after a change.
