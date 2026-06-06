<template>
  <HeaderBar />
  <slot />
  <Footer />
</template>

<script setup>
import HeaderBar from '@/components/HeaderBar.vue'
import Footer from '@/components/Footer.vue'

defineProps({
  title: String
})
</script>

<style scoped>
:deep(main) {
  flex: 1;
  width: 100%;
}
</style>