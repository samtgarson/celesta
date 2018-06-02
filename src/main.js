import Vue from 'nativescript-vue'
import 'nativescript-localstorage'
import router from './router'
import store from './store'
import Auth from './services/auth'
import Layout from './pages/Layout'
import './plugins'

Vue.config.silent = !DEBUG

global.app = new Vue({
  router,
  store,
  render: h => h(Layout),
  mounted () {
    const auth = new Auth({
      store: this.$store,
      firebase: this.$firebase
    })
    auth.init()
  }
})

global.app.$start()
