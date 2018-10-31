import {
  RING_MID_HEIGHT,
  RING_WIDTH,
  RING_DEPTH
} from '../../skeletons/human-constants'

export default {
  id: 'b0-ring-mid',
  name: 'B0 - Ring (Mid)',
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
        y: RING_MID_HEIGHT / 2,
        z: RING_DEPTH / 2
      },
      p: {
        x: RING_WIDTH / 2,
        y: -RING_MID_HEIGHT / 2
      },
      c: 'yellow'
    }
  ]
}
