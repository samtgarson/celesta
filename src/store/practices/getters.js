import dayjs from 'dayjs'
import { GOOD, MEDIUM, BAD } from '@/assets/constants/moods'
import { 
  TOO_SOON, 
  NOT_MET_GOALS, 
  NOT_ENJOYING, 
  GOING_WELL, 
  NO_PRACTICES 
} from '@/assets/constants/statuses'

export default {
  recent ({ recent: { unit, amount }, list }, { today }) {
    return list.filter(p => {
      const diff = dayjs(p.createdAt).diff(today, unit)
      return Math.abs(diff) <= amount
    })
  },

  recentGrouped({ recent: { unit, amount }, list }) {
    return [...Array(amount)].reduce((hsh, _, i) => {
      const day = dayjs().startOf(unit).subtract(i, unit)
      const key = day.format('YYYY-MM-DD')
      hsh[key] = list.filter(p => 
        dayjs(p.createdAt).startOf('day').isSame(day))

      return hsh
    }, {})
  },

  tooSoon (s, { recentGrouped }) {
    return Object.values(recentGrouped).some(g => g.length === 0)
  },

  metGoals ({ recent: { amount, perUnit } }, { recentGrouped }) {
    const successful = Object.values(recentGrouped)
      .reduce((total, group) => group.length >= perUnit ? total + 1 : total, 0)

    if (successful >= amount) return GOOD
    if (successful >= amount * 0.6) return MEDIUM
    return BAD
  },

  recentMood (s, { recent }) {
    const counts = { [GOOD]: 0, [MEDIUM]: 0, [BAD]: 0 }
    recent.forEach(p => counts[p.type] += 1)

    if (counts[BAD] / recent.length >= 0.9) return BAD
    if ((counts[MEDIUM] + counts[BAD]) / recent.length >= 0.7) return MEDIUM
    return GOOD
  },

  mood ({ list }, { tooSoon, metGoals, recentMood }) {
    if (list.length <= 3) return { mood: GOOD, status: NO_PRACTICES }
    if (tooSoon) return { mood: GOOD, status: TOO_SOON }
    if (metGoals !== GOOD) return { mood: metGoals, status: NOT_MET_GOALS }
    if (recentMood !== GOOD) return { mood: recentMood, status: NOT_ENJOYING }
    return { mood: GOOD, status: GOING_WELL }
  }
}
