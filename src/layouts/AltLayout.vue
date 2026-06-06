<template>
  <Back :title="title" />
  <slot />
  <Footer />
</template>

<script setup>
import Back from '@/components/Back.vue'
import Footer from '@/components/Footer.vue'

defineProps({
  title: {
    type: String,
    default: ''
  }
})
</script>