-- A display name on settings.
--
-- Superseding docs/decisions.md #22's "an email, progress rows and settings and
-- nothing else": the name is a setting, so the shape of that sentence holds, but
-- it is the first thing an account stores that the learner types about herself
-- rather than about the book. Worth being deliberate about.
--
-- A separate migration rather than an edit to 20260905154500_progress.sql. That
-- file has not been applied yet, so editing it would also work — but only if it
-- really has not, and a second file is correct either way. Never edit a
-- migration that might have run somewhere.

-- ---------------------------------------------------------------------------
-- Why it lives on `settings` and not on a `profiles` table of its own:
-- `settings` is already the one-row-per-learner table, and one nullable column
-- does not earn four more RLS policies.
--
-- The consequence to know: `settings.level` is `not null`, so a row cannot
-- exist before a level is chosen, so **a name cannot be stored before a level
-- either**. That is fine with the current flow — the level is asked once,
-- immediately after the first sign-in (#23), and the name is set later from
-- /compte. If the name ever needs to be asked first, this is the constraint
-- that will have to move, not the column.
--
-- NULL means "has not set one", and it is the only representation of that: the
-- length check forbids the empty string, so there is no second way to say it.
-- The app falls back to the part of the email before the @, so a learner who
-- never sets a name still sees something they recognise.
--
-- No uniqueness constraint, on purpose. This name is **never an identifier and
-- is shown to nobody but its owner** — there are no profiles, no authorship
-- lines, no social surface anywhere in the product (docs/scope.md non-goals).
-- Requiring it to be unique would create a namespace to squat and a moderation
-- surface to staff, in exchange for nothing.
-- ---------------------------------------------------------------------------
alter table public.settings
  add column display_name text;

alter table public.settings
  add constraint settings_display_name_shape check (
    display_name is null
    or (
      -- Stored trimmed, so ' Camille ' and 'Camille' cannot both exist and one
      -- of them cannot render as blank.
      display_name = btrim(display_name)
      -- Characters, not bytes: 40 accented characters must fit.
      and length(display_name) between 1 and 40
      -- A newline or a control character in a name breaks the layout it is
      -- rendered into, and nothing legitimate needs one.
      and display_name !~ '[[:cntrl:]]'
    )
  );

comment on column public.settings.display_name is
  'Optional. What the learner is called in the interface, shown only to them. NULL means unset - the app falls back to the local part of the email.';

-- Row-level security needs no change: policies are per table, not per column,
-- and the four on `settings` already scope every verb to `auth.uid() = user_id`.
-- Noted rather than omitted, so the next reader knows it was considered.
