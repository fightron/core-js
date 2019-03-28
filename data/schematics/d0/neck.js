import {
  NECK_HEIGHT,
  NECK_WIDTH,
  NECK_DEPTH
} from '../../skeletons/human-constants';

export default {
  id: 'd0-neck',
  name: 'D0 - Neck',
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
        x: NECK_WIDTH / 2.5,
        y: NECK_HEIGHT / 2,
        z: NECK_DEPTH / 2.5
      },
      p: {
        y: NECK_HEIGHT / 2
      },
      r: {
        y: Math.PI / 4
      }
    }
  ]
};
