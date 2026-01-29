<template>
  <header class="back-header">
    <button @click="goBack" class="back-btn" aria-label="Retour">
      <IconBack height="1.8rem" width="1.8rem" />
    </button>

    <h1 v-if="title" class="page-title">{{ title }}</h1>

    <div class="spacer"></div>
  </header>
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

<style scoped>
.back-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.back-btn {
  color: var(--clr-primary);
  display: flex;
  align-items: center;
  padding: 0.5rem;
  transition: transform 0.2s;
}

.back-btn:hover {
  transform: translateX(-5px);
}

.page-title {
  font-size: 1.3rem;
  margin: 0;
  text-align: center;
  flex: 1;
}

.spacer {
  width: 2.8rem;
}
</style>