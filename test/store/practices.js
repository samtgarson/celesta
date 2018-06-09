import { getters, mutations } from '@/store/practices'
import dayjs from 'dayjs'
import PracticeFactory from '../support/factories/practice-factory'
import { GOOD, MEDIUM, BAD } from '@/assets/constants/moods'
import * as statuses from '@/assets/constants/statuses'

describe('practices', () => {
  let state
  let practices

  beforeEach(() => {
    state = {
      list: [],
      today: dayjs(),
      recent: { unit: 'day', amount: 2, perUnit: 2 }
    }
    practices = [0, 1, 2].map(i =>
      PracticeFactory.build({}, { daysInPast: i }))
  })

  describe('mutations', () => {
    it('adds a practice', () => {
      const practice = PracticeFactory.build()
      mutations.addPractice(state, practice)

      expect(state.list).toContain(practice)
    })

    it('keeps the list ordered chonologically', () => {
      practices.forEach(p => mutations.addPractice(state, p))
      const sorted = [...state.list].sort((a, b) =>
        b.createdAt.valueOf() - a.createdAt.valueOf())

      expect(state.list).toEqual(sorted)
    })
  })

  describe('getters', () => {
    let _getters
    let newPractice
    let result

    beforeEach(() => {
      newPractice = PracticeFactory.build({}, { daysInPast: 1 })
      _getters = { list: [...practices, newPractice]}
    })

    describe('recent', () => {
      it('filters to recent practices', () => {
        result = getters.recent(state, _getters)
        expect(result.length).toEqual(4)

        state.recent.amount = 1
        result = getters.recent(state, _getters)
        expect(result.length).toEqual(3)
      })
    })

    describe('recentGroups', () => {
      it('groups the practices', () => {
        result = getters.recentGrouped(state, _getters)

        expect(result).toHaveProperty(dayjs().subtract(0, 'day').format('YYYY-MM-DD'), [practices[0]])
        expect(result).toHaveProperty(dayjs().subtract(1, 'day').format('YYYY-MM-DD'), [practices[1], newPractice])
      })

      it('has empty groups for empty periods', () => {
        state.recent.amount = 4
        result = getters.recentGrouped(state, _getters) 

        expect(result).toHaveProperty(dayjs().subtract(3, 'day').format('YYYY-MM-DD'), [])
      })
    })

    describe('tooSoon', () => {
      describe('when there are enough practices', () => {
        beforeEach(() => {
          const recentGrouped = getters.recentGrouped(state, _getters)
          result = getters.tooSoon(state, { recentGrouped })
        })

        it('is true', () => {
          expect(result).toBeTruthy()
        })
      })
      
      describe('when there are not enough practices', () => {
        beforeEach(() => {
          state.recent.amount = 10
          const recentGrouped = getters.recentGrouped(state, _getters)
          result = getters.tooSoon(state, { recentGrouped })
        })

        it('is false', () => {
          expect(result).not.toBeTruthy()
        })
      })
    })

    describe('metGoals', () => {
      const key = num => dayjs().subtract(num, 'day').format('YYYY-MM-DD')
      const createGroups = n => ({
        [key(0)]: PracticeFactory.buildList(n[0], { daysInPast: 0 }),
        [key(1)]: PracticeFactory.buildList(n[1], { daysInPast: 1 }),
        [key(2)]: PracticeFactory.buildList(n[2], { daysInPast: 2 }) 
      })

      beforeEach(() => {
        state.recent.amount = 3
      })

      describe('when the goals are met', () => {
        beforeEach(() => {
          const recentGrouped = createGroups([2, 2, 2])
          result = getters.metGoals(state, { recentGrouped })
        })

        it('returns GOOD', () => {
          expect(result).toEqual(GOOD)
        })
      })
     
      describe('when the goals are almost met', () => {
        beforeEach(() => {
          const recentGrouped = createGroups([2, 2, 1])
          result = getters.metGoals(state, { recentGrouped })
        })

        it('returns MEDIUM', () => {
          expect(result).toEqual(MEDIUM)
        })
      })
     
      describe('when the goals are not met', () => {
        beforeEach(() => {
          const recentGrouped = createGroups([2, 0, 1])
          result = getters.metGoals(state, { recentGrouped })
        })

        it('returns BAD', () => {
          expect(result).toEqual(BAD)
        })
      })
    })

    describe('recentMood', () => {
      let recent

      beforeEach(() => {
        result = getters.recentMood({}, { recent })
      })

      describe('when the mood is good', () => {
        beforeAll(() => {
          recent = PracticeFactory.buildList(10, { type: GOOD })
        })

        it('returns GOOD', () => {
          expect(result).toEqual(GOOD)
        })
      })

      describe('when the mood is medium', () => {
        beforeAll(() => {
          recent = [
            ...PracticeFactory.buildList(4, { type: BAD }),
            ...PracticeFactory.buildList(3, { type: MEDIUM }),
            PracticeFactory.build({ type: GOOD })
          ]
        })

        it('returns MEDIUM', () => {
          expect(result).toEqual(MEDIUM)
        })
      })

      describe('when the mood is bad', () => {
        beforeAll(() => {
          recent = [
            ...PracticeFactory.buildList(9, { type: BAD }),
            PracticeFactory.build({ type: GOOD })
          ]
        })

        it('returns BAD', () => {
          expect(result).toEqual(BAD)
        })
      })
    })

    describe('mood', () => {
      let tooSoon, metGoals, recentMood

      beforeEach(() => {
        result = getters.mood({}, { tooSoon, metGoals, recentMood })
      })

      describe('when all is well', () => {
        beforeAll(() => {
          tooSoon = false
          metGoals = GOOD
          recentMood = GOOD
        })
        
        it('defaults to GOOD', () => {
          expect(result).toEqual({
            mood: GOOD, 
            status: statuses.GOING_WELL
          })
        })
      })
      
      describe('when it is too soon', () => {
        beforeAll(() => {
          tooSoon = true
          metGoals = GOOD
          recentMood = GOOD
        })
        
        it('sends a appropriate status', () => {
          expect(result).toEqual({
            mood: GOOD, 
            status: statuses.TOO_SOON
          })
        })
      })
      
      describe('when metGoals is not Good', () => {
        beforeAll(() => {
          tooSoon = false
          metGoals = MEDIUM
          recentMood = GOOD
        })

        it('returns the value of metgoals', () => {
          expect(result).toEqual({
            mood: metGoals,
            status: statuses.NOT_MET_GOALS
          })
        })
      })
      
      describe('when metGoals and recentMood is not Good', () => {
        beforeAll(() => {
          tooSoon = false
          metGoals = MEDIUM
          recentMood = GOOD
        })

        it('returns the value of metgoals', () => {
          expect(result).toEqual({
            mood: metGoals,
            status: statuses.NOT_MET_GOALS
          })
        })
      })
      
      describe('when recentMood is not Good', () => {
        beforeAll(() => {
          tooSoon = false
          metGoals = GOOD
          recentMood = BAD
        })

        it('returns the value of recentMood', () => {
          expect(result).toEqual({
            mood: recentMood,
            status: statuses.NOT_ENJOYING
          })
        })
      })
    })
  })
})
