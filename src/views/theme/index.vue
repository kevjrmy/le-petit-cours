<template>
  <DefaultLayout title="Thèmes de conversation">
    <main id="theme-index">
      <p class="intro">
        Choisissez un thème et pratiquez votre français à l'oral. Pour chaque thème, vous trouverez
        du vocabulaire utile, des questions pour lancer la conversation et des expressions pour
        donner votre avis.
      </p>
      <p class="intro-hint">
        <em>(Escoja un tema y practique su francés oral. Vocabulario, preguntas de arranque y expresiones para dar su opinión.)</em>
      </p>

      <nav class="topic-nav" aria-label="Thèmes disponibles">
        <RouterLink to="/theme/la-famille" class="topic-row">
          <div class="topic-info">
            <span class="topic-title">La famille et les amis</span>
            <span class="topic-desc">Parler de votre famille, de vos relations et des gens qui vous entourent.</span>
          </div>
          <span class="arrow" aria-hidden="true">→</span>
        </RouterLink>
        <RouterLink to="/theme/les-loisirs" class="topic-row">
          <div class="topic-info">
            <span class="topic-title">Les loisirs et le sport</span>
            <span class="topic-desc">Parler de vos activités préférées, de vos hobbies et du sport.</span>
          </div>
          <span class="arrow" aria-hidden="true">→</span>
        </RouterLink>
        <RouterLink to="/theme/la-nourriture" class="topic-row">
          <div class="topic-info">
            <span class="topic-title">La nourriture et les repas</span>
            <span class="topic-desc">Parler de ce que vous aimez manger, de la cuisine et des repas en famille.</span>
          </div>
          <span class="arrow" aria-hidden="true">→</span>
        </RouterLink>
        <RouterLink to="/theme/si-je-devais-realiser-un-film" class="topic-row">
          <div class="topic-info">
            <span class="topic-title">Si je devais réaliser un film...</span>
            <span class="topic-desc">Film d'auteur ou hollywoodien ? Imaginez votre film idéal et défendez votre choix.</span>
          </div>
          <span class="arrow" aria-hidden="true">→</span>
        </RouterLink>
        <RouterLink to="/theme/ah-si-jetais-riche" class="topic-row">
          <div class="topic-info">
            <span class="topic-title">Ah, si j'étais riche !</span>
            <span class="topic-desc">Que feriez-vous avec une grande fortune ? Voyages, dons, retraite anticipée… rêvez en français.</span>
          </div>
          <span class="arrow" aria-hidden="true">→</span>
        </RouterLink>
      </nav>
    </main>
  </DefaultLayout>
</template>

<script setup>
import DefaultLayout from '@/layouts/DefaultLayout.vue'
</script>

<style scoped>
#theme-index {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.intro {
  font-family: var(--font-serif);
  font-style: italic;
  color: var(--clr-ink-mid);
  font-size: 1rem;
  line-height: 1.75;
  padding-bottom: 0.5rem;
  margin: 0;
}

.intro-hint {
  font-family: var(--font-serif);
  font-size: 0.85rem;
  color: var(--clr-ink-soft);
  margin: 0;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--clr-border-soft);
}

.topic-nav {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.topic-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem 1.1rem;
  background: var(--clr-page);
  border: 1px solid var(--clr-border);
  border-radius: var(--radius);
  color: var(--clr-ink);
  text-decoration: none;
  transition: border-color 0.15s, background 0.15s, color 0.15s;
}

.topic-row:hover {
  border-color: var(--clr-blue);
  background: var(--clr-blue-light);
  color: var(--clr-blue-dark);
}

.topic-info {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.topic-title {
  font-family: var(--font-serif);
  font-size: 1rem;
  font-weight: 700;
  color: var(--clr-ink);
  transition: color 0.15s;
}

.topic-row:hover .topic-title {
  color: var(--clr-blue-dark);
}

.topic-desc {
  font-family: var(--font-sans);
  font-size: 0.8rem;
  color: var(--clr-ink-soft);
  line-height: 1.4;
}

.arrow {
  color: var(--clr-ink-soft);
  font-size: 0.9rem;
  flex-shrink: 0;
  transition: transform 0.15s, color 0.15s;
}

.topic-row:hover .arrow {
  transform: translateX(3px);
  color: var(--clr-blue);
}
</style>
