import Vue from 'nativescript-vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import createLogger from 'vuex/dist/logger'
import * as base from './base'

Vue.use(Vuex)
const vuexLocal = new VuexPersistence({
  storage: localStorage
})

const plugins = [vuexLocal.plugin]
if (DEBUG) plugins.push(createLogger())


const store = new Vuex.Store({
  plugins,
  strict: true,
  ...base
})

Vue.prototype.$store = store

module.exports = store
