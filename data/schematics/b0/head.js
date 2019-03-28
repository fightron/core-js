import {
  HEAD_HEIGHT,
  HEAD_WIDTH,
  HEAD_DEPTH
} from '../../skeletons/human-constants';

export default {
  id: 'b0-head',
  name: 'B0 - Head',
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
        x: HEAD_WIDTH / 2,
        y: HEAD_HEIGHT / 2,
        z: HEAD_DEPTH / 2
      },
      p: {
        y: (HEAD_HEIGHT / 2) - 0.02,
        z: HEAD_DEPTH / 8
      }
    }
  ]
};
