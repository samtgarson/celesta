import { Factory } from 'rosie'
import uuid from '@/assets/helpers/uuid'
import { random, name } from 'faker'
import instruments from '@/components/new-instrument/instruments'

export default new Factory()
  .attrs({
    id: () => uuid(),
    createdAt: () => new Date(),
    type: () => random.arrayElement(instruments),
    name: () => name.firstName()
  })
