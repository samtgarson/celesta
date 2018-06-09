import dayjs from 'dayjs'

const format = 'YYYY-MM-DD'

export const state = {
  now: dayjs().format(format)
}

export const actions = {
  start ({ commit }) {
    setInterval(() => {
      commit('updateTime')
    }, 1000 * 60)
  }
}

export const mutations = {
  updateTime (_state) {
    _state.now = dayjs().format(format)
  }
}

export const getters = {
  today ({ now }) {
    return dayjs(now)
  }
}

export const namespaced = true
