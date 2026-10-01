# Vektar runtime

The complete application uses Node 22+ and the same-origin server in `server/index.js`.
See `README.md` for development and verification. See `server/README.md` for Retell activation, security, persistent storage, and the live-smoke-test requirements.

Never place a provider account key in a client-prefixed environment variable. The committed example contains server-only placeholders, and local environment files are ignored. Calling is intentionally disabled until an operator configures and enables it.
