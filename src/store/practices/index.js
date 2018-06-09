export const state = {
  list: [],
  recent: {
    unit: 'week',
    amount: 6,
    perUnit: 3
  }
}

export const namespaced = true

export { default as getters } from './getters'
export { default as mutations } from './mutations'
