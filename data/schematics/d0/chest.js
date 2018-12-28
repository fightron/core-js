import {
  CHEST_HEIGHT,
  CHEST_WIDTH,
  CHEST_DEPTH
} from '../../skeletons/human-constants'

export default {
  id: 'd0-chest',
  name: 'D0 - Chest',
  c: 'magenta',
  p: [
    {
      id: '0',
      rT: 'g',
      rI: 'box',
      cs: true,
      rs: true,
      o: true,
      s: {
        x: CHEST_WIDTH / 2.3,
        y: CHEST_HEIGHT / 1.5,
        z: CHEST_DEPTH / 2
      },
      p: {
        y: CHEST_HEIGHT / 2.4
      },
      r: {
        x: -0.5
      }
    }
  ]
}
