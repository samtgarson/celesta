import { mutations, actions, getters } from '@/store/instruments'
import InstrumentFactory from '../support/factories/instrument-factory'

describe('instruments', () => {
  describe('mutations', () => {
    it('adds the instrument', () => {
      const state = { all: {} }
      const instrument = { id: '1', type: 'trumpet' }

      mutations.addInstrument(state, instrument)
      expect(state.all).toHaveProperty(instrument.id, instrument)
    })

    it('activates the instrument', () => {
      const state = { all: {}, active: null }
      const id = '1'

      mutations.activateInstrument(state, id)
      expect(state).toHaveProperty('active', id)
    })
  })

  describe('actions', () => {
    let commit
    let g = {}
    const instrument = {
      name: 'name',
      type: 'piano'
    }

    beforeEach(async () => {
      commit = jest.fn()
      await actions.addInstrument({ getters: g, commit }, instrument)
    })

    it('adds the instrument', () => {
      expect(commit).toHaveBeenCalledWith('addInstrument', {
        ...instrument,
        id: expect.any(String)
      })
    })

    describe('when there is no active instrument', () => {
      beforeAll(() => {
        g = { active: false }
      })

      it('sets the active', () => {
        expect(commit).toHaveBeenCalledWith('activateInstrument', expect.any(String))
      })
    })

    describe('when there is no active instrument', () => {
      beforeAll(() => {
        g = { active: true }
      })

      it('does not set the active', () => {
        expect(commit).not.toHaveBeenCalledWith('activateInstrument')
      })
    })
  })

  describe('getters', () => {
    let state
    const allInstruments = InstrumentFactory.buildList(3)
    const dict = allInstruments.reduce((hsh, i) => ({
      ...hsh,
      [i.id]: i
    }), {})

    beforeEach(() => {
      state = { all: dict, active: null }
    })
    describe('list', () => {
      it('provides all the instruments in a list', () => {
        const result = getters.list(state)
        expect(result).toMatchObject(allInstruments)
      })
    })

    describe('empty', () => {
      it('it returns true', () => {
        const result = getters.empty(state, { list: [] })
        expect(result).toBeTruthy()
      })

      it('it returns false', () => {
        const result = getters.empty(state, { list: allInstruments })
        expect(result).not.toBeTruthy()
      })
    })

    describe('active', () => {
      describe('without an active instrument', () => {
        it('returns nothing if no instrument is active', () => {
          const result = getters.active(state)
          expect(result).toBeUndefined()
        })
      })

      describe('with an active instrument', () => {
        beforeEach(() => {
          state.active = allInstruments[0].id
        })

        it('it returns the active instrument', () => {
          const result = getters.active(state)
          expect(result).toEqual(allInstruments[0])
        })
      })
    })
  })
})
