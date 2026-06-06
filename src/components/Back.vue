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
  gap: 1rem;
  margin-bottom: 1.2rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid rgba(35, 35, 35, 0.08);
}

.back-btn {
  width: 3rem;
  height: 3rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  background: rgba(223, 189, 171, 0.22);
  border: 1px solid rgba(35, 35, 35, 0.12);
  color: var(--clr-navy);
  transition: transform 0.2s ease;
}

.back-btn:hover {
  transform: translateX(-2px);
}

.page-title {
  font-size: 1.45rem;
  margin: 0;
  text-align: center;
  flex: 1;
  letter-spacing: 0.02em;
}

.spacer {
  width: 3rem;
}
</style>