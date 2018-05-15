import firebase from 'nativescript-plugin-firebase'
import store from '../store'

export default class Auth {
  constructor () {
    this.store = store
  }

  init () {
    firebase.init({ onAuthStateChanged: data => this.onStateChange(data) })
    firebase.getCurrentUser()
      .catch(() => {
        this.login()
      })
  }

  onStateChange ({ user }) {
    if (user) this.user = user
    else this.logout()
  }

  // eslint-disable-next-line class-methods-use-this
  login () {
    const type = firebase.LoginType.ANONYMOUS
    firebase.login({ type })
  }

  set user (u) {
    this.store.commit('setUser', u)
  }

  get user () {
    return this.store.state.user
  }

  logout () {
    this.store.commit('setUser', null)
  }
}
