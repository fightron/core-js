import {
  HIP_HEIGHT,
  HIP_WIDTH,
  HIP_DEPTH
} from '../../skeletons/human-constants'

export default {
  id: 'b0-hip',
  name: 'B0 - Hip',
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
        x: HIP_WIDTH / 2,
        y: HIP_HEIGHT / 2,
        z: HIP_DEPTH / 2
      },
      p: {
        y: -HIP_HEIGHT / 2
      }
    }
  ]
}
