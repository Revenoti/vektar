# Existing call CTA: server, safety and launch checklist

The redesign preserves the existing AI voice / phone callback path. There is no inquiry endpoint, contact-form fallback, invented email notification, calendar funnel, browser API secret, or localStorage success flag.

## Run without making a call

Requires Node 22+. `npm run build`, then `npm start` serves the built website and same-origin API on port 3001 (or `PORT`). For development, run `npm run dev:server` alongside `npm run dev`; Vite proxies `/api` to the server. With the checked-in defaults both calling modes report unavailable and no provider request can be sent. `npm test` runs mocked tests only.

The server does not print credentials, request bodies, phone numbers, names, tokens, transcripts, or provider errors. Test fixtures contain fake values. No real call, microphone conversation, paid action, credential creation or credential rotation was performed during implementation.

## Exact external launch blockers

1. The old repository included a client-exposed Retell API key. The owner must revoke/rotate that compromised key in Retell and replace it privately. Removing it from the current branch does not remove it from Git history, old deployments, CDN caches, forks, or downloaded bundles. Audit provider usage and invalidate the prior deployment assets. This code does not rotate keys or rewrite repository history.
2. Provide server-only `RETELL_API_KEY` and `RETELL_AGENT_ID` for an existing, published agent. Never use a `VITE_` prefix. Configure the agent's max call duration, budget, data retention/recording settings, business knowledge, and permitted tools before enabling it.
3. For phone calls, provide `RETELL_FROM_NUMBER` in E.164 format for an existing outbound-enabled number controlled by the account. Configure `CALLBACK_ALLOWED_PREFIXES` narrowly (comma-separated prefixes such as `+1321`; `+1` allows the whole North American numbering plan). No number was purchased or verified by this work.
4. Set `ALLOWED_ORIGINS` to exact HTTPS public origins, comma-separated without trailing slashes. No wildcard/subdomain matching. Frontend and API must be exposed at the same origin. Localhost origins are for development only.
5. Mount a private persistent volume and set `CALL_STATE_PATH`, for example `/data/vektar/call-state.json`. Run exactly one Node process / replica. The default `.data/call-state.json` is for local development unless the directory itself is a persistent volume. Do not use ephemeral serverless storage or share this file between multiple processes. Horizontal scaling requires a shared transactional store and distributed limits first.
6. Put bot mitigation, request throttling, and a request-size limit at the edge. Origin checks deter browser cross-site requests but are not authentication against scripts. The public anonymous callback endpoint cannot prove ownership of the destination phone number. For broad public rollout, use operator-approved phone verification or a server-verified anti-abuse challenge. The implementation intentionally does not add a new signup funnel or claim comprehensive fraud prevention.
7. Keep provider-level spend/concurrency limits and monitoring enabled. Built-in defaults allow four call attempts per IP per 15 minutes, one callback attempt per number per rolling 24 hours, and 30 total provider call attempts per rolling 24 hours. The global cap and phone cooldown are durable. IP limits are process-local. By default they ignore forwarding headers and apply to the actual socket address. Behind ingress, configure `CALL_TRUSTED_PROXY_IPS` with only the verified exact IP addresses of your controlled proxies (comma-separated, empty by default). Do not add clients, broad subnets, wildcard values, or every private address. The ingress must reliably append the actual upstream address to `X-Forwarded-For` or replace that header with verified data. The server trusts a forwarded chain only when the socket peer is allowlisted, validates every address, and walks right-to-left through trusted proxy hops until the first untrusted client address. Spoofable entries to that client's left are ignored. Chains over 16 entries or 2,048 characters, malformed addresses, missing headers, and direct untrusted peers all fall back to the socket address. A malformed allowlist disables all forwarding trust. IPv6 spellings and IPv4-mapped IPv6 addresses are normalized to prevent quota splitting. Without correct explicit ingress trust, the four-attempt app quota remains shared by the proxy's visitors; edge throttling alone does not fix that bottleneck. Keep edge per-visitor controls in addition to these app limits.
8. Verify the published privacy disclosure and consent text match the actual agent's recording, retention, geography and calling practices. The UI clearly names AI and Retell, requests microphone consent, and asks for one callback only. It makes no future-marketing opt-in or guaranteed connection promise.
9. Only then set `ENABLE_WEB_CALLS=true` and/or `ENABLE_CALLBACKS=true`. These switches alone do not certify vendor health. Availability means configured; actual provider failure is still handled honestly.
10. A separately authorized production smoke call is still required to verify the real agent, provider account permissions/credits, owned number, audio device behavior, carrier delivery, and deployment networking. No live-call proof is claimed by the mock tests.

## API contract

All POST requests require JSON, an allowed `Origin`, and a random `Idempotency-Key` header (16–100 ASCII letters, digits, underscores or hyphens). `Sec-Fetch-Site: cross-site` is rejected. Request body is capped at 4 KiB; unknown fields, bad phone/name formats, populated honeypot and stale/missing consent are rejected.

- `GET /api/voice/config`: `{ web: boolean, callback: boolean, consentVersion: "2026-10-01" }`. No secrets, numbers or agent identifiers.
- `POST /api/voice/session`: `{ consent: true, consentVersion: "2026-10-01" }`. Calls Retell `/v3/create-web-call` with a server-selected agent. A valid response returns HTTP 201 with `accessToken`, `callId`, `transport`, `iceServers`, `expiresAt`. The short-lived call token is designed for the browser; the account API key never leaves the server. Token responses are `no-store` and are never persisted on disk.
- `POST /api/callback`: `{ firstName, lastName, phone, consent: true, consentVersion: "2026-10-01", website: "" }`. Uses Retell `/v2/create-phone-call`, the server's `from_number` and `override_agent_id`. Returns HTTP 202 / `status: "accepted"` only after a valid provider acknowledgement with a nonterminal call status. This means accepted for calling, not answered, delivered or completed.
- Unknown `/api/*` paths return JSON 404, never a successful SPA fallback.

A timeout, unreadable success body, unknown call status or provider server error returns an uncertain outcome. For callbacks the UI explicitly warns that a call may still arrive and prevents immediate resubmission. The server durably reserves the request before provider contact. Retrying the same key/body returns the same outcome (including after restart); a reused key with different details gets 409. New keys for the same phone are blocked for the cooldown period. An in-flight request interrupted by process death remains uncertain rather than being redialed. No automatic provider retry is performed.

The browser SDK is pinned to `retell-client-js-sdk` 3.0.1 to support the current gateway transport. The compatibility `RetellWebClient` accepts the server-created ephemeral token; it avoids giving an account or public API key to client code. Microphone denial creates no provider session. Cancellation, unmount, stale async results, SDK failure, user hangup, repeated clicks and connection timeout all clean up media. Reconnection is an explicit new user action. The UI exposes only working mute/end/audio controls and no fabricated audio quality or speaker-state indicators.

## Data and retention

The private state file contains a random HMAC salt, hashed request references, hashed payload fingerprints, hashed destination numbers, timestamps, mode and generic outcomes. It contains no names, raw numbers, IPs, credentials, call tokens, transcripts or recordings. The HMAC salt is a local hashing value, not a provider credential. Expired records are pruned on the next call request; the record TTL is rolling 24 hours. IP attempt counts and short-lived web token responses live only in server memory. The frontend does not save submitted PII in localStorage/sessionStorage. The provider receives callback name/number and consent metadata, and processes actual call audio when a conversation takes place.

## Checks

`node --test tests/callback*.test.js` covers provider acknowledgement, missing configuration, origin/content-type/consent/input validation, request size, fixed server-controlled routing, privacy-preserving storage, idempotency and conflict handling, simultaneous duplicates, restart durability, phone/IP/global limits, exact trusted-ingress handling, spoofed/malformed forwarded chains, independent visitor quotas, unknown outcomes, provider errors, expired transport tokens, unknown API paths, static secret protection, corrupted state, microphone denial, canceled and stale async flows, explicit reconnection, SDK timeout, mute/audio and cleanup. All provider/SDK calls are fake; no tests call Retell.

## Official reference verification (October 1, 2026)

- Current create-web-call response and gateway payload: https://docs.retellai.com/api-references/create-web-call
- Phone endpoint, E.164 numbers and `override_agent_id`: https://docs.retellai.com/api-references/create-phone-call
- SDK compatibility API: https://github.com/RetellAI/retell-client-js-sdk/blob/main/README.md
- Actual 3.x compatibility lifecycle: https://github.com/RetellAI/retell-client-js-sdk/blob/main/src/legacy/retell-web-client.ts
- Retell privacy notice: https://www.retellai.com/legal/privacy-policy
