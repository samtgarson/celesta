import uuid from '../../assets/helpers/uuid'

export const state = {
  all: {},
  active: null
}

export const mutations = {
  addInstrument (s, instrument) {
    s.all = { ...s.all, [instrument.id]: instrument }
  },
  activateInstrument (s, id) {
    s.active = id
  }
}

export const actions = {
  addInstrument ({ commit, getters }, instrument) {
    const id = uuid()
    commit('addInstrument', { ...instrument, id })
    if (!getters.active) commit('activateInstrument', id)
  }
}

export const getters = {
  list ({ all }) {
    return Object.values(all)
  },
  empty (s, { list }) {
    return list.length === 0
  },
  active ({ all, active }) {
    return all[active]
  }
}

export const namespaced = true
