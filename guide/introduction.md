# Introduction

Ammonode is two programs:

- **Panel** ([Ammonode/panel](https://github.com/Ammonode/panel)): the website your customers and staff use. It handles accounts, the store, invoices, payments, tickets and the server control panel. It is written in TypeScript, runs on [Bun](https://bun.sh) and stores its data in PostgreSQL.
- **Daemon** ([Ammonode/daemon](https://github.com/Ammonode/daemon)): a small Go binary installed on every machine that hosts game servers (a *node*). It runs each server in a Docker container and provides the console, file manager, SFTP and backups.

One panel can manage many nodes. The panel and a daemon may share a machine on small setups.

## How it fits together

1. A customer orders a product in the store and pays the invoice.
2. The **Game Servers** provisioner creates the server on a node with enough free resources.
3. The daemon pulls the egg's Docker image, runs the install script and starts the server.
4. The customer manages the server from the panel: console, files, databases, schedules, backups, sub-users.
5. When a renewal invoice is not paid the service is suspended, and later terminated.

## Requirements

| | Panel | Daemon |
|---|---|---|
| OS | Ubuntu 22.04+, Debian 12+ (or any OS with Docker) | Linux amd64 / arm64 |
| Memory | 1 GB | Depends on your servers |
| Software | PostgreSQL 15+, Bun 1.4+ | Docker 24+ |

Continue with [installing the panel](./install-panel).
