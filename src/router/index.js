import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/login',
    component: () => import('../views/Authorization'),
    props: true
  },
  {
    path: '/workers',
    component: () => import('../views/Workers.vue'),
    props: true
  },
  {
    path: '/profile',
    component: () => import('../views/Profile.vue'),
    props: true
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
