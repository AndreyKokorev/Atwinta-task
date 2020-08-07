import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: () => import('../views/Authorization'),
    props: true
  },
  {
    path: '/workers',
    component: () => import('../views/Workers'),
    props: true
  },
  {
    path: '/workers/:id',
    component: () => import('../components/WorkerProfile'),
    props: true
  },
  {
    path: '/profile',
    component: () => import('../views/Profile'),
    props: true
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
});

export default router;