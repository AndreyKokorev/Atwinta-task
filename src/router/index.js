import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: {
      name:'login'
    },
    meta: {
      guest: true
    }
  },
  {
    path: '/login',
    name: 'login',
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
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
});

router.beforeEach((to, from, next) => {
  const accessToken = localStorage.getItem('accessToken')

  if(to.matched.some(record => record.meta.requiresAuth)) {

      if (!accessToken) {
          next({
              path: '/login',
          })
      } else {
        next()
      }
  } else if(to.matched.some(record => record.meta.guest)){

    if(accessToken) {
      next('workers')
    } else {
      next()
    }   
  }
})

export default router;