import {
  ARM_LOWER_HEIGHT,
  ARM_LOWER_WIDTH,
  ARM_LOWER_DEPTH
} from '../../skeletons/human-constants'

export default {
  id: 'b0-arm-lower-right',
  name: 'B0 - Arm (Lower, Right)',
  p: [
    {
      id: '0',
      rT: 'g',
      rI: 'box',
      cs: true,
      rs: true,
      o: true,
      s: {
        x: ARM_LOWER_WIDTH / 2,
        y: ARM_LOWER_HEIGHT / 2,
        z: ARM_LOWER_DEPTH / 2
      },
      p: {
        y: -ARM_LOWER_HEIGHT / 2
      }
    }
  ]
}
