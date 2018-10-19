import {
  PALM_HEIGHT,
  PALM_WIDTH,
  PALM_DEPTH
} from '../../skeletons/human-constants'

export default {
  id: 'b0-palm-left',
  name: 'B0 - Palm (Left)',
  p: [
    {
      id: '0',
      rT: 'g',
      rI: 'box',
      cs: true,
      rs: true,
      o: true,
      s: {
        x: PALM_WIDTH / 2,
        y: PALM_HEIGHT / 2,
        z: PALM_DEPTH / 2
      },
      p: {
        y: -PALM_HEIGHT / 2
      }
    }
  ]
}
