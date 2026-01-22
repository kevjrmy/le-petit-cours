<template>
  <header>
    <button @click="goBack" class="logo">
      <IconBack height="1.5rem" width="1.5rem" />
    </button>
  </header>
  <h1 v-if="title">{{ title }}</h1>
</template>

<script setup>
import { useRouter } from 'vue-router'
import IconBack from '~icons/mdi/keyboard-backspace'

defineProps({
  title: {
    type: String,
    default: ''
  }
})

const router = useRouter()

const goBack = () => {
  if (window.history.length > 1) {
    router.back()
  } else {
    router.push('/')
  }
}
</script>