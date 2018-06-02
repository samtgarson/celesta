import Vue from 'nativescript-vue'
import VueRouter from 'vue-router'

import Home from '../pages/Home'
import Onboard from '../pages/Onboard'
import Songs from '../pages/songs'
import Theory from '../pages/theory'
import Settings from '../pages/settings'

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
    {
      name: 'theory',
      path: '/theory',
      component: Theory
    },
    {
      name: 'songs',
      path: '/songs',
      component: Songs
    },
    {
      name: 'settings',
      path: '/settings',
      component: Settings
    },
    { path: '*', redirect: '/' }
  ]
})

router.replace('/')

module.exports = router
