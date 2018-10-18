import {
  NECK_HEIGHT,
  NECK_WIDTH,
  NECK_DEPTH
} from '../../skeletons/human-constants'

export default {
  id: 'b0-neck',
  name: 'B0 - Neck',
  p: [
    {
      id: '0',
      rT: 'g',
      rI: 'box',
      cs: true,
      rs: true,
      o: true,
      s: {
        x: NECK_WIDTH / 2,
        y: NECK_HEIGHT / 2,
        z: NECK_DEPTH / 2
      },
      p: {
        y: NECK_HEIGHT / 2
      }
    }
  ]
}
