import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Catalog from '../views/Catalog.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component:About
  },
  {
    path: '/catalog',
    name: 'Catalog',
    component:Catalog
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router