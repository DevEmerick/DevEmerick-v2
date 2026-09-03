# Autonoma SDK Integration

- [x] Add the `/api/autonoma` endpoint and signed SDK handler.
- [x] Audit entities: none require factories; the app has no database models or creation paths.
- [x] Register the factory registry: empty by design.
- [x] Implement teardown: no persistent records exist to delete.
- [x] Implement the auth callback: empty because the app has no authentication or user model.
- [x] Add the Autonoma maintenance note to `AGENTS.md`.
- [x] Create the full recipe envelope.
- [ ] Run entity-by-entity database up/down validation: blocked because no database or persistent entities exist.
- [ ] Run the full recipe and concurrent-instances proof: blocked because the SDK rejects an empty factory registry.
- [x] Run `sdk check` on `recipe.json`.
- [x] Smoke-test signed `discover` (`200`) and invalid signatures (`401`).
- [x] Push this branch: `origin/autonoma-integration` at commit `087ac79`.
- [ ] Open a pull request: `gh` is unavailable; create it at https://github.com/DevEmerick/DevEmerick-v2/pull/new/autonoma-integration.

The planner scenario describes static translations, experience entries, and projects. They are source-code constants, not runtime entities, so they cannot be seeded or queried by an Environment Factory without changing the application's architecture.

The SDK rejects `up` when the factory registry is empty, so the empty static recipe cannot complete an `up`/`down` or concurrency run. No `AUTONOMA_SHARED_SECRET` or `AUTONOMA_SIGNING_SECRET` is configured in this local checkout; deployment environments must provide both with different values.

SDK endpoint path: /api/autonoma