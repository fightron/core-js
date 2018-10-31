import {
  MIDDLE_TIP_HEIGHT,
  MIDDLE_WIDTH,
  MIDDLE_DEPTH
} from '../../skeletons/human-constants'

export default {
  id: 'b0-middle-tip',
  name: 'B0 - Middle (Tip)',
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
        y: MIDDLE_TIP_HEIGHT / 2,
        z: MIDDLE_DEPTH / 2
      },
      p: {
        x: MIDDLE_WIDTH / 2,
        y: -MIDDLE_TIP_HEIGHT / 2
      },
      c: 'yellow'
    }
  ]
}
