import { mutations, actions } from '@/store/base'
import $firebase from '../support/firebase'

describe('base', () => {
  describe('setUser', () => {
    it('sets the user', () => {
      const state = {}
      const user = 'i am a user'

      mutations.setUser(state, user)
      expect(state).toHaveProperty('user', user)
    })
  })

  describe('updateUser', () => {
    let commit
    const user = {
      refreshToken: 'refreshToken',
      uid: 'user',
      email: 'user@user.com'
    }
    const expectedUser = {
      uid: user.uid,
      email: user.email,
      createdAt: expect.any(Date)
    }
    const mockStoreContext = { $firebase }

    beforeEach(async () => {
      commit = jest.fn()
      await actions.updateUser.call(mockStoreContext, { commit }, user)
    })

    it('sets the user', () => {
      expect(commit).toHaveBeenCalledWith('setUser', expectedUser)
    })

    it('creates the remote user', () => {
      expect($firebase.firestore.collection).toHaveBeenCalledWith('users')
      expect($firebase.firestore.doc).toHaveBeenCalledWith(expectedUser.uid)
      expect($firebase.firestore.set).toHaveBeenCalledWith(expectedUser, { merge: true })
    })
  })
})
