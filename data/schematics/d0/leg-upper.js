import {
  LEG_UPPER_HEIGHT,
  LEG_UPPER_WIDTH,
  LEG_UPPER_DEPTH
} from '../../skeletons/human-constants';

export default {
  id: 'd0-leg-upper',
  name: 'D0 - Leg (Upper)',
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
        x: LEG_UPPER_WIDTH / 1.7,
        y: LEG_UPPER_HEIGHT / 2,
        z: LEG_UPPER_DEPTH / 1.7
      },
      p: {
        y: -LEG_UPPER_HEIGHT / 2
      },
      r: {
        y: Math.PI / 4
      }
    }
  ]
};
