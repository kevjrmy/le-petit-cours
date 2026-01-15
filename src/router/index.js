import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SubcategoriesView from '../views/SubcategoriesView.vue'
import ExercisesView from '../views/ExercisesView.vue'
import ExerciseDetailView from '../views/ExerciseDetailView.vue'
import StoriesListView from '../views/StoriesListView.vue'
import StoryDetailView from '../views/StoryDetailView.vue'
import ComingSoonView from '../views/ComingSoonView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/:mainCategory/subcategories',
      name: 'subcategories',
      component: SubcategoriesView
    },
    {
      path: '/exercises',
      name: 'exercises',
      component: ExercisesView
    },
    {
      path: '/exercise/:id',
      name: 'exercise-detail',
      component: ExerciseDetailView,
      props: true
    },
    {
      path: '/stories',
      name: 'stories-list',
      component: StoriesListView
    },
    {
      path: '/story/:id',
      name: 'story-detail',
      component: StoryDetailView,
      props: true
    },
    {
      path: '/:mainCategory/coming-soon',
      name: 'coming-soon',
      component: ComingSoonView
    }
  ]
})

export default router