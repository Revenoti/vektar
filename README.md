# Vektar

An engineering-led website for agentic applications, workflow automation, and advanced software engineering. The existing conversion path remains an AI voice conversation or one-time phone callback. There is no new inquiry, email-submission, calendar, or booking funnel.

## Run locally

Requires Node 22+ and npm.

```sh
npm ci
npm run build
npm start
```

The Node server serves the generated website and `/api` on port 3001 (or `PORT`). Calling is disabled by default. Browsing and the local workflow sandbox need no credentials.

For development, run `npm run dev:server` and `npm run dev` in two terminals. Vite proxies `/api` to port 3001. The normal dev URL is port 5000. In restricted environments that cannot enumerate network interfaces, use `npx vite --host 127.0.0.1`.

## Verify

```sh
npm run lint
npm run typecheck
npm test
npm run build
npx playwright install --with-deps chromium
npm run test:e2e
```

`npm run check` runs all checks after a test browser is installed. The type check validates JavaScript module/JSX resolution across the project and checked-JavaScript inference for the pure workflow engine and service definitions. This is a JavaScript project, not a claim of full strict TypeScript coverage.

The browser suite covers desktop/mobile routing, all 18 articles, metadata, image integrity, responsive overflow, keyboard navigation, consent, unavailable calling, mocked success/failure/unknown outcomes, microphone denial, sandbox decision/recovery paths, and automated WCAG checks. All provider calls are mocked or disabled. No test dials a real number.

For serverless runtimes where a desktop Chromium cannot launch, the included npm-packaged headless test runtime is supported:

```sh
SERVERLESS_CHROMIUM=1 XDG_CACHE_HOME=/tmp/vektar-font-cache npm run test:e2e
```

Review screenshots are saved under `qa/` and Playwright artifacts under `test-results/` and `playwright-report/`. CI uploads these as a 14-day evidence artifact. These directories are not committed.

## Architecture

- React 19, React Router, Vite, Lucide and scoped CSS
- A deliberate off-white/navy/lime visual system, existing Vektar logo, responsive navigation, reduced-motion handling, and visible keyboard focus
- Three detailed services: `/services/agentic-applications`, `/services/workflow-automation`, `/services/software-engineering`
- `/work` contains a deterministic local sandbox. Synthetic invoices can be checked, corrected, approved, rejected, canceled and retried. An explicit simulated ledger and audit trail expose the outcome. No external AI or business systems are connected to it.
- All 18 original article slugs are preserved. Unsupported client/result claims were replaced with educational content and labeled illustrative examples. Search, filtering, pagination, contents navigation and related reading work locally.
- Lazy route imports; the Retell SDK loads only when a visitor explicitly starts an available browser conversation
- Native React 19 metadata and build-time server rendering of all 28 canonical routes. Build rendering does not need a browser, credentials, or network calls. Normal routes hydrate the rendered HTML; query-filtered and unknown paths safely render their appropriate client state.
- A real 404, permanent redirects for `/solutions` and `/industries` to `/services`, and `/contact` to the existing `/call` path
- Sitemap generated from the same canonical route/post data; lightweight local article art replaces broken and large article imagery

## Calling and security

Read [server/README.md](server/README.md) before enabling either calling mode. The backend has same-origin controls, strict validation, explicit consent, timeouts, request limits, durable idempotency, destination cooldowns, and a global provider-attempt cap. An accepted callback means the provider accepted the request, not that the phone rang or the call was answered. Uncertain outcomes do not silently retry.

The account key stays server-side. The browser receives only the short-lived session token intended for the voice SDK. Call details are not saved in browser localStorage. Missing configuration and provider failures produce honest unavailable/error states.

A provider key had previously been committed publicly. Removing `.env` from this branch and all browser references does **not** revoke it or erase repository history. The owner must revoke/rotate the exposed key in the provider account. This change does not rotate credentials, rewrite history, or alter live account settings.

## Deployment

The Dockerfile builds static HTML/assets and runs the dependency-free Node server as a non-root user. Railway and Nixpacks configurations use that same server. Use one process/replica with a private persistent volume for `CALL_STATE_PATH`; multi-instance operation needs a shared transactional store before it is safe. A static-only host can serve the presentation but cannot supply the calling APIs; the UI will report calling unavailable. `netlify.toml` intentionally describes only that limited static option.

Do not deploy to live traffic until the operator has completed the activation checklist: key rotation; server-only account/agent/owned-number settings; allowed origins and callback regions; persistent state; provider and edge abuse/spend controls; recording/retention/consent review; and a separately authorized real browser/callback smoke test. No live call or production deployment is implied by the mock test results.

## Content and measurement

The site makes no fabricated customer, certification, performance, pricing, SLA, or guaranteed-ROI claims. The future-facing message is supported by an engineering approach to interoperability, evaluation, governance, and operations. Project scope and acceptance criteria must be agreed rather than inferred from the examples.

Analytics are not installed by this change. If measurement is introduced later, define the useful outcome and privacy/consent requirements first. Suggested checks are CTA task completion, understandable errors, sandbox task completion, accessibility, and route performance; no conversion increase is claimed without evidence.
