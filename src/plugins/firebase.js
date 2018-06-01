import Vue from 'nativescript-vue'
import firebase from 'nativescript-plugin-firebase'
import store from '../store'

Vue.prototype.$firebase = firebase
store.$firebase = firebase
