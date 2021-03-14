import Vue from 'vue'
import Router from 'vue-router'

import auth from './auth'

// import Home from './views/home'
import Profile from './views/profile'
// import Receipts from './views/receipts'
// import Tasks from './views/tasks'
import defaultLayout from './layouts/side-nav-outer-toolbar'
import simpleLayout from './layouts/single-card'

// import ContractsForm from "./components/ContractsForm";
// import Contracts from './views/contracts.vue'

import ContractsSearch from './views/contracts-search'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/contracts/add',
      meta: { requiresAuth: true },
      components: {
        layout: defaultLayout,
        content: () => import('./views/contracts-add'),
      },
    },
    {
      path: '/orders/add',
      meta: { requiresAuth: true },
      components: {
        layout: defaultLayout,
        content: () => import('./views/contracts-add'),
      },
    },
    {
      path: '/contracts/search',
      name: 'home',
      meta: { requiresAuth: true },
      components: {
        layout: defaultLayout,
        content: ContractsSearch,
      },
    },
    {
      path: '/orders/search',
      meta: { requiresAuth: true },
      components: {
        layout: defaultLayout,
        content: ContractsSearch,
      },
    },
    {
      path: '/contracts/edit/:id',
      props: true,
      meta: { requiresAuth: true },

      components: {
        layout: defaultLayout,
        content: () => import('./views/contracts-edit'),
      },
    },
    {
      path: '/contracts/view/:id',
      meta: { requiresAuth: true },

      props: true,
      components: {
        layout: defaultLayout,
        content: () => import('./views/contracts-view'),
      },
    },
    {
      path: '/receipts/:contractId/edit/:id',
      meta: { requiresAuth: true },
      props: true,
      components: {
        layout: defaultLayout,
        content: () => import('./views/receipts-edit'),
      },
    },
    {
      path: '/profile',
      name: 'profile',
      meta: { requiresAuth: true },
      components: {
        layout: defaultLayout,
        content: Profile,
      },
    },
    {
      path: '/login-form',
      name: 'login-form',
      meta: { requiresAuth: false },
      components: {
        layout: simpleLayout,
        // route level code-splitting
        // this generates a separate chunk (login.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        content: () => import(/* webpackChunkName: "login" */ './views/login-form'),
      },
    },
    // {
    //   path: '/',
    //   redirect: '/contracts/search',
    // },
    {
      path: '*',
      redirect: '/contracts/search',
    },
  ],
})
router.beforeEach((to, from, next) => {
  if (to.name === 'login-form' && auth.authenticated()) {
    next({ name: 'home' })
  }

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!auth.authenticated()) {
      next({
        name: 'login-form',
        query: { redirect: to.fullPath },
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
