import {
  THUMB_BASE_HEIGHT,
  THUMB_WIDTH,
  THUMB_DEPTH
} from '../../skeletons/human-constants'

export default {
  id: 'b0-thumb-base-right',
  name: 'B0 - Thumb (Base, Right)',
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
        y: THUMB_BASE_HEIGHT / 2,
        z: THUMB_DEPTH / 2
      },
      p: {
        x: -THUMB_WIDTH / 2,
        y: -THUMB_BASE_HEIGHT / 2
      },
      c: 'yellow'
    }
  ]
}
