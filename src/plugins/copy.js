import Vue from 'nativescript-vue'
import {
  TOO_SOON,
  NOT_MET_GOALS,
  NOT_ENJOYING,
  GOING_WELL,
  NO_PRACTICES
} from '@/assets/constants/statuses'

const copy = {
  [TOO_SOON]: 'Too Soon',
  [NOT_MET_GOALS]: 'Not Met Goals',
  [NOT_ENJOYING]: 'Not Enjoying',
  [GOING_WELL]: 'Going Well',
  [NO_PRACTICES]: 'No Practices'
}

Vue.mixin({
  filters: {
    t (key, scope) {
      return (scope ? copy[scope] : copy)[key]
    }
  }
})
