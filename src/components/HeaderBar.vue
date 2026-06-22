<template>
  <header>
    <RouterLink to="/" class="wordmark">
      <img src="/logo.svg" alt="Le Petit Cours" height="38" />
    </RouterLink>

    <button
      class="menu-btn"
      @click="toggleMenu"
      :aria-expanded="isOpen"
      aria-controls="site-nav"
      aria-label="Menu principal"
    >
      <span class="lines" :class="{ open: isOpen }" aria-hidden="true">
        <span></span>
        <span></span>
        <span></span>
      </span>
    </button>
  </header>

  <Transition name="veil">
    <div v-if="isOpen" class="overlay" @click="closeMenu"></div>
  </Transition>

  <aside id="site-nav" :class="{ open: isOpen }" aria-label="Menu principal">
    <div class="drawer-head">
      <RouterLink to="/" class="drawer-logo" @click="closeMenu">
        <img src="/logo.svg" alt="Le Petit Cours" height="26" />
      </RouterLink>
      <button class="close-btn" @click="closeMenu" aria-label="Fermer le menu">
        <span aria-hidden="true">✕</span>
      </button>
    </div>

    <nav>
      <RouterLink to="/" @click="closeMenu">
        <span class="nav-index">I.</span>Sommaire
      </RouterLink>
      <RouterLink to="/contact" @click="closeMenu">
        <span class="nav-index">II.</span>Contact
      </RouterLink>
      <RouterLink to="/a-propos" @click="closeMenu">
        <span class="nav-index">III.</span>À propos
      </RouterLink>
    </nav>

    <p class="drawer-stamp">Le Petit Cours</p>
  </aside>
</template>

<script setup>
import { ref } from 'vue'

const isOpen = ref(false)
const toggleMenu = () => { isOpen.value = !isOpen.value }
const closeMenu  = () => { isOpen.value = false }
</script>

<style scoped>
/* ── Header bar ─────────────────────────────────── */
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding-bottom: 1rem;
  margin-bottom: 1.5rem;
  border-bottom: 3px solid var(--clr-blue);
}

.wordmark img {
  display: block;
  border-radius: var(--radius-sm);
  border: 1px solid var(--clr-border-soft);
  background: var(--clr-page);
  padding: 0.3rem 0.45rem;
}

/* ── Hamburger button ───────────────────────────── */
.menu-btn {
  width: 2.75rem;
  height: 2.75rem;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-sm);
  background: transparent;
  border: 1.5px solid var(--clr-border);
  color: var(--clr-blue);
  transition: background 0.15s ease, border-color 0.15s ease;
}

.menu-btn:hover {
  background: var(--clr-blue-light);
  border-color: var(--clr-blue);
}

.menu-btn:focus-visible {
  outline: 2px solid var(--clr-blue);
  outline-offset: 3px;
}

/* ── CSS lines → animated X ─────────────────────── */
.lines {
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 18px;
}

.lines span {
  display: block;
  height: 1.5px;
  width: 100%;
  background: currentColor;
  border-radius: 1px;
  transform-origin: center;
  transition: transform 0.22s ease, opacity 0.22s ease;
}

.lines.open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
.lines.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
.lines.open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }

/* ── Overlay ────────────────────────────────────── */
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(26, 26, 46, 0.4);
  backdrop-filter: blur(2px);
  z-index: 10;
}

.veil-enter-active,
.veil-leave-active { transition: opacity 0.22s ease; }
.veil-enter-from,
.veil-leave-to { opacity: 0; }

/* ── Drawer ─────────────────────────────────────── */
aside {
  position: fixed;
  top: 0;
  left: 0;
  width: min(300px, 85vw);
  height: 100dvh;
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
  padding: 1.75rem 1.5rem;
  background: var(--clr-page);
  border-right: 1px solid var(--clr-border);
  transform: translateX(-100%);
  transition: transform 0.28s ease;
  z-index: 11;
}

aside.open {
  transform: translateX(0);
}

/* ── Drawer: header row ─────────────────────────── */
.drawer-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 1rem;
  border-bottom: 2px solid var(--clr-blue);
}

.drawer-logo img {
  display: block;
}

.close-btn {
  width: 2rem;
  height: 2rem;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-sm);
  border: 1px solid var(--clr-border);
  background: transparent;
  color: var(--clr-ink-mid);
  font-size: 0.85rem;
  transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease;
}

.close-btn:hover {
  background: var(--clr-red-light);
  border-color: var(--clr-red);
  color: var(--clr-red);
}

.close-btn:focus-visible {
  outline: 2px solid var(--clr-blue);
  outline-offset: 2px;
}

/* ── Drawer: nav links ──────────────────────────── */
nav {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

nav a {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-radius: var(--radius-sm);
  background: transparent;
  border: 1px solid transparent;
  color: var(--clr-ink);
  font-family: var(--font-sans);
  font-weight: 600;
  font-size: 0.95rem;
  text-decoration: none;
  transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease;
}

nav a:hover {
  background: var(--clr-blue-light);
  border-color: rgba(24, 84, 160, 0.2);
  color: var(--clr-blue);
}

nav a.router-link-active {
  background: var(--clr-blue-light);
  border-color: rgba(24, 84, 160, 0.25);
  color: var(--clr-blue-dark);
}

nav a:focus-visible {
  outline: 2px solid var(--clr-blue);
  outline-offset: 2px;
}

.nav-index {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  font-weight: 400;
  letter-spacing: 0.06em;
  color: var(--clr-ink-soft);
  flex-shrink: 0;
  width: 1.5rem;
}

/* ── Drawer: footer label ───────────────────────── */
.drawer-stamp {
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid var(--clr-border-soft);
  font-family: var(--font-mono);
  font-size: 0.68rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--clr-ink-soft);
  text-align: center;
}
</style>
