import {
  MIDDLE_BASE_HEIGHT,
  MIDDLE_WIDTH,
  MIDDLE_DEPTH
} from '../../skeletons/human-constants'

export default {
  id: 'b0-middle-base',
  name: 'B0 - Middle (Base)',
  p: [
    {
      id: '0',
      rT: 'g',
      rI: 'box',
      cs: true,
      rs: true,
      o: true,
      s: {
        x: MIDDLE_WIDTH / 2,
        y: MIDDLE_BASE_HEIGHT / 2,
        z: MIDDLE_DEPTH / 2
      },
      p: {
        x: MIDDLE_WIDTH / 2,
        y: -MIDDLE_BASE_HEIGHT / 2
      }
    }
  ]
}
