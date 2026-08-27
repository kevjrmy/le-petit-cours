const viewLoaders = import.meta.glob('../views/**/*.vue', {
  query: '?raw',
  import: 'default',
})

const META_RE = /<!--\s*view-meta:\s*created=([0-9]{4}-[0-9]{2}-[0-9]{2});\s*updated=([0-9]{4}-[0-9]{2}-[0-9]{2})\s*-->/
const metaCache = new Map()

function routeToViewKey(routePath) {
  const cleanPath = routePath.replace(/^\//, "").replace(/\/$/, "")
  if (!cleanPath) return "../views/sommaire/index.vue"

  const flatView = `../views/${cleanPath}.vue`
  if (viewLoaders[flatView]) return flatView

  return `../views/${cleanPath}/index.vue`
}

async function loadMeta(path) {
  if (metaCache.has(path)) return metaCache.get(path)

  const loader = viewLoaders[path]
  if (!loader) return null

  const source = await loader()
  const match = source.match(META_RE)
  const meta = match
    ? { created: match[1], updated: match[2] }
    : null

  metaCache.set(path, meta)
  return meta
}

export async function getViewMeta(routePath) {
  return loadMeta(routeToViewKey(routePath))
}

/**
 * The most recently created views among `routePaths`, newest first.
 *
 * Sorted on `created`, not `updated`: this answers "what is new here", and a
 * typo fix on an old page should not push it to the top. ISO dates compare
 * correctly as plain strings. Ties keep the order they were passed in — that is
 * the book's own order, so a batch added on the same day reads as a chapter would.
 */
export async function recentViews(routePaths, limit = 6) {
  const entries = await Promise.all(
    routePaths.map(async (path, index) => {
      const meta = await getViewMeta(path)
      return meta ? { path, index, ...meta } : null
    })
  )

  return entries
    .filter(Boolean)
    .sort((a, b) => b.created.localeCompare(a.created) || a.index - b.index)
    .slice(0, limit)
}

/** How long a page counts as freshly added. A week covers a weekend's writing
 *  without letting a batch linger once the next one lands. */
export const FRESH_DAYS = 7

/**
 * The paths among `routePaths` created within the last `FRESH_DAYS` days, as a Set.
 *
 * Reads `created`, like "Récemment ajouté" and unlike anything that ever showed
 * a badge: this marks a page that is *new to the book*, not one edited today, so
 * a typo fix never re-tints an old lesson. The window is rolling and closes on
 * its own — nothing has to be un-marked by hand later.
 *
 * Compared on plain ISO day strings in local time, which is what `created` is:
 * a learner's "yesterday" is their own, and being an hour out either side of
 * midnight only ever costs a card its tint for that hour.
 */
export async function freshViews(routePaths, days = FRESH_DAYS) {
  const cutoff = new Date()
  cutoff.setDate(cutoff.getDate() - days)
  const cutoffIso = toIsoDay(cutoff)

  const entries = await Promise.all(
    routePaths.map(async path => {
      const meta = await getViewMeta(path)
      return meta && meta.created >= cutoffIso ? path : null
    })
  )

  return new Set(entries.filter(Boolean))
}

function toIsoDay(date) {
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${date.getFullYear()}-${month}-${day}`
}
