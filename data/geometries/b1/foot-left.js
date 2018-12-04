import {
  FOOT_HEIGHT,
  FOOT_WIDTH,
  FOOT_DEPTH,
  TOES_HEIGHT,
  TOES_WIDTH,
  TOES_DEPTH
} from '../../skeletons/human-constants'

export default {
  id: 'b1-foot-left',
  sl: 'h', // human skeleton
  b: ['FL', 'TL'], // geometry bones
  v: [
    {
      id: 'back-top-left',
      x: (-FOOT_WIDTH / 2) * 0.9,
      y: 0,
      z: -(FOOT_DEPTH / 2) * 0.7,
      mi: 'back-top-right',
      sl: [{ i: 0, w: 1 }],
      n: { x: -1 }
    },
    {
      id: 'back-bottom-left',
      x: -FOOT_WIDTH / 2,
      y: -FOOT_HEIGHT,
      z: (-FOOT_DEPTH / 2),
      mi: 'back-bottom-right',
      sl: [{ i: 0, w: 1 }],
      n: { x: -1 }
    },
    {
      id: 'mid-back-top-left',
      x: -FOOT_WIDTH / 2,
      y: 0,
      z: (FOOT_DEPTH / 2) * 0.6,
      mi: 'mid-back-top-right',
      sl: [{ i: 0, w: 1 }],
      n: { x: -1 }
    },
    {
      id: 'mid-back-bottom-left',
      x: (-FOOT_WIDTH / 2) * 1.1,
      y: -FOOT_HEIGHT,
      z: 0,
      mi: 'mid-back-bottom-right',
      sl: [{ i: 0, w: 1 }],
      n: { x: -1 }
    },
    {
      id: 'mid-front-top-left',
      x: -(FOOT_WIDTH / 2) * 1.2,
      y: -FOOT_HEIGHT + (TOES_HEIGHT * 2),
      z: (FOOT_DEPTH / 2),
      mi: 'mid-front-top-right',
      sl: [{ i: 0, w: 1 }, { i: 1, w: 0.5 }],
      n: { x: -1 }
    },
    {
      id: 'mid-front-bottom-left',
      x: -(FOOT_WIDTH / 2) * 1.2,
      y: -FOOT_HEIGHT,
      z: (FOOT_DEPTH / 2),
      mi: 'mid-front-bottom-right',
      sl: [{ i: 0, w: 1 }, { i: 1, w: 0 }],
      n: { x: -1 }
    },
    {
      id: 'front-top-left',
      x: -TOES_WIDTH / 2,
      y: -FOOT_HEIGHT + TOES_HEIGHT,
      z: (FOOT_DEPTH / 2) + TOES_DEPTH,
      mi: 'front-top-right',
      sl: [{ i: 0, w: 1 }, { i: 1, w: 1 }],
      n: { x: -1, z: 1 }
    },
    {
      id: 'front-bottom-left',
      x: -TOES_WIDTH / 2,
      y: -FOOT_HEIGHT,
      z: (FOOT_DEPTH / 2) + TOES_DEPTH,
      mi: 'front-bottom-right',
      sl: [{ i: 0, w: 1 }, { i: 1, w: 1 }],
      n: { x: -1, z: 1 }
    }
  ],
  f: [
    { id: 'top-1', a: 'back-top-left', b: 'mid-back-top-left', c: 'mid-back-top-right', n: { a: { x: 0, y: 1, z: 0 }, b: { x: 0, y: 1, z: 0 }, c: { x: 0, y: 1, z: 0 } } },
    { id: 'top-2', a: 'back-top-left', b: 'mid-back-top-right', c: 'back-top-right', n: { a: { x: 0, y: 1, z: 0 }, b: { x: 0, y: 1, z: 0 }, c: { x: 0, y: 1, z: 0 } } },
    { id: 'top-3', a: 'mid-back-top-left', b: 'mid-front-top-left', c: 'mid-front-top-right', n: { a: { x: 0, y: 1, z: 0 }, b: { x: 0, y: 1, z: 0 }, c: { x: 0, y: 1, z: 0 } } },
    { id: 'top-4', a: 'mid-back-top-left', b: 'mid-front-top-right', c: 'mid-back-top-right', n: { a: { x: 0, y: 1, z: 0 }, b: { x: 0, y: 1, z: 0 }, c: { x: 0, y: 1, z: 0 } } },
    { id: 'top-5', a: 'mid-front-top-left', b: 'front-top-left', c: 'front-top-right', n: { a: { x: 0, y: 1, z: 0 }, b: { x: 0, y: 1, z: 0 }, c: { x: 0, y: 1, z: 0 } } },
    { id: 'top-6', a: 'mid-front-top-left', b: 'front-top-right', c: 'mid-front-top-right', n: { a: { x: 0, y: 1, z: 0 }, b: { x: 0, y: 1, z: 0 }, c: { x: 0, y: 1, z: 0 } } },

    { id: 'front-1', a: 'front-top-left', b: 'front-bottom-left', c: 'front-bottom-right' },
    { id: 'front-2', a: 'front-top-left', b: 'front-bottom-right', c: 'front-top-right' },

    { id: 'back-1', a: 'back-top-left', b: 'back-top-right', c: 'back-bottom-right' },
    { id: 'back-2', a: 'back-top-left', b: 'back-bottom-right', c: 'back-bottom-left' },

    { id: 'left-1', a: 'back-top-left', b: 'back-bottom-left', c: 'mid-back-top-left', mi: 'right-1' },
    { id: 'left-2', b: 'back-bottom-left', a: 'mid-back-top-left', c: 'mid-front-top-left', mi: 'right-2' },
    { id: 'left-3', b: 'back-bottom-left', a: 'mid-front-top-left', c: 'mid-front-bottom-left', mi: 'right-3' },
    { id: 'left-4', b: 'mid-front-top-left', a: 'front-bottom-left', c: 'mid-front-bottom-left', mi: 'right-4' },
    { id: 'left-5', b: 'mid-front-top-left', a: 'front-top-left', c: 'front-bottom-left', mi: 'right-5' },

    { id: 'sole-1', a: 'mid-back-bottom-left', b: 'back-bottom-left', c: 'back-bottom-right', n: { a: { x: 0, y: -1, z: 0 }, b: { x: 0, y: -1, z: 0 }, c: { x: 0, y: -1, z: 0 } } },
    { id: 'sole-2', a: 'mid-back-bottom-left', b: 'back-bottom-right', c: 'mid-back-bottom-right', n: { a: { x: 0, y: -1, z: 0 }, b: { x: 0, y: -1, z: 0 }, c: { x: 0, y: -1, z: 0 } } },
    { id: 'sole-3', a: 'mid-front-bottom-left', b: 'mid-back-bottom-left', c: 'mid-back-bottom-right', n: { a: { x: 0, y: -1, z: 0 }, b: { x: 0, y: -1, z: 0 }, c: { x: 0, y: -1, z: 0 } } },
    { id: 'sole-4', a: 'mid-front-bottom-left', b: 'mid-back-bottom-right', c: 'mid-front-bottom-right', n: { a: { x: 0, y: -1, z: 0 }, b: { x: 0, y: -1, z: 0 }, c: { x: 0, y: -1, z: 0 } } },
    { id: 'sole-5', a: 'front-bottom-left', b: 'mid-front-bottom-left', c: 'mid-front-bottom-right', n: { a: { x: 0, y: -1, z: 0 }, b: { x: 0, y: -1, z: 0 }, c: { x: 0, y: -1, z: 0 } } },
    { id: 'sole-6', a: 'front-bottom-left', b: 'mid-front-bottom-right', c: 'front-bottom-right', n: { a: { x: 0, y: -1, z: 0 }, b: { x: 0, y: -1, z: 0 }, c: { x: 0, y: -1, z: 0 } } }
  ]
}
