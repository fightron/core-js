import {
  ARM_LOWER_HEIGHT,
  ARM_LOWER_WIDTH,
  ARM_LOWER_DEPTH
} from '../../skeletons/human-constants'

export default {
  id: 'd0-arm-lower',
  name: 'D0 - Arm (Lower)',
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
        x: ARM_LOWER_WIDTH / 2.5,
        y: ARM_LOWER_HEIGHT / 2,
        z: ARM_LOWER_DEPTH / 2.5
      },
      p: {
        y: -ARM_LOWER_HEIGHT / 2
      },
      r: {
        y: Math.PI / 4
      }
    }
  ]
}
