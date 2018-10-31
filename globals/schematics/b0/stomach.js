import {
  STOMACH_HEIGHT,
  STOMACH_WIDTH,
  STOMACH_DEPTH
} from '../../skeletons/human-constants'

export default {
  id: 'b0-stomach',
  name: 'B0 - Stomach',
  p: [
    {
      id: '0',
      rT: 'g',
      rI: 'box',
      cs: true,
      rs: true,
      o: true,
      s: {
        x: STOMACH_WIDTH / 2,
        y: STOMACH_HEIGHT / 2,
        z: STOMACH_DEPTH / 2
      },
      p: {
        y: STOMACH_HEIGHT / 2
      },
      c: 'magenta'
    }
  ]
}
