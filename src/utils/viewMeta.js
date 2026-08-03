const viewLoaders = import.meta.glob('../views/**/*.vue', {
  query: '?raw',
  import: 'default',
})

const META_RE = /<!--\s*view-meta:\s*created=([0-9]{4}-[0-9]{2}-[0-9]{2});\s*updated=([0-9]{4}-[0-9]{2}-[0-9]{2})\s*-->/
const metaCache = new Map()

function todayIso() {
  const now = new Date()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${now.getFullYear()}-${month}-${day}`
}

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

export async function isNewView(routePath, date = todayIso()) {
  return (await getViewMeta(routePath))?.updated === date
}

export async function hasNewChildView(folder, date = todayIso()) {
  const prefix = `../views/${folder}/`
  const paths = Object.keys(viewLoaders).filter(path =>
    path.startsWith(prefix) && !path.endsWith('/index.vue')
  )

  for (const path of paths) {
    const meta = await loadMeta(path)
    if (meta?.updated === date) return true
  }

  return false
}
