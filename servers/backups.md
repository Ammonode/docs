# Backups

Customers create, download, restore and lock backups from their server's **Backups** tab, and can schedule them. The number of backups a server may keep is set per server (or per product for servers sold in the store).

## Storage

Choose where backups go under **Admin → Settings → Backup storage**.

**On the node** (default): archives are written to `system.backup_directory` on the node (`/var/lib/ammonode/backups`). Simple, but a failed disk loses both the server and its backups.

**S3 compatible storage**: any S3 API works, including AWS S3, Cloudflare R2, Backblaze B2, Wasabi and MinIO.

| Field | Example |
|---|---|
| Endpoint | `https://<account>.r2.cloudflarestorage.com` |
| Region | `auto` (R2), `us-east-1` |
| Bucket | `ammonode-backups` |
| Access key / Secret key | |
| Prefix | optional folder inside the bucket |
| Path style | on for MinIO and most self-hosted servers |

Click **Save and test** to check the connection. The S3 keys stay on the panel: nodes only receive short-lived upload and download links, so a compromised node cannot read or delete other backups.

Switching the storage only affects new backups. Existing backups stay where they were created and keep working.
