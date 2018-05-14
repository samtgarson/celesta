import Vue from 'nativescript-vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import * as base from './base'

Vue.use(Vuex)

const modules = { base }
const plugins = []
if (DEBUG) plugins.push(createLogger())

const store = new Vuex.Store({
  modules,
  plugins,
  strict: !DEBUG
})

Vue.prototype.$store = store

module.exports = store
