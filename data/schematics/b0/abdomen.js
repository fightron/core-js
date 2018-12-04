import {
  ABDOMEN_HEIGHT,
  ABDOMEN_WIDTH,
  ABDOMEN_DEPTH
} from '../../skeletons/human-constants'

export default {
  id: 'b0-abdomen',
  name: 'B0 - Abdomen',
  p: [
    {
      id: '0',
      rT: 'g',
      rI: 'box',
      cs: true,
      rs: true,
      o: true,
      s: {
        x: ABDOMEN_WIDTH / 2,
        y: ABDOMEN_HEIGHT / 2,
        z: ABDOMEN_DEPTH / 2
      },
      p: {
        y: ABDOMEN_HEIGHT / 2
      },
      c: 'cyan'
    }
  ]
}
