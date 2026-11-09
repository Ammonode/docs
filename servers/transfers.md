# Transfers

Move a server to another node from **Admin → Servers → server → Transfer to another node**. Choose the target node and a free port on it, then start the transfer.

What happens:

1. The server is stopped.
2. The target node prepares an empty server.
3. The source node streams an archive of the server files directly to the target, with a checksum.
4. Once the target confirms the archive, the server switches to the new node and port, and the files on the old node are removed.

If anything fails along the way the server stays on its original node, untouched. Both nodes must be able to reach each other on the daemon port.

Only the primary port moves: extra ports on the old node are released, so add new ones on the target afterwards. Databases live on database hosts and are not affected. Backups stored on S3 keep working; backups stored on the old node stay on that node's disk and cannot be restored on the new one, so switch to S3 first if you need them.
