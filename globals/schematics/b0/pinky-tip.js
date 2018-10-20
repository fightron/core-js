import {
  PINKY_TIP_HEIGHT,
  PINKY_WIDTH,
  PINKY_DEPTH
} from '../../skeletons/human-constants'

export default {
  id: 'b0-pinky-tip',
  name: 'B0 - Pinky (Tip)',
  p: [
    {
      id: '0',
      rT: 'g',
      rI: 'box',
      cs: true,
      rs: true,
      o: true,
      s: {
        x: PINKY_WIDTH / 2,
        y: PINKY_TIP_HEIGHT / 2,
        z: PINKY_DEPTH / 2
      },
      p: {
        x: PINKY_WIDTH / 2,
        y: -PINKY_TIP_HEIGHT / 2
      }
    }
  ]
}
