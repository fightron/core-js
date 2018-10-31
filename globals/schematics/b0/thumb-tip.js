import {
  THUMB_TIP_HEIGHT,
  THUMB_WIDTH,
  THUMB_DEPTH
} from '../../skeletons/human-constants'

export default {
  id: 'b0-thumb-tip',
  name: 'B0 - Thumb (Tip)',
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
        y: THUMB_TIP_HEIGHT / 2,
        z: THUMB_DEPTH / 2
      },
      p: {
        y: -THUMB_TIP_HEIGHT / 2
      },
      c: 'yellow'
    }
  ]
}
