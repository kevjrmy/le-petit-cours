<template>
    <footer v-if="$route.name !== 'sommaire'" class="book-footer">
        <div class="page-indicator">
            <span class="page-number">- {{ pageNumber }} -</span>
        </div>
    </footer>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { flattenedPages } from '@/router/book-structure'

const route = useRoute()
const pageNumber = computed(() => {
    const index = flattenedPages.findIndex(p => p.path === route.path)
    return index !== -1 ? index : ''
})
</script>

<style scoped>
.book-footer {
    padding: 1rem 0;
    text-align: center;
    margin-top: auto;
}

.page-indicator {
    border-top: 1px solid var(--clr-border);
    display: inline-block;
    padding-top: 0.5rem;
    min-width: 80px;
}

.page-number {
    color: var(--clr-alt-text);
    font-weight: 500;
    font-size: 0.9rem;
}
</style>