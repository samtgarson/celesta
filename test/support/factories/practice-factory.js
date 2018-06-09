import { Factory } from 'rosie'
import uuid from '@/assets/helpers/uuid'
import { random } from 'faker'
import * as Types from '@/assets/constants/practice-types'
import { GOOD, MEDIUM, BAD } from '@/assets/constants/moods'
import dayjs from 'dayjs'

const types = Object.keys(Types)

export default new Factory()
  .option('daysInPast', 0)
  .attr('createdAt', ['daysInPast'], daysInPast => {
    const date = dayjs().subtract(daysInPast, 'day')
    return new Date(date.format('YYYY-MM-DDTHH:mm:ss'))
  })
  .attrs({
    id: () => uuid(),
    type: () => random.arrayElement(types),
    mood: () => random.arrayElement([GOOD, MEDIUM, BAD])
  })
