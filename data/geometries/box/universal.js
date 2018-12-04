export default {
  id: 'box',
  v: [
    { id: 'front-top-left', x: -1, y: 1, z: 1, mi: 'front-top-right' },
    { id: 'front-bottom-left', x: -1, y: -1, z: 1, mi: 'front-bottom-right' },
    { id: 'back-top-left', x: -1, y: 1, z: -1, mi: 'back-top-right' },
    { id: 'back-bottom-left', x: -1, y: -1, z: -1, mi: 'back-bottom-right' }
  ],
  f: [
    { id: 'front-1', a: 'front-top-left', b: 'front-bottom-right', c: 'front-top-right' },
    { id: 'front-2', a: 'front-bottom-left', b: 'front-bottom-right', c: 'front-top-left' },
    { id: 'back-1', a: 'back-top-left', b: 'back-top-right', c: 'back-bottom-right' },
    { id: 'back-2', a: 'back-bottom-right', b: 'back-bottom-left', c: 'back-top-left' },
    { id: 'left-1', a: 'front-top-left', b: 'back-top-left', c: 'front-bottom-left' },
    { id: 'left-2', a: 'front-bottom-left', b: 'back-top-left', c: 'back-bottom-left' },
    { id: 'right-1', a: 'front-top-right', b: 'front-bottom-right', c: 'back-top-right' },
    { id: 'right-2', a: 'front-bottom-right', b: 'back-bottom-right', c: 'back-top-right' },
    { id: 'top-1', a: 'front-top-left', b: 'front-top-right', c: 'back-top-right' },
    { id: 'top-2', a: 'back-top-right', b: 'back-top-left', c: 'front-top-left' },
    { id: 'bottom-1', a: 'front-bottom-left', b: 'back-bottom-left', c: 'front-bottom-right' },
    { id: 'bottom-2', a: 'back-bottom-left', b: 'back-bottom-right', c: 'front-bottom-right' }
  ],
  r: [
    { id: 'front', f: ['front-1', 'front-2'] },
    { id: 'back', f: ['back-1', 'back-2'] },
    { id: 'left', f: ['left-1', 'left-2'] },
    { id: 'right', f: ['right-1', 'right-2'] },
    { id: 'top', f: ['top-1', 'top-2'] },
    { id: 'bottom', f: ['bottom-1', 'bottom-2'] }
  ]
}
