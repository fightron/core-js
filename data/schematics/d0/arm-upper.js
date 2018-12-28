import {
  ARM_UPPER_HEIGHT,
  ARM_UPPER_WIDTH,
  ARM_UPPER_DEPTH
} from '../../skeletons/human-constants'

export default {
  id: 'd0-arm-upper',
  name: 'D0 - Arm (Upper)',
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
        x: ARM_UPPER_WIDTH / 2.5,
        y: ARM_UPPER_HEIGHT / 2,
        z: ARM_UPPER_DEPTH / 2.5
      },
      p: {
        y: -ARM_UPPER_HEIGHT / 2
      },
      r: {
        y: Math.PI / 4
      }
    }
  ]
}
