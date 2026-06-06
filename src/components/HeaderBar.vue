<template>
    <header>
        <div class="logo">
            <RouterLink to="/">
                <img src="/logo.svg" alt="logo" height="40px" />
            </RouterLink>
        </div>

        <button class="menu-btn" @click="toggleMenu">
            <IconMdiMenu width="20" height="20" />
        </button>
    </header>

    <div v-if="isOpen" class="overlay" @click="closeMenu"></div>

    <aside :class="{ open: isOpen }">
        <div class="menu-logo">
            <RouterLink to="/">
                <img src="/logo.svg" alt="logo" height="24px" />
            </RouterLink>
        </div>
        <nav @click="closeMenu">
            <RouterLink to="/">Sommaire</RouterLink>
            <RouterLink to="/contact">Contact</RouterLink>
            <RouterLink to="/a-propos">À propos</RouterLink>
        </nav>
    </aside>
</template>

<script setup>
import { ref } from 'vue'

const isOpen = ref(false)

const toggleMenu = () => {
    isOpen.value = !isOpen.value
}

const closeMenu = () => {
    isOpen.value = false
}
</script>

<style scoped>
header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    margin-bottom: 1.8rem;
    padding-bottom: 0.8rem;
    border-bottom: 1px solid rgba(35, 35, 35, 0.12);
}

.logo img {
    display: block;
    border-radius: 0.8rem;
    border: 1px solid rgba(35, 35, 35, 0.08);
    background: rgba(255, 255, 255, 0.9);
    padding: 0.35rem 0.5rem;
}

.menu-btn {
    width: 3.2rem;
    height: 3.2rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: rgba(223, 189, 171, 0.18);
    border: 1px solid rgba(143, 45, 69, 0.16);
    color: var(--clr-navy);
}

.menu-btn:hover {
    transform: translateY(-1px);
}

.overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.32);
    z-index: 1;
}

aside {
    position: fixed;
    top: 0;
    left: 0;
    width: min(320px, 85vw);
    height: 100dvh;
    background: rgba(245, 238, 226, 0.98);
    transform: translateX(-100%);
    transition: transform 0.28s ease;
    z-index: 2;
    padding: 2.2rem 1.6rem;
    border-right: 1px solid rgba(35, 35, 35, 0.12);
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

aside.open {
    transform: translateX(0);
}

aside .menu-logo {
    display: flex;
    justify-content: center;
    padding-bottom: 0.4rem;
    border-bottom: 1px solid rgba(35, 35, 35, 0.08);
}

nav {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

nav a {
    color: var(--clr-ink);
    font-weight: 700;
    letter-spacing: 0.03em;
    padding: 0.85rem 1rem;
    border-radius: 18px;
    background: rgba(255, 255, 255, 0.85);
    border: 1px solid rgba(35, 35, 35, 0.08);
}

nav a:hover {
    background: rgba(223, 189, 171, 0.16);
    color: var(--clr-navy);
}

@media (min-width: 860px) {
    header {
        margin-bottom: 2.2rem;
    }
}
</style>
