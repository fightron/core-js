import {
  CHEST_HEIGHT,
  CHEST_WIDTH,
  CHEST_DEPTH
} from '../../skeletons/human-constants';

export default {
  id: 'b0-chest',
  name: 'B0 - Chest',
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
        x: CHEST_WIDTH / 2,
        y: CHEST_HEIGHT / 2,
        z: CHEST_DEPTH / 2
      },
      p: {
        y: CHEST_HEIGHT / 2
      }
    }
  ]
};
