import {
  PINKY_MID_HEIGHT,
  PINKY_WIDTH,
  PINKY_DEPTH
} from '../../skeletons/human-constants'

export default {
  id: 'b0-pinky-mid',
  name: 'B0 - Pinky (Mid)',
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
        y: PINKY_MID_HEIGHT / 2,
        z: PINKY_DEPTH / 2
      },
      p: {
        x: PINKY_WIDTH / 2,
        y: -PINKY_MID_HEIGHT / 2
      }
    }
  ]
}
