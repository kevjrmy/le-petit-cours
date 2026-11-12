# Operations

What the repo cannot enforce: the deployment, the Supabase project's settings, and how to check
them from outside. Read before touching auth, the schema, an env var or the atelier's lock.
`AGENTS.md` §0 carries the one-line status; the why is `docs/decisions.md`.

## Deployment

- **Vercel**, <https://lepetitcours.vercel.app>, from `main` (#7). Not a static export.
- **Env, exactly two public vars**: `NEXT_PUBLIC_SUPABASE_URL`,
  `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`. No Supabase integration, no Supabase secret at rest (#21).
  **A `SUPABASE_*` or `POSTGRES_*` var means an integration reconnected: delete it.**
- **`FRONTEND_PASSWORD`** (#81) is the one secret: in the gitignored `.env` and set on Vercel by
  hand (`vercel env add`). **Never `NEXT_PUBLIC_`, never written anywhere else**, commit messages
  included. Read only by `src/lib/atelier.ts`.

## The atelier's lock (#81)

**Lifted since 2026-10-06**: `ATELIER_VERROUILLE = false` in `src/lib/atelier.ts`, so everyone
enters; the rest stays in place, so one line puts it back. **Locked and without the variable,
nobody enters `/atelier`, you included** — on purpose. `src/proxy.ts` matches `/atelier` alone and
reads one cookie; never widen it.

## Supabase

Project `ephdtigxjccfauzgexpd`. RLS on, legacy JWT keys off.

### The Email provider: three settings

Readable at the public `/auth/v1/settings`:

| Setting                                   | Must be | If wrong                                         |
| ----------------------------------------- | ------- | ------------------------------------------------ |
| provider enabled (`external.email`)       | on      | the master toggle: off takes the whole site down (it has happened once) |
| sign-up (`disable_signup`)                | off     | anyone can create an account                     |
| confirmation (`mailer_autoconfirm` false) | on      | tick « Auto Confirm User » on every hand-made account |

**Probe, don't just read**:

- `POST /auth/v1/signup` must answer `signup_disabled`;
- `POST /auth/v1/token?grant_type=password` with a fake account must answer `invalid_credentials`.

### The schema

**Written as migration files in `supabase/migrations/`, applied by hand in the dashboard's SQL
editor.** Nothing applies them automatically.

- **A column is checkable from outside**: `select=<column>` on `progress` answers `42501` (exists)
  or `42703` (missing), never rows.
- **Keys, constraints and backfills are not**: check the dashboard, or a tick on a second device.
- **If a probe returns rows**, someone ran `GRANT SELECT … TO anon`: undo it.
