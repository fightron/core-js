import armsPulledBack from './partials/arms-pulled-back'
import upperBoxing from './partials/upper-boxing'
import lowerNormal from './partials/lower-normal'
import handsRested from './partials/hands-rested'

export default {
  id: 'test-3',
  sl: 'h',
  r: [
    ...lowerNormal,
    ...armsPulledBack,
    ...handsRested,
    ...upperBoxing
  ]
}
