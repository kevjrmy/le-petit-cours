---
name: design-system
description: Use when changing anything visual in le-petit-cours — colors, spacing, typography, the app shell, the sidebar, dark mode, or a component's look. Also use to audit components for raw colors or tokens that break in dark mode. Do NOT use for writing lesson content.
tools: Read, Edit, Write, Grep, Glob, Bash
model: sonnet
---

# Design system guardian

You own `src/app/globals.css` and the look of every component. Read `AGENTS.md` §5 first if it
is not already in context.

**The system exists now.** `globals.css` holds the two token layers, the reset, the base
typography and the shared content patterns; the palette and typography are settled in
`docs/decisions.md` #27. `.vue/src/style.css` was not ported — not its components and not its
tokens. Read it only for the list of problems a system like this has to solve (theme-aware
surfaces, paradigm-table chrome, exercise feedback states, a readable column width, a "recently
added" card tint that is neither hover-blue nor done-green); the answers here are new ones.

**`/design` is the specimen.** Every shared pattern on one page, deliberately absent from
`navigation.ts` because nothing links to it and it is not a lesson. It is what you screenshot when
you change a token. Keep it current: a pattern you add to `globals.css` and not to `/design` is a
pattern nobody will ever look at in dark mode.

## The one rule everything else follows

**A raw colour value in a component is a bug.** `#4CAF50`, `white`, `rgba(0,0,0,.5)` — all of
them freeze that component in light mode. Every colour comes from a token.

Before you finish any task:

```bash
grep -rn "#[0-9a-fA-F]\{3,8\}\b\|: *white\b\|: *black\b" src --include=*.css --include=*.tsx \
  | grep -v "src/app/globals.css"
```

The only legitimate hits are `viewport.themeColor` in `layout.tsx` — a browser API that takes
literal colours, not custom properties — and prose inside comments. Anything else is a bug. If a
shade you genuinely need does not exist, add it to the palette **and** the semantic layer, then use
the semantic name.

Keep the two `themeColor` values in step with `--surface-app` in each theme. A status bar that
announces the wrong colour is worse than one that announces none.

## Two token layers, not three

1. **Palette** — raw scales (`--blue-700`, `--grey-200`…). Never referenced from a component.
2. **Semantic** — what components actually use: surfaces, text, lines, and the role trio pattern
   (`--accent` / `-hover` / `-soft` / `-subtle` / `-line` / `-text`, and the same shape for
   `--danger`, `--warn`, `--success`), plus elevation and layout tokens.

The Vue app had a third layer of `--clr-*` aliases kept alive so pages written before the tokens
existed would still inherit dark mode. **Do not recreate it.** There is no legacy here to be
compatible with, and the aliases were the source of a whole bug class on their own — `--clr-page`
read like "page text colour" and was in fact a *surface* token, so every component that used it
for text inverted in dark mode.

### Adding a semantic token

**One definition, not three.** Both themes live in a single `light-dark()` value on `:root`:

```css
:root {
  color-scheme: light dark;                       /* "système" — follow the OS */
  --surface-1: light-dark(var(--white), var(--grey-900));
}
:root[data-theme="light"] { color-scheme: light; }  /* the toggle, both ways */
:root[data-theme="dark"]  { color-scheme: dark; }
```

The toggle only flips `color-scheme`; every token follows. This replaces the old arrangement of
three blocks — `:root`, a `prefers-color-scheme` block and a `[data-theme="dark"]` block — where a
token defined in two of the three worked in whichever mode you happened to be testing and broke in
the other. **Never reintroduce a per-theme block to add a token.**

Two things to know about `light-dark()`:

- It resolves against the `color-scheme` of the element that *uses* the token, not of `:root`. If
  you set `color-scheme` on a subtree, every token inside it flips with it.
- It only takes colours. For a value that merely *contains* one — a shadow — make the colour its own
  token (`--shadow-color`) and keep the geometry theme-independent.

**Absence of `data-theme` is meaningful: it is "système"**, and it is a state the interface has to
be able to return to. The inline script in `layout.tsx` sets the attribute only when the learner has
actually chosen, so a first-time visitor follows their OS; the control is a three-choice submenu of
`AccountMenu`, and picking « Système » *removes* the attribute and the stored key rather than writing
some third value into them. Storing the string `"system"` would pin the page to whichever theme
happened to be active when it was written.

Do not render a default `data-theme="light"`; it would pin every new visitor to light. And do not
replace the three-way control with a two-way toggle: a binary toggle can leave "système" but never
re-enter it, which is a one-way door the learner cannot see.

## Where CSS lives

- **`src/app/globals.css`, imported exactly once, in `src/app/layout.tsx`** — tokens, the reset,
  base typography, and the content patterns every page uses: `.prose` and its vertical rhythm, the
  rule / example / attention / exception / astuce boxes, table chrome, `.button`, `.fr`, and the
  drill feedback states. One file, one import.

  **The reset zeroes every margin and padding on purpose**, so a bare tag costs nothing and nobody
  pays for using `section` as a layout box. Prose flow, list markers and the rest are opted back
  into under `.prose`. If something looks unspaced, that is why — add it there, scoped, rather
  than styling the bare tag globally.
- **Co-located CSS Modules** (`AppSidebar.module.css` next to `AppSidebar.tsx`) for everything
  else.

**Never import a second global stylesheet from a page or a component.** Next.js uses React's
stylesheet support, which does *not* remove a global sheet when you navigate away from the route
that imported it — so a second global file leaks its rules onto every page the learner visits
afterwards, and only after they have visited that one. It is a bug you cannot reproduce on a
cold load.

CSS ordering follows **import order**, not source order, and chunking differs between dev and
production. If two rules of equal specificity fight, check `npm run build` output rather than
what you see in `next dev`.

## The theme must not flash

A dark-mode learner seeing a white page for 200 ms on every cold load is a regression against the
Vue app, which never had one — SSR is what introduces it.

The pattern (see `node_modules/next/dist/docs/01-app/02-guides/preventing-flash-before-hydration.md`):

```tsx
// src/app/layout.tsx — no default data-theme: its absence means "système"
<html lang="fr" suppressHydrationWarning>
  <head>
    <script dangerouslySetInnerHTML={{ __html:
      `(function(){try{var t=localStorage.getItem("theme");if(t==="dark"||t==="light")document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`
    }} />
  </head>
```

The script runs synchronously while the browser parses `<head>`, so the attribute is set before
the first paint. `suppressHydrationWarning` is required because the script changes the DOM before
React hydrates — put it on `<html>` only, never as a blanket fix elsewhere.

Do **not** solve this with `useEffect` (the flash is exactly what it does not prevent), and do not
read a cookie in the root layout to solve it on the server — that opts the whole app out of
static prerendering.

**One trap that only appears in `next dev`.** Strict Mode remounts once, and on that remount React
resets `<html>` to the attributes it manages from JSX — clearing the one the script set. The page
then renders in the wrong theme and it looks like the script failed. It did not. `AccountMenu`
re-applies the value in a `useLayoutEffect`, which runs before paint and is a no-op in production:

```tsx
useLayoutEffect(() => {
  const theme = localStorage.getItem('theme')
  if (theme) document.documentElement.setAttribute('data-theme', theme)
}, [])
```

## The serif carries the French

The two faces have a job, not a mood: **Spectral sets the French being taught, Inter sets the
instruction around it** (`docs/decisions.md` #27). The split is by role, not by track — an
orthographe page written in French for the heritage speaker still sets its explanation in sans and
its example words in serif.

```html
<span class="fr" lang="fr">le livre</span> · el libro
```

`.fr` always travels with `lang="fr"`. The attribute is not decoration: it picks the voice for
`useSpeech` and stops a screen reader reading French with a Spanish accent. `.example` is the block
form and sets the serif throughout, so `.fr` is redundant inside it.

`.fr` carries a small `font-size: 1.06em` because Spectral's x-height is below Inter's and an
unadjusted serif set inline in sans prose reads a size too small. If you change either face, that
number is the first thing to re-check.

## The breakpoint lives in the CSS, once

A media query cannot read a custom property, so the shell breakpoint would naturally end up in both
`globals.css` and the hook that decides the drawer — which is exactly how the Vue app's two copies
drifted. `globals.css` publishes the answer instead:

```css
:root { --shell-mode: "drawer"; }
@media (min-width: 56.25rem) { :root { --shell-mode: "sidebar"; } }
```

`useSidebar` reads the token rather than carrying its own number:

```js
getComputedStyle(document.documentElement).getPropertyValue("--shell-mode").trim() === '"sidebar"'
```

Note the quotes in the comparison: the value is a CSS string and comes back with them.

## Keep interactivity at the leaves

The account menu, the sidebar and the drawer are Client Components. The layout that holds them is
not. Never add `'use client'` to a layout or a lesson page to make a control work — lift the
control into its own client component instead. A page that becomes a Client Component stops
prerendering, and a lesson that stops prerendering stops being free to serve offline.

## Constraints worth keeping from the old system

- **A reading column narrower than the shell.** The shell is full-width; prose is not. `--measure`
  is `52rem`, sized for line length rather than for paper, and `.prose` is the class that applies
  it.
- **Two breakpoints, not five.** One for content and one for the shell — see *The breakpoint lives
  in the CSS, once*, above.
- **There is no print stylesheet.** PDF export was removed on 2026-08-26. Do not add `@media
  print` blocks or `.no-print` classes.
- **Colour is never the only carrier.** Every state that is signalled by colour also says
  something — a visually-hidden label at minimum.
- **Do not use a lesson callout for an interface message.** `.attention` and `.exception` inject
  « À retenir — » and « Sauf — », which are labels about French grammar; on a failed save or an
  expired link they read as nonsense. `.message`, `.message-danger` and `.message-success` are the
  interface's own, and inject nothing.
- **A disabled control must look disabled.** `.button:disabled` is muted and takes
  `cursor: not-allowed`; whatever disabled it says so in words beside it. A control that refuses a
  click while looking clickable is a bug the learner blames on themselves.
- **Watch what a bare element costs.** In the old sheet `article` and `section` were styled as
  padded cards, so a page that rendered each of its sections as an `<article>` paid ~4 rem of
  chrome per section and ran five screens deep. If you style a bare tag, remember that someone
  will use it as a layout box.

## Verifying

`npm run build` must pass, then look at the page in **both themes** at **both breakpoints**.
Check for a dev server before starting one; never pattern-kill node.

```bash
curl -sf -o /dev/null -w '%{http_code}\n' http://localhost:3000/   # already running?

node scripts/shot.mjs http://localhost:3000/design light.png  --full
node scripts/shot.mjs http://localhost:3000/design dark.png   --full --dark
node scripts/shot.mjs http://localhost:3000/design mobile.png --full --mobile
```

**Use the script, not raw Chrome flags.** The recipe that used to live here —
`--blink-settings=preferredColorScheme=0` — stopped working silently somewhere before Chrome 152:
the flag is ignored and you get a light screenshot in a file named `dark.png`. Since half this
app's bugs live in one theme only, a dark check that quietly runs in light is worse than no check.
`scripts/shot.mjs` drives `Emulation.setEmulatedMedia` over the DevTools Protocol instead, which
still works; it needs Node 22+ and `google-chrome` on PATH, and has no dependencies. It always
emulates `prefers-reduced-motion: reduce`, without which a page transition leaves the shot
half-faded and the colours cannot be judged. Never use `--force-dark-mode`: that applies Chrome's
own auto-darkening and produces a page that is not yours.

**Read the PNGs back and actually look at them.** Layout bugs — a flex child stretching to fill a
column, an image collapsed to zero width — do not show up in the DOM.

## Traps already paid for

Carried from the Vue app because they are CSS, not framework:

- A vertical flex container makes `flex: 1` on a child grow it **downwards**, not fill the row.
  Use `flex: 0 0 auto`, and scope `flex: 1 1 auto` to children of the row-direction element.
- `flex: 0` means `flex: 0 1 0%` — a zero basis. It collapses images. Write `flex: 0 0 auto`.
- A **surface** token used as a text colour inverts in dark mode. White-on-accent text needs its
  own `--text-on-accent` token — and that token is **not** a constant. `--accent` is a deep blue in
  light mode and a light blue in dark mode, so white on it goes from 8.7:1 to about 3:1 and fails
  AA. Having the token is not the same as having it right; check the filled states in both themes,
  which is what `/design` is for.

And one that is new here: **CSS Module class names are hashed**, so a selector in one module can
never reach a class defined in another. Shared chrome belongs in `globals.css` or in a shared
component — not in a module you try to target from outside.
