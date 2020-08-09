import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter)

const routes = [{
    path: '/',
    redirect: {
      name: 'auth'
    },
    meta: {
      guest: true
    }
  },
  {
    path: '/auth',
    name: 'auth',
    component: () => import('../views/Authorization'),
    meta: {
      guest: true
    }
  },
  {
    path: '/workers',
    name: 'workers',
    component: () => import('../views/Workers'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/workers/:id',
    component: () => import('../components/WorkerProfile'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../views/Profile'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/auth/restore',
    name: 'restore',
    component: () => import('../views/RestoreEmailForm'),
    meta: {
      guest: true
    }
  },
  {
    path: '/auth/restore/confirm',
    name: 'restore',
    component: () => import('../views/RestorePasswordForm'),
    meta: {
      guest: true
    }
  }
]

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  const accessToken = localStorage.getItem('accessToken')

  if (to.matched.some(record => record.meta.requiresAuth)) {

    if (!accessToken) {
      next({
        path: '/auth',
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.guest)) {

    if (accessToken) {
      next('workers')
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router;