import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { chapters, findChapter, findLesson } from '@/data/navigation'

const SITE_NAME = 'Le Petit Cours'

/**
 * Titles for routes that are not book chapters (annexes, sommaire).
 * Chapter and lesson titles come from `src/data/navigation.js`.
 */
const STANDALONE = {
  '/':         'Sommaire',
  '/a-propos': 'À propos',
  '/contact':  'Contact',
}

/**
 * Fallback title, set by a layout via its `title` prop. Used only when the
 * route is absent from both the manifest and STANDALONE — i.e. a page that was
 * routed but not yet registered in `navigation.js`.
 */
const override = ref('')

export function setPageTitle(value) {
  override.value = value ?? ''
}

/** Turn '/grammaire/les-adverbes' into 'Les adverbes' as a last resort. */
function humanize(path) {
  const slug = path.split('/').filter(Boolean).pop() ?? ''
  const words = slug.replace(/-/g, ' ')
  return words.charAt(0).toUpperCase() + words.slice(1)
}

export function usePageTitle() {
  const route = useRoute()

  /** Breadcrumb trail: [] on the sommaire, [chapter] or [chapter, lesson]. */
  const crumbs = computed(() => {
    if (route.path === '/') return []

    const hit = findLesson(route.path)
    if (hit) {
      return [
        { label: hit.chapter.shortTitle ?? hit.chapter.title, to: hit.chapter.path },
        { label: hit.lesson.title, to: hit.lesson.path },
      ]
    }

    const chapter = chapters.find(item => item.path === route.path)
    if (chapter) return [{ label: chapter.title, to: chapter.path }]

    const label = STANDALONE[route.path] || override.value || humanize(route.path)
    const parent = findChapter(route.path)

    return parent && parent.path !== route.path
      ? [{ label: parent.shortTitle ?? parent.title, to: parent.path }, { label, to: route.path }]
      : [{ label, to: route.path }]
  })

  const title = computed(() =>
    crumbs.value.at(-1)?.label ?? STANDALONE['/']
  )

  /* Keep the browser tab in sync. */
  watch(title, value => {
    if (typeof document === 'undefined') return
    document.title = route.path === '/' ? SITE_NAME : `${value} · ${SITE_NAME}`
  }, { immediate: true })

  return { crumbs, title }
}
