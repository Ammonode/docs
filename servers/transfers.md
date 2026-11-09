# Transfers

Move a server to another node from **Admin → Servers → server → Manage → Transfer to another node**:

1. Choose the **target node**.
2. Choose the **new primary port** from the free ports on that node.
3. Optionally pick **extra ports** on the new node. The card shows how many extra ports the server has now, so you can give it the same number.
4. Click **Start transfer**.

What happens:

1. The selected ports on the target are reserved, and the server is marked as transferring.
2. The server is stopped.
3. The target node prepares an empty server.
4. The source node copies every backup stored on the node, then an archive of the server files, directly to the target. Each file is checked with a SHA-256 checksum.
5. Once the target confirms, the server switches to the new node and ports. The old ports are released, and the files and backups on the old node are removed.

If anything fails along the way, the server stays on its original node and the reserved ports on the target are released. Both nodes must be able to reach each other on the daemon port.

Backups keep their names, locks and history, and can be restored or downloaded on the new node as before. Backups stored on S3 are not copied because they do not live on a node. Databases live on database hosts and are not affected.
