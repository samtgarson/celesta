import Vue from 'nativescript-vue'
import 'nativescript-localstorage'
import firebase from 'nativescript-plugin-firebase'
import router from './router'
import store from './store'
import Auth from './services/auth'
import Layout from './pages/Layout'

// Uncommment the following to see NativeScript-Vue output logs
// Vue.config.silent = false

Vue.prototype.$firebase = firebase
store.$firebase = firebase

Vue.mixin({
  computed: {
    $currentUser () { return this.$store.state.user }
  }
})

global.app = new Vue({
  router,
  store,
  render: h => h(Layout),
  mounted () {
    const auth = new Auth({ store, firebase })
    auth.init()
  }
})

global.app.$start()
