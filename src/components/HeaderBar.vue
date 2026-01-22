<template>
    <header>
        <div class="logo">
            <RouterLink to="/">
                <img :src="logo" alt="logo" height="64" />
            </RouterLink>
        </div>

        <button class="menu-btn" @click="toggleMenu">
            <IconMdiMenu width="20" height="20" />
        </button>
    </header>

    <div v-if="isOpen" class="overlay" @click="closeMenu"></div>

    <aside :class="{ open: isOpen }">
        <nav>
            <RouterLink to="/">Sommaire</RouterLink>
            <RouterLink to="/contact">Contact</RouterLink>
            <RouterLink to="/a-propos">À propos</RouterLink>
        </nav>
    </aside>
</template>

<script setup>
import { ref } from 'vue'
import logo from '@/assets/logo.svg'

const isOpen = ref(false)

const toggleMenu = () => {
    isOpen.value = !isOpen.value
}

const closeMenu = () => {
    isOpen.value = false
}
</script>

<style scoped>
/* Header */
header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

/* Overlay */
.overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 1;
}

/* Aside menu */
aside {
    position: fixed;
    top: 0;
    left: 0;
    width: 260px;
    max-width: 100%;
    height: 100dvh;
    max-height: 100%;
    background: white;
    transform: translateX(-100%);
    transition: transform 0.25s ease;
    z-index: 2;
    padding: 1.5rem;
}

aside.open {
    transform: translateX(0);
}

nav {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}
</style>
