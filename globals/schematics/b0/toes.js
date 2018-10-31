import {
  TOES_HEIGHT,
  TOES_WIDTH,
  TOES_DEPTH
} from '../../skeletons/human-constants'

export default {
  id: 'b0-toes',
  name: 'B0 - Toes',
  p: [
    {
      id: '0',
      rT: 'g',
      rI: 'box',
      cs: true,
      rs: true,
      o: true,
      s: {
        x: TOES_WIDTH / 2,
        y: TOES_HEIGHT / 2,
        z: TOES_DEPTH / 2
      },
      p: {
        y: TOES_HEIGHT / 2,
        z: TOES_DEPTH / 4
      },
      c: 'yellow'
    }
  ]
}
