import {
  LEG_LOWER_HEIGHT,
  LEG_LOWER_WIDTH,
  LEG_LOWER_DEPTH
} from '../../skeletons/human-constants'

export default {
  id: 'd0-leg-lower',
  name: 'D0 - Leg (Lower)',
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
        x: LEG_LOWER_WIDTH / 1.9,
        y: LEG_LOWER_HEIGHT / 2,
        z: LEG_LOWER_DEPTH / 1.9
      },
      p: {
        y: -LEG_LOWER_HEIGHT / 2
      },
      r: {
        y: Math.PI / 4
      }
    }
  ]
}
