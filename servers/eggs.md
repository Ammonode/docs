# Eggs

An egg describes how to install and run one kind of server: the Docker image, the startup command, the install script, the variables customers can change and how the daemon detects that the server has started. Ammonode uses the same egg format as Pterodactyl (`PTDL_v1` and `PTDL_v2`), so existing eggs work unchanged.

Eggs are grouped into **nests** under **Admin → Nests & Eggs**.

## Import from the official catalog

The right side of the page lists every egg on [eggs.pterodactyl.io](https://eggs.pterodactyl.io/). Pick the nest to import into, search, and click **Import**. When the upstream egg changes, the button turns into **Update**, which keeps your servers and their variable values.

## Import a file

Click **Import file** next to a nest and choose an egg `.json` file, for example one exported from a Pterodactyl panel. **Export** on an egg's page downloads it in the same format.

## Write your own

**New egg** opens the egg editor:

| Field | |
|---|---|
| Docker images | One per line as `Label|image`, e.g. `Java 21|ghcr.io/pterodactyl/yolks:java_21` |
| Startup command | Variables are written as <code v-pre>{{SERVER_MEMORY}}</code> or <code v-pre>{{MY_VARIABLE}}</code> |
| Startup done text | Console output that means the server has started, e.g. `)! For help, type ` |
| Stop command | Sent to the console to stop the server, e.g. `stop`. `^C` sends SIGINT |
| Configuration files | Files the daemon rewrites before every start (`properties`, `yaml`, `json`, `ini`, `xml`, `file`) |
| Install script | Shell script run in its own container with the server files at `/mnt/server` |
| Variables | Values customers can view or edit, with Laravel-style rules such as `required|string|max:20` |

Built-in variables available in the startup command and configuration files: `SERVER_MEMORY`, `SERVER_IP`, `SERVER_PORT`, `P_SERVER_UUID`, `TZ` and `STARTUP`.
