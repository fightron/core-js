import {
  FOOT_HEIGHT,
  FOOT_WIDTH,
  FOOT_DEPTH
} from '../../skeletons/human-constants';

export default {
  id: 'b0-foot',
  name: 'B0 - Foot',
  c: 'yellow',
  p: [
    {
      id: '0',
      rT: 'g',
      rI: 'box',
      cs: true,
      rs: true,
      o: true,
      s: {
        x: FOOT_WIDTH / 2,
        y: FOOT_HEIGHT / 4,
        z: (FOOT_DEPTH / 2) + (FOOT_DEPTH / 4)
      },
      p: {
        y: (-FOOT_HEIGHT) + (FOOT_HEIGHT / 4),
        z: (FOOT_DEPTH / 4)
      }
    }
  ]
};
