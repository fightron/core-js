import {
  THUMB_MID_HEIGHT,
  THUMB_WIDTH,
  THUMB_DEPTH
} from '../../skeletons/human-constants'

export default {
  id: 'b0-thumb-mid',
  name: 'B0 - Thumb (Mid)',
  p: [
    {
      id: '0',
      rT: 'g',
      rI: 'box',
      cs: true,
      rs: true,
      o: true,
      s: {
        x: THUMB_WIDTH / 2,
        y: THUMB_MID_HEIGHT / 2,
        z: THUMB_DEPTH / 2
      },
      p: {
        y: -THUMB_MID_HEIGHT / 2
      }
    }
  ]
}
