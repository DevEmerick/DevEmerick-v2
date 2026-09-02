# Autonoma SDK Integration

- [x] Create the `/api/autonoma` endpoint with signed SDK handling.
- [x] Add the SDK, web adapter, and required `zod` dependency.
- [x] Audit entities: none require factories; the application has no database models or creation paths.
- [x] Register the factory registry for the audited model set: empty by design.
- [x] Implement teardown: no persistent records exist to delete.
- [x] Implement the auth callback: returns empty credentials because no user/authentication model exists.
- [x] Add the Autonoma maintenance note to `AGENTS.md`.
- [x] Create and validate the full recipe envelope.
- [ ] Run entity-by-entity database up/down validation: blocked because this app has no database or persistent entities.
- [ ] Run the full recipe against a live database and prove concurrent instances: blocked because there is no database-backed factory.
- [x] Run `sdk check` on `recipe.json`.
- [x] Smoke-test signed `discover` (`200`) and invalid signatures (`401`).
- [x] Push this branch: `origin/autonoma-integration` at commit `5c9273b`.
- [ ] Open a pull request: `gh` is unavailable; create it at https://github.com/DevEmerick/DevEmerick-v2/pull/new/autonoma-integration.

The planner scenario describes static translations, experience entries, and projects. Those are source-code dictionaries, not runtime entities, so they cannot be seeded or queried through an Environment Factory without changing the application's architecture.

The SDK rejects `up` when the factory registry is empty, so the empty static recipe cannot complete an `up`/`down` or concurrency run. No `AUTONOMA_SHARED_SECRET` or `AUTONOMA_SIGNING_SECRET` is configured in this local checkout; deployment environments must provide both, with different values.

SDK endpoint path: /api/autonoma