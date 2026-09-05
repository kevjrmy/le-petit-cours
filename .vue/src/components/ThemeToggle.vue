<template>
  <button
    class="theme-toggle"
    :class="{ compact }"
    type="button"
    @click="cycleMode"
    :title="`Thème : ${label}`"
    :aria-label="`Thème : ${label}. Changer de thème.`"
  >
    <IconLight v-if="mode === 'light'" class="glyph" />
    <IconDark v-else-if="mode === 'dark'" class="glyph" />
    <IconSystem v-else class="glyph" />
    <span v-if="!compact" class="label">{{ label }}</span>
  </button>
</template>

<script setup>
import { useTheme } from '@/composables/useTheme'
import IconLight from '~icons/mdi/white-balance-sunny'
import IconDark from '~icons/mdi/moon-waning-crescent'
import IconSystem from '~icons/mdi/laptop'

defineProps({
  /** Icon-only, for the collapsed rail and the topbar. */
  compact: { type: Boolean, default: false },
})

const { mode, label, cycleMode } = useTheme()
</script>

<style scoped>
.theme-toggle {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  width: 100%;
  padding: 0.5rem 0.65rem;
  border-radius: var(--radius-sm);
  color: var(--text-2);
  font-size: 0.85rem;
  font-weight: 500;
}

.theme-toggle:hover {
  background: var(--surface-3);
  color: var(--text-1);
}

.theme-toggle.compact {
  width: 2.25rem;
  height: 2.25rem;
  padding: 0;
  justify-content: center;
  flex-shrink: 0;
}

.glyph {
  width: 1.05rem;
  height: 1.05rem;
  flex-shrink: 0;
}

.label {
  white-space: nowrap;
}
</style>
