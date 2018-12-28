import {
  HIP_HEIGHT,
  HIP_WIDTH,
  HIP_DEPTH
} from '../../skeletons/human-constants'

export default {
  id: 'd0-hip',
  name: 'D0 - Hip',
  c: 'lime',
  p: [
    {
      id: '0',
      rT: 'g',
      rI: 'box',
      cs: true,
      rs: true,
      o: true,
      s: {
        x: HIP_WIDTH / 2.9,
        y: HIP_WIDTH / 2.9,
        z: HIP_DEPTH / 1.6
      },
      p: {
        y: -HIP_HEIGHT / 2,
        z: -0.025
      },
      r: {
        z: Math.PI / 4
      }
    },
    {
      id: '1',
      par: '0',
      rT: 'g',
      rI: 'box',
      cs: true,
      rs: true,
      o: true,
      s: {
        x: 0.02,
        y: 0.3,
        z: 0.07
      },
      p: {
        x: 0.1,
        y: -0.2
      }
    },
    {
      id: '2',
      par: '0',
      rT: 'g',
      rI: 'box',
      cs: true,
      rs: true,
      o: true,
      s: {
        x: 0.02,
        y: 0.3,
        z: 0.07
      },
      p: {
        x: -0.2,
        y: 0.1
      },
      r: {
        z: Math.PI / 2
      }
    }
  ]
}
