import {
  LEG_UPPER_HEIGHT,
  LEG_UPPER_WIDTH,
  LEG_UPPER_DEPTH
} from '../../skeletons/human-constants'

export default {
  id: 'b0-leg-upper',
  name: 'B0 - Leg (Upper)',
  c: 'blue',
  p: [
    {
      id: '0',
      rT: 'g',
      rI: 'box',
      cs: true,
      rs: true,
      o: true,
      s: {
        x: LEG_UPPER_WIDTH / 2,
        y: LEG_UPPER_HEIGHT / 2,
        z: LEG_UPPER_DEPTH / 2
      },
      p: {
        y: -LEG_UPPER_HEIGHT / 2
      }
    }
  ]
}
