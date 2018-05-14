import Vue from 'nativescript-vue'
import firebase from 'nativescript-plugin-firebase'
import router from './router'
import store from './store'
import Auth from './services/auth'

// Uncommment the following to see NativeScript-Vue output logs
Vue.config.silent = false

Vue.prototype.$firebase = firebase
store.$firebase = firebase

const auth = new Auth()
Vue.prototype.$auth = auth
store.$auth = auth

global.app = new Vue({
  router,
  store,
  mounted () {
    this.$auth.init()
  }
})

global.app.$start()
