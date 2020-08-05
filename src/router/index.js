import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Authorization',
    component: () => import('../views/Authorization')
  },
  {
    path: '/workers',
    name: 'Workers',
    component: () => import('../views/Workers.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/Profile.vue')
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
