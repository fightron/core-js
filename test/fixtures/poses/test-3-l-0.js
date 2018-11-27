import armsPulledBack from './partials/arms-pulled-back'
import upperBoxing from './partials/upper-boxing'
import lowerNormalL0 from './partials/lower-normal-l-0'
// import lowerNormalU0 from './partials/lower-normal-u-0'
import handsRested from './partials/hands-rested'

export default {
  id: 'test-3-l-0',
  sl: 'h',
  r: [
    ...lowerNormalL0,
    ...armsPulledBack,
    ...handsRested,
    ...upperBoxing
  ]
}
