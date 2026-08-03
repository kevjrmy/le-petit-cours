<!-- view-meta: created=2026-08-02; updated=2026-08-03 -->
<template>
  <AltLayout title="Conversation">
    <main>
      <p class="intro">
        Mises en situation de la vie quotidienne. Complétez les dialogues
        et entraînez-vous à parler français au niveau A2.
      </p>

      <nav class="lesson-nav" aria-label="Dialogues disponibles">
        <RouterLink
          v-for="item in dialogues"
          :key="item.path"
          :to="item.path"
          class="lesson-row"
        >
          <span class="title-wrap">
            <span class="lesson-title">{{ item.title }}</span>
            <span v-if="newDialoguePaths.has(item.path)" class="new-badge">Nouveau</span>
          </span>
          <span class="arrow" aria-hidden="true">→</span>
        </RouterLink>
      </nav>
    </main>
  </AltLayout>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import AltLayout from '@/layouts/AltLayout.vue'
import { isNewView } from '@/utils/viewMeta'

const newDialoguePaths = ref(new Set())

const dialogues = [
  { path: '/conversation/en-vacances', title: '🏖️ En vacances' },
  { path: '/conversation/a-la-boulangerie', title: '🥖 À la boulangerie' },
  { path: '/conversation/a-disneyland-paris', title: '🏰 À Disneyland Paris' },
  { path: '/conversation/chez-le-medecin', title: '🩺 Chez le médecin' },
  { path: '/conversation/a-la-pharmacie', title: '💊 À la pharmacie' },
]

onMounted(async () => {
  const entries = await Promise.all(
    dialogues.map(async item => [item.path, await isNewView(item.path)])
  )
  newDialoguePaths.value = new Set(entries.filter(([, isNew]) => isNew).map(([path]) => path))
})
</script>

<style scoped>
.intro {
  font-family: var(--font-serif);
  font-style: italic;
  color: var(--clr-ink-mid);
  font-size: 1rem;
  line-height: 1.75;
  padding-bottom: 1.25rem;
  border-bottom: 1px solid var(--clr-border-soft);
}

.lesson-nav {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.lesson-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.9rem 1.1rem;
  background: var(--clr-page);
  border: 1px solid var(--clr-border);
  border-radius: var(--radius);
  color: var(--clr-ink);
  text-decoration: none;
  transition: border-color 0.15s, color 0.15s, background 0.15s;
}

.lesson-row:hover {
  border-color: var(--clr-blue);
  color: var(--clr-blue-dark);
  background: var(--clr-blue-light);
}

.title-wrap {
  display: flex;
  align-items: center;
  gap: 0.55rem;
}

.lesson-title {
  font-family: var(--font-serif);
  font-size: 0.97rem;
}

.new-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.12rem 0.45rem;
  border-radius: 99px;
  background: var(--clr-red);
  color: var(--clr-page);
  font-family: var(--font-sans);
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  line-height: 1.4;
  text-transform: uppercase;
}

.arrow {
  color: var(--clr-ink-soft);
  font-size: 0.9rem;
  transition: transform 0.15s, color 0.15s;
}

.lesson-row:hover .arrow {
  transform: translateX(3px);
  color: var(--clr-blue);
}
</style>
