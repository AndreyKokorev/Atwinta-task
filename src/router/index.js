import Vue from 'vue'
import VueRouter from 'vue-router'
import Registration from '../views/Registration.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Registration',
    component: Registration
  },
  {
    path: '/workers',
    name: 'Workers',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Workers.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/Profile.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
