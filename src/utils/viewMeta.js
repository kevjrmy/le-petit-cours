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
