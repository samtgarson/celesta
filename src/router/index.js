import Vue from 'nativescript-vue'
import VueRouter from 'vue-router'

import Home from '../pages/Home'
import Onboard from '../pages/Onboard'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      name: 'home',
      path: '/',
      component: Home
    },
    {
      name: 'onboard',
      path: '/onboard',
      components: {
        modal: Onboard
      }
    },
    { path: '*', redirect: '/' }
  ]
})

router.replace('/')

module.exports = router
