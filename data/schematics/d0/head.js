import {
  HEAD_HEIGHT,
  HEAD_DEPTH
} from '../../skeletons/human-constants';

export default {
  id: 'd0-head',
  name: 'D0 - Head',
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
        x: HEAD_HEIGHT / 2.1,
        y: HEAD_HEIGHT / 2.1,
        z: HEAD_DEPTH / 2
      },
      p: {
        y: (HEAD_HEIGHT / 2) - 0.02,
        z: HEAD_DEPTH / 8
      },
      r: {
        z: Math.PI / 4
      }
    },
    {
      id: 'e1',
      par: '0',
      rT: 'g',
      rI: 'box',
      cs: true,
      rs: true,
      o: true,
      s: {
        x: 0.02,
        y: 0.06,
        z: 0.06
      },
      // r: {
      //   z: Math.PI / 4
      // },
      p: {
        x: 0.14
      }
    },
    {
      id: 'e2',
      par: '0',
      rT: 'g',
      rI: 'box',
      cs: true,
      rs: true,
      o: true,
      s: {
        x: 0.06,
        y: 0.02,
        z: 0.06
      },
      p: {
        y: 0.14
      }
    }
  ]
};
