export default class Auth {
  constructor ({ store, firebase }) {
    this.store = store
    this.firebase = firebase
  }

  init () {
    this.firebase.init({ onAuthStateChanged: data => this.onStateChange(data) })
    if (this.store.state.user.uid) return
    this.getUser()
  }

  async getUser () {
    try {
      const user = await this.firebase.getCurrentUser()
      if (user) return this.onStateChange({ user })
    } catch (e) {
      if (DEBUG) console.error(e)
    }
    return this.login()
  }

  onStateChange ({ user = {} }) {
    this.store.dispatch('updateUser', user)
  }

  login () {
    const type = this.firebase.LoginType.ANONYMOUS
    this.firebase.login({ type })
  }
}
