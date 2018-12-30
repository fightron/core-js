import {
  STOMACH_HEIGHT,
  STOMACH_WIDTH,
  STOMACH_DEPTH
} from '../../skeletons/human-constants'

export default {
  id: 'd0-stomach',
  name: 'D0 - Stomach',
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
        x: STOMACH_WIDTH / 2.9,
        y: STOMACH_HEIGHT / 2,
        z: STOMACH_DEPTH / 2
      },
      p: {
        y: STOMACH_HEIGHT / 2
      }
    }
  ]
}