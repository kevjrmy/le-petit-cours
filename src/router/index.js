import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ExercisesView from '../views/ExercisesView.vue'
import ExerciseDetailView from '../views/ExerciseDetailView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
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
    }
  ]
})

export default router