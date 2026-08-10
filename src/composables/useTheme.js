import { computed, ref, watch } from 'vue'

/**
 * Theme controller — "clair" | "sombre" | "système".
 *
 * The choice is written to `<html data-theme>` and persisted in localStorage.
 * On "système" the attribute is removed entirely so the `prefers-color-scheme`
 * media query in `style.css` takes over.
 *
 * Module-level state: every component that calls `useTheme()` shares it.
 */

const STORAGE_KEY = 'lpc:theme'
const MODES = ['light', 'dark', 'system']

const MODE_LABELS = {
  light:  'Clair',
  dark:   'Sombre',
  system: 'Système',
}

/* Matches --surface-app in each theme, for the browser/PWA chrome color. */
const THEME_COLOR = {
  light: '#F6F8FB',
  dark:  '#0B0F17',
}

const media = typeof window !== 'undefined' && window.matchMedia
  ? window.matchMedia('(prefers-color-scheme: dark)')
  : null

function readStored() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return MODES.includes(stored) ? stored : 'system'
  } catch {
    return 'system'
  }
}

const mode = ref(readStored())
const systemPrefersDark = ref(media?.matches ?? false)

media?.addEventListener('change', event => {
  systemPrefersDark.value = event.matches
})

/** The theme actually rendered right now — 'light' or 'dark'. */
const resolved = computed(() =>
  mode.value === 'system'
    ? (systemPrefersDark.value ? 'dark' : 'light')
    : mode.value
)

function apply() {
  if (typeof document === 'undefined') return

  const root = document.documentElement
  if (mode.value === 'system') {
    root.removeAttribute('data-theme')
  } else {
    root.setAttribute('data-theme', mode.value)
  }

  const meta = document.querySelector('meta[name="theme-color"]')
  if (meta) meta.setAttribute('content', THEME_COLOR[resolved.value])
}

watch([mode, resolved], apply, { immediate: true })

watch(mode, value => {
  try {
    localStorage.setItem(STORAGE_KEY, value)
  } catch {
    /* private browsing — the theme simply won't persist */
  }
})

export function useTheme() {
  function setMode(next) {
    if (MODES.includes(next)) mode.value = next
  }

  /** Cycle clair → sombre → système, for a single-button toggle. */
  function cycleMode() {
    mode.value = MODES[(MODES.indexOf(mode.value) + 1) % MODES.length]
  }

  return {
    mode,
    resolved,
    modes: MODES,
    labels: MODE_LABELS,
    label: computed(() => MODE_LABELS[mode.value]),
    isDark: computed(() => resolved.value === 'dark'),
    setMode,
    cycleMode,
  }
}
