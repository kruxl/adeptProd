/**
 * Vue Router
 *
 * @library
 *
 * https://router.vuejs.org/en/
 */

// Lib imports
import Vue from 'vue'
import VueAnalytics from 'vue-analytics'
import Router from 'vue-router'
import Meta from 'vue-meta'
import firebase from 'firebase'

// Routes
import paths from './paths'

function route (path, view, name, meta) {
  return {
    name: name || view,
    path,
    meta,
    component: (resolve) => import(
      `@/views/${view}.vue`
    ).then(resolve)
  }
}

Vue.use(Router)

// Create a new router
const router = new Router({
  mode: 'history',
  routes: paths.map(path => route(path.path, path.view, path.name, path.meta)).concat([
    { path: '*', redirect: '/dashboard' }
  ]),
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    if (to.hash) {
      return { selector: to.hash }
    }
    return { x: 0, y: 0 }
  }
})

router.beforeEach((to, from, next) => {

  // const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  // if (requiresAuth && !currentUser) {
  //   next('/login');
  // } else if (requiresAuth && currentUser) {
  //   next();
  // } else {
  //   next();
  // }
  if(requiresAuth) {
    firebase.auth().onAuthStateChanged( (user) => {
      if (!user) {
        next('/login')
      } else {
        next();
      }
    })
  } else {
    next();
  }
});

Vue.use(Meta)

// Bootstrap Analytics
// Set in .env
// https://github.com/MatteoGabriele/vue-analytics
if (process.env.GOOGLE_ANALYTICS) {
  Vue.use(VueAnalytics, {
    id: process.env.GOOGLE_ANALYTICS,
    router,
    autoTracking: {
      page: process.env.NODE_ENV !== 'development'
    }
  })
}

export default router
