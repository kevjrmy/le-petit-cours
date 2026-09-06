-- The initial schema. Two tables, and they are the only ones this project owns.
--
-- Scope, from docs/decisions.md #8: this database holds accounts and progress and
-- nothing else. It has no knowledge of the book — no lessons table, no foreign key
-- to one, no titles. `path` is an opaque string owned by src/data/navigation.ts,
-- which is the single source of truth for what a lesson is (AGENTS.md §6).
--
-- The learner's settings — their chosen level and their display name — are NOT
-- here. They live in the account's own user metadata on `auth.users`, which
-- Supabase already stores and ships with the session (#36). That is why there is
-- no `settings` table: it existed, it was never applied, and it was removed
-- before it ever ran.
--
-- The username IS here, and #36 is why: that decision drew the line itself —
-- "a setting that ever grants something, or that anyone else can see, belongs in
-- a table with a constraint instead". A username you sign in with grants
-- something, and it has to be unique; metadata can hold neither property (#38).
--
-- Authorization is row-level security, not application code (docs/decisions.md #19).

-- ---------------------------------------------------------------------------
-- progress: one row per lesson a learner has marked done.
--
-- The row IS the tick. There is no `done` column: marking writes a row,
-- unmarking deletes it. Nothing else is stored — no scores, no attempt history,
-- no last-visited. An account holds a username, an email, progress and settings,
-- and nothing else (docs/scope.md), and this is the progress half.
--
-- Note what is NOT here: the level. Progress is keyed by path alone, so a
-- learner who moves from A2 down to A1 and back finds every tick where they
-- left it. Putting the level in the key — or on the row — would fragment
-- progress per level, which is the exact failure this design exists to avoid.
--
-- This is also why progress could never be folded into the settings it now
-- sits beside: it is many rows per learner, written one at a time from more
-- than one device. Held as a list on a single row, two devices syncing after
-- being offline would overwrite each other's ticks.
-- ---------------------------------------------------------------------------
create table public.progress (
  user_id   uuid        not null references auth.users (id) on delete cascade,
  path      text        not null,

  -- When the learner ticked it. Client-supplied, deliberately: this is an
  -- offline PWA, so the moment that matters is when they ticked it, not when
  -- the row reached the server. A client can only ever lie about its own rows.
  marked_at timestamptz not null default now(),

  primary key (user_id, path),

  -- Loose on the slug — a strict pattern would reject a future path and fail
  -- inside a background sync where nobody sees it — but strict on the trailing
  -- slash, because '/x' and '/x/' would otherwise be two ticks for one lesson.
  constraint progress_path_shape check (path ~ '^/[^[:space:]]{1,199}$' and path !~ '/$')
);

comment on table public.progress is
  'One row per lesson a learner has marked done. The row is the tick; unmarking deletes it.';
comment on column public.progress.path is
  'Route path from src/data/navigation.ts. Renaming one orphans its rows - see AGENTS.md §6 pathAliases.';

-- ---------------------------------------------------------------------------
-- Row-level security. Redundant while the automatic-RLS event trigger is on,
-- and kept anyway: this file should be correct replayed into a project without
-- it. Four policies rather than one FOR ALL, so that a later change to one verb
-- cannot silently widen the others. `(select auth.uid())` rather than a bare
-- call: the planner hoists it to an initPlan and evaluates it once per
-- statement instead of once per row.
-- ---------------------------------------------------------------------------
alter table public.progress enable row level security;

revoke all on public.progress from anon;
grant select, insert, update, delete on public.progress to authenticated;

create policy "progress_select_own" on public.progress
  for select to authenticated using ((select auth.uid()) = user_id);
create policy "progress_insert_own" on public.progress
  for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "progress_update_own" on public.progress
  for update to authenticated using ((select auth.uid()) = user_id)
                              with check ((select auth.uid()) = user_id);
create policy "progress_delete_own" on public.progress
  for delete to authenticated using ((select auth.uid()) = user_id);

-- ---------------------------------------------------------------------------
-- usernames: one row per account, holding the name it signs in with.
--
-- Lower-case only, and stored already folded rather than compared with citext:
-- the client folds on the way in (src/lib/account.ts), so a second
-- case-insensitive mechanism would be a second place for the rule to live.
-- Display capitalisation is the display name's job, not this column's.
-- ---------------------------------------------------------------------------
create table public.usernames (
  user_id    uuid        primary key references auth.users (id) on delete cascade,
  username   text        not null unique,
  updated_at timestamptz not null default now(),

  -- Must agree with checkUsername() in src/lib/account.ts. Alphanumeric at both
  -- ends, punctuation only inside: a name is also a URL-safe handle, and a
  -- trailing dot is the kind of thing that breaks something downstream years
  -- later. Length is checked separately so the pattern stays readable.
  constraint usernames_shape  check (username ~ '^[a-z0-9][a-z0-9._-]*[a-z0-9]$'),
  constraint usernames_length check (char_length(username) between 2 and 30)
);

comment on table public.usernames is
  'One row per account: the name it signs in with. Unique, mutable, independent of the email.';

-- ---------------------------------------------------------------------------
-- Row-level security.
--
-- An owner may read their own row and nothing else. There is deliberately no
-- update policy: changing a username goes through set_username() below, which
-- is the only thing that may write here. A direct update would let an account
-- take a name without the checks that function applies.
-- ---------------------------------------------------------------------------
alter table public.usernames enable row level security;

revoke all on public.usernames from anon;
grant select on public.usernames to authenticated;

create policy "usernames_select_own" on public.usernames
  for select to authenticated using ((select auth.uid()) = user_id);

-- ---------------------------------------------------------------------------
-- A username derived from an email, for accounts created in the dashboard.
--
-- Accounts are made by hand and handed over (#37), so nobody types a username
-- at creation time. The local part is the obvious default and is exactly what
-- the previous design computed in the client. Sanitised into the shape the
-- constraints above demand, because a real address may hold '+' or start with a
-- dot, and padded because 'a@…' would otherwise be one character short.
-- ---------------------------------------------------------------------------
create function public.username_from_email(addr text)
returns text language plpgsql immutable set search_path = '' as $$
declare
  base text;
begin
  base := lower(split_part(addr, '@', 1));
  base := regexp_replace(base, '[^a-z0-9._-]', '-', 'g');  -- only the legal set
  base := regexp_replace(base, '^[^a-z0-9]+', '');         -- alphanumeric ends
  base := regexp_replace(base, '[^a-z0-9]+$', '');
  base := left(base, 30);
  base := regexp_replace(base, '[^a-z0-9]+$', '');         -- left() may re-expose
  if char_length(base) < 2 then
    base := rpad(nullif(base, ''), 2, '0');
    base := coalesce(base, 'user');
  end if;
  return base;
end;
$$;

-- ---------------------------------------------------------------------------
-- Give every new account a username, and mirror it into the account's metadata.
--
-- The mirror is what makes the name readable **offline**: metadata rides in the
-- JWT, which the browser has cached, while this table needs a network round
-- trip. This is an offline PWA (AGENTS.md §8), so a signed-in learner in the
-- métro must still know what they are called. The table stays the authority —
-- uniqueness lives here — and the metadata copy is a cache written only by the
-- two functions in this file, never by the client.
-- ---------------------------------------------------------------------------
create function public.claim_username_for_new_user()
returns trigger language plpgsql security definer set search_path = '' as $$
declare
  base      text;
  candidate text;
  n         int := 1;
begin
  -- Phone sign-up is off, so an account without an address should not exist —
  -- but a trigger that raises here would block account creation entirely, which
  -- is a bad way to find out. Leave the row unclaimed instead; readUsername()
  -- in the client falls back rather than rendering an empty name.
  if new.email is null or new.email = '' then
    return new;
  end if;

  base      := public.username_from_email(new.email);
  candidate := base;

  -- A collision must not block account creation, so suffix rather than fail.
  while exists (select 1 from public.usernames u where u.username = candidate) loop
    n := n + 1;
    candidate := left(base, 28) || '-' || n::text;
  end loop;

  insert into public.usernames (user_id, username) values (new.id, candidate);

  update auth.users
     set raw_user_meta_data = coalesce(raw_user_meta_data, '{}'::jsonb)
                              || jsonb_build_object('username', candidate)
   where id = new.id;

  return new;
end;
$$;

create trigger on_auth_user_created_claim_username
  after insert on auth.users
  for each row execute function public.claim_username_for_new_user();

-- ---------------------------------------------------------------------------
-- Resolve a username to its email, for sign-in.
--
-- **Callable by anon, and it has to be**: the browser turns what was typed into
-- an email BEFORE it has a session, so it cannot read a table. security definer
-- is what lets it answer without granting anyone select on auth.users.
--
-- This is an enumeration oracle by construction — anyone may ask whether a
-- username exists, and learn the address behind it. Accepted deliberately while
-- every address is a fake `@lepetitcours.test` one and the site is unlisted
-- (#38). **The day a real address goes on an account, this leaks it**, and the
-- resolution has to move server-side behind a rate limit. That is the trigger
-- to watch for, and it is written down rather than remembered.
-- ---------------------------------------------------------------------------
create function public.email_for_username(name text)
returns text language sql stable security definer set search_path = '' as $$
  select u.email
    from public.usernames n
    join auth.users u on u.id = n.user_id
   where n.username = lower(trim(name))
   limit 1;
$$;

revoke all on function public.email_for_username(text) from public;
grant execute on function public.email_for_username(text) to anon, authenticated;

-- ---------------------------------------------------------------------------
-- Change your own username.
--
-- The only writer of public.usernames. Runs as definer so it can also refresh
-- the metadata mirror, and takes auth.uid() rather than a user id argument so
-- one account can never rename another. A name already taken raises 23505,
-- which the client turns into "ce nom est déjà pris".
-- ---------------------------------------------------------------------------
create function public.set_username(name text)
returns text language plpgsql security definer set search_path = '' as $$
declare
  uid   uuid := (select auth.uid());
  clean text := lower(trim(name));
begin
  if uid is null then
    raise exception 'not authenticated' using errcode = '28000';
  end if;

  -- Re-checked here rather than trusted from the client: this function is
  -- callable directly, so the constraints and this check are the real rules.
  if clean !~ '^[a-z0-9][a-z0-9._-]*[a-z0-9]$'
     or char_length(clean) not between 2 and 30 then
    raise exception 'malformed username' using errcode = '22000';
  end if;

  insert into public.usernames (user_id, username)
       values (uid, clean)
  on conflict (user_id)
    do update set username = excluded.username, updated_at = now();

  update auth.users
     set raw_user_meta_data = coalesce(raw_user_meta_data, '{}'::jsonb)
                              || jsonb_build_object('username', clean)
   where id = uid;

  return clean;
end;
$$;

revoke all on function public.set_username(text) from public;
grant execute on function public.set_username(text) to authenticated;

-- ---------------------------------------------------------------------------
-- Backfill the accounts that already exist.
--
-- Both were created before this table did, so they have no row and no mirrored
-- metadata. Their names come out as the local part of their address, which is
-- exactly what the old derived design already showed them — so nobody's name
-- changes on the day this is applied.
-- ---------------------------------------------------------------------------
insert into public.usernames (user_id, username)
select u.id, public.username_from_email(u.email)
  from auth.users u
 where not exists (select 1 from public.usernames n where n.user_id = u.id)
on conflict do nothing;

update auth.users u
   set raw_user_meta_data = coalesce(u.raw_user_meta_data, '{}'::jsonb)
                            || jsonb_build_object('username', n.username)
  from public.usernames n
 where n.user_id = u.id
   and coalesce(u.raw_user_meta_data ->> 'username', '') is distinct from n.username;
