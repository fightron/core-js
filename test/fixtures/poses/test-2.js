import armsPulledBack from './partials/arms-pulled-back'
import lowerStraight from './partials/lower-straight'
import handFistLeft from './partials/hand-fist-left'
import handFistRight from './partials/hand-fist-right'

export default {
  id: 'test-2',
  sl: 'h',
  r: [
    ...lowerStraight,
    ...armsPulledBack,
    ...handFistLeft,
    ...handFistRight,
    { id: 'S', y: 0.2 },
    { id: 'N', y: 0.1, x: 0.2 },
    { id: 'H', y: 0.1, x: -0.1 }
  ]
}
