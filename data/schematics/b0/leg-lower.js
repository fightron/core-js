import {
  LEG_LOWER_HEIGHT,
  LEG_LOWER_WIDTH,
  LEG_LOWER_DEPTH
} from '../../skeletons/human-constants'

export default {
  id: 'b0-leg-lower',
  name: 'B0 - Leg (Lower)',
  c: 'cyan',
  p: [
    {
      id: '0',
      rT: 'g',
      rI: 'box',
      cs: true,
      rs: true,
      o: true,
      s: {
        x: LEG_LOWER_WIDTH / 2,
        y: LEG_LOWER_HEIGHT / 2,
        z: LEG_LOWER_DEPTH / 2
      },
      p: {
        y: -LEG_LOWER_HEIGHT / 2
      }
    }
  ]
}
