# Install the daemon

Install the daemon on every machine that will run game servers.

## 1. Create the node in the panel

Under **Admin → Nodes**, create a location first (e.g. `sg-1`), then a node with:

- **FQDN**: the hostname browsers use to reach the node, e.g. `node1.example.com`;
- the memory and disk the node may hand out.

Open the node and set the **Connection** (HTTPS or HTTP), **Daemon port** (default `8080`), **SFTP port** (default `2022`) and overallocation. Under **Ports** add the IP address and the ports servers can use, e.g. `25565-25600`.

## 2. Install

On the node, as root:

```bash
curl -sSL https://raw.githubusercontent.com/Ammonode/daemon/main/install.sh | sudo bash
```

This installs Docker when it is missing, the `ammonode-daemon` binary in `/usr/local/bin` and the `ammonode-daemon` systemd service. Set `AMMONODE_DAEMON_VERSION=v0.1.0` to install a specific release.

## 3. Configure and start

On the node's page in the panel click **Show configure command**. It looks like this:

```bash
ammonode-daemon configure --panel https://panel.example.com --uuid … --token-id … --token … --port 8080 --sftp-port 2022
```

Run it on the node, then:

```bash
systemctl enable --now ammonode-daemon
```

The node turns green in the panel within a few seconds.

## HTTPS for the daemon

The browser connects to the daemon directly for the console and file uploads. When the panel runs on `https://`, the daemon must use TLS as well, or browsers block the connection.

```bash
apt install -y certbot
certbot certonly --standalone -d node1.example.com
```

Then in `/etc/ammonode/config.yml`:

```yaml
api:
  ssl:
    enabled: true
    cert: /etc/letsencrypt/live/node1.example.com/fullchain.pem
    key: /etc/letsencrypt/live/node1.example.com/privkey.pem
```

and set **Connection** to HTTPS on the node in the panel. Restart with `systemctl restart ammonode-daemon`.

## Firewall

Open the daemon port (`8080`), the SFTP port (`2022`) and the server ports you allocated.

## Troubleshooting

```bash
journalctl -u ammonode-daemon -f      # logs
ammonode-daemon version
```

See the [configuration reference](./configuration#daemon) for every option.
