import store from '@/store'

const { dispatch } = store
store.dispatch = jest.fn()
store._dispatch = dispatch

export default store
