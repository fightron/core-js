import {
  SHOULDER_HEIGHT,
  SHOULDER_WIDTH,
  SHOULDER_DEPTH
} from '../../skeletons/human-constants'

export default {
  id: 'd0-shoulder-left',
  name: 'D0 - Shoulder (Left)',
  c: 'cyan',
  p: [
    {
      id: '0',
      rT: 'g',
      rI: 'box',
      cs: true,
      rs: true,
      o: true,
      s: {
        x: SHOULDER_WIDTH / 1.6,
        y: SHOULDER_HEIGHT / 1.6,
        z: SHOULDER_DEPTH / 1.6
      },
      p: {
        x: SHOULDER_WIDTH / 2
      },
      r: {
        z: Math.PI / 4
      }
    }
  ]
}
