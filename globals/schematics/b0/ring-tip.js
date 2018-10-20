import {
  RING_TIP_HEIGHT,
  RING_WIDTH,
  RING_DEPTH
} from '../../skeletons/human-constants'

export default {
  id: 'b0-ring-tip',
  name: 'B0 - Ring (Tip)',
  p: [
    {
      id: '0',
      rT: 'g',
      rI: 'box',
      cs: true,
      rs: true,
      o: true,
      s: {
        x: RING_WIDTH / 2,
        y: RING_TIP_HEIGHT / 2,
        z: RING_DEPTH / 2
      },
      p: {
        x: RING_WIDTH / 2,
        y: -RING_TIP_HEIGHT / 2
      }
    }
  ]
}
