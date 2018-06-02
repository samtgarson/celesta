import Vue from 'nativescript-vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import createLogger from 'vuex/dist/logger'
import * as base from './base'
import * as instruments from './instruments'

Vue.use(Vuex)
const vuexLocal = new VuexPersistence({
  storage: localStorage
})

const plugins = [vuexLocal.plugin]
if (DEBUG) plugins.push(createLogger())

const modules = {
  instruments
}

const store = new Vuex.Store({
  plugins,
  modules,
  strict: false,
  ...base
})

Vue.prototype.$store = store

module.exports = store
