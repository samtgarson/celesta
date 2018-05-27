import Vue from 'nativescript-vue'
import VueRouter from 'vue-router'

import Home from '../pages/Home'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: Home,
      meta: {
        title: 'Home'
      }
    },
    { path: '*', redirect: '/' }
  ]
})

router.replace('/')

module.exports = router
