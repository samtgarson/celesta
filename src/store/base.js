export const state = {
  user: {}
}

export const mutations = {
  setUser (_state, u) {
    _state.user = u
  }
}

export const actions = {
  async updateUser ({ commit }, { refreshToken, ...user }) {
    user.createdAt = new Date()
    commit('setUser', user)
    const usersRef = this.$firebase.firestore.collection('users')
    await usersRef.doc(user.uid).set(user, { merge: true })
  }
}

export const getters = {
  firstName ({ user }) {
    return user.name && user.name.split(' ')[0]
  }
}