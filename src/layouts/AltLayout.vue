<template>
  <Back :title="title" />
  <slot />
</template>

<script setup>
import Back from '@/components/Back.vue'

defineProps({
  title: {
    type: String,
    default: ''
  }
})
</script>