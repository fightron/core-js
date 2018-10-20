import {
  RING_BASE_HEIGHT,
  RING_WIDTH,
  RING_DEPTH
} from '../../skeletons/human-constants'

export default {
  id: 'b0-ring-base',
  name: 'B0 - Ring (Base)',
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
        y: RING_BASE_HEIGHT / 2,
        z: RING_DEPTH / 2
      },
      p: {
        x: RING_WIDTH / 2,
        y: -RING_BASE_HEIGHT / 2
      }
    }
  ]
}
