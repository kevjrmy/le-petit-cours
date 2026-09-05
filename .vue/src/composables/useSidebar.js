import { computed, ref, watch } from 'vue'

/**
 * Sidebar state, shared across the shell.
 *
 * Two independent behaviours, chosen by viewport:
 *   desktop (> 900px) — `collapsed` shrinks the sidebar to an icon rail;
 *                       the choice is remembered in localStorage.
 *   mobile  (≤ 900px) — `drawerOpen` slides it over the content with a scrim;
 *                       always starts closed, closes on navigation.
 *
 * `MOBILE_QUERY` must stay in sync with the 900px breakpoint in `style.css`.
 */

const STORAGE_KEY = 'lpc:sidebar-collapsed'
const MOBILE_QUERY = '(max-width: 900px)'

const media = typeof window !== 'undefined' && window.matchMedia
  ? window.matchMedia(MOBILE_QUERY)
  : null

function readStored() {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'true'
  } catch {
    return false
  }
}

const collapsed = ref(readStored())
const drawerOpen = ref(false)
const isMobile = ref(media?.matches ?? false)

media?.addEventListener('change', event => {
  isMobile.value = event.matches
  if (!event.matches) drawerOpen.value = false
})

watch(collapsed, value => {
  try {
    localStorage.setItem(STORAGE_KEY, String(value))
  } catch {
    /* ignore — the rail state just won't persist */
  }
})

/* Lock body scroll behind the mobile drawer. */
watch(drawerOpen, open => {
  if (typeof document === 'undefined') return
  document.body.classList.toggle('is-locked', open)
})

/** Which chapters are expanded in the nav tree (a Set of chapter slugs). */
const expanded = ref(new Set())

export function useSidebar() {
  /** The one control the topbar/rail button drives, whatever the viewport. */
  function toggle() {
    if (isMobile.value) drawerOpen.value = !drawerOpen.value
    else collapsed.value = !collapsed.value
  }

  function closeDrawer() {
    drawerOpen.value = false
  }

  function isExpanded(slug) {
    return expanded.value.has(slug)
  }

  function toggleChapter(slug) {
    const next = new Set(expanded.value)
    if (next.has(slug)) next.delete(slug)
    else next.add(slug)
    expanded.value = next
  }

  /** Open a chapter without closing the others — used to reveal the active route. */
  function expandChapter(slug) {
    if (!slug || expanded.value.has(slug)) return
    expanded.value = new Set(expanded.value).add(slug)
  }

  return {
    collapsed,
    drawerOpen,
    isMobile,
    /* On mobile the sidebar is never a rail — it is either off-canvas or full. */
    isRail: computed(() => collapsed.value && !isMobile.value),
    expanded,
    toggle,
    closeDrawer,
    isExpanded,
    toggleChapter,
    expandChapter,
  }
}
