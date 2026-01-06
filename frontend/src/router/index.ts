import { createRouter, createWebHistory } from 'vue-router'
import AlbumView from '../views/AlbumView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'album',
      component: AlbumView,
    },
  ],
})

export default router
