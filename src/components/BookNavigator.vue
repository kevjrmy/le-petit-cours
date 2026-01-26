<script setup>
import { onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { flattenedPages } from '@/router/book-structure'

const route = useRoute()
const router = useRouter()

let touchStartX = 0
let touchEndX = 0
const minSwipeDistance = 70

const handleGesture = () => {
    // Si ce n'est pas une page du livre, on ignore le swipe
    if (!route.meta.isBook) return

    const diff = touchStartX - touchEndX
    const currentIndex = flattenedPages.findIndex(p => p.path === route.path)

    if (Math.abs(diff) > minSwipeDistance) {
        if (diff > 0) navigate(currentIndex + 1) // Go right -> next
        else navigate(currentIndex - 1)          // Go left -> previous
    }
}


const navigate = (index) => {
    if (index >= 0 && index < flattenedPages.length) {
        router.push(flattenedPages[index].path)
    }
}

const ts = (e) => { touchStartX = e.changedTouches[0].screenX }
const te = (e) => { touchEndX = e.changedTouches[0].screenX; handleGesture() }

onMounted(() => {
    window.addEventListener('touchstart', ts)
    window.addEventListener('touchend', te)
})

onUnmounted(() => {
    window.removeEventListener('touchstart', ts)
    window.removeEventListener('touchend', te)
})
</script>

<template>
    <template />
</template>