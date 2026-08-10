<template>
  <div class="shell" :class="{ 'is-collapsed': isRail }">
    <AppSidebar />

    <div class="shell-main">
      <AppTopbar />

      <div class="shell-scroll">
        <RouterView v-slot="{ Component, route }">
          <Transition name="route" mode="out-in">
            <component :is="Component" :key="route.path" />
          </Transition>
        </RouterView>
      </div>
    </div>
  </div>
</template>

<script setup>
/**
 * The shell lives here, not in a layout, so the sidebar keeps its scroll
 * position and expanded state across navigation — only the page swaps.
 */
import { onMounted, onUnmounted } from 'vue'
import AppSidebar from '@/components/AppSidebar.vue'
import AppTopbar from '@/components/AppTopbar.vue'
import { useSidebar } from '@/composables/useSidebar'

const { isRail, drawerOpen, closeDrawer } = useSidebar()

/* `<title>` is kept in sync by usePageTitle() inside AppTopbar. */

function onKeydown(event) {
  if (event.key === 'Escape' && drawerOpen.value) closeDrawer()
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => window.removeEventListener('keydown', onKeydown))
</script>
