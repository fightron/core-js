var WIDTH = 15;
var HEIGHT = 5;
var DEPTH = 6;
var GUTTER = 2;
var ZERO = 0.01; // above ground level
var D90 = Math.PI / 2; // 90 degrees
var C1 = '#AAAAAA';
var C2 = '#666666';

var trainingCube = {
  id: 'training-cube',
  n: 'Training Cube',
  p: [
    {
      id: 'r', rT: 'p'
      // r: {x: Math.PI/14}
    },
    {
      id: 'cube',
      par: 'r',
      rT: 'g',
      rI: 'inverse',
      rs: true,
      s: { x: WIDTH, y: HEIGHT, z: DEPTH },
      p: { y: HEIGHT },
      c: '#888888'
    },

    // { id: 'line-wall-1', par: 'r', rT: 'w', s: { x: 4 }, p: { y: 5 }, r: { z: D90, y: D90 }, c: C1 },

    // ground
    { id: 'l1', par: 'r', rT: 'w', s: { x: WIDTH }, p: { y: ZERO }, c: C1 },
    { id: 'l2', par: 'r', rT: 'w', s: { x: DEPTH }, p: { y: ZERO }, r: { y: D90 }, c: C1 },
    { id: 'l3', par: 'r', rT: 'w', s: { x: WIDTH - GUTTER }, p: { y: ZERO, z: -DEPTH + GUTTER }, c: C1 },
    { id: 'l4', par: 'r', rT: 'w', s: { x: WIDTH - GUTTER }, p: { y: ZERO, z: DEPTH - GUTTER }, c: C1 },
    { id: 'l5', par: 'r', rT: 'w', s: { x: DEPTH - GUTTER }, p: { y: ZERO, x: -WIDTH + GUTTER }, r: { y: D90 }, c: C1 },
    { id: 'l6', par: 'r', rT: 'w', s: { x: DEPTH - GUTTER }, p: { y: ZERO, x: WIDTH - GUTTER }, r: { y: D90 }, c: C1 },

    // borders
    { id: 'b1', par: 'r', rT: 'w', s: { x: WIDTH }, p: { y: ZERO, z: -DEPTH + ZERO * 1.1 }, c: 'white' },
    { id: 'b2', par: 'r', rT: 'w', s: { x: WIDTH }, p: { y: ZERO, z: DEPTH - ZERO }, c: 'white' },
    { id: 'b1', par: 'r', rT: 'w', s: { x: WIDTH }, p: { y: (HEIGHT * 2) - ZERO, z: -DEPTH + ZERO }, c: 'white' },
    { id: 'b2', par: 'r', rT: 'w', s: { x: WIDTH }, p: { y: (HEIGHT * 2) - ZERO, z: DEPTH - ZERO }, c: 'white' },

    { id: 'b3', par: 'r', rT: 'w', s: { x: DEPTH }, p: { y: ZERO, x: -WIDTH + ZERO }, r: { y: D90 }, c: 'white' },
    { id: 'b4', par: 'r', rT: 'w', s: { x: DEPTH }, p: { y: ZERO, x: WIDTH - ZERO }, r: { y: D90 }, c: 'white' },
    { id: 'b3', par: 'r', rT: 'w', s: { x: DEPTH }, p: { y: (HEIGHT * 2) - ZERO, x: -WIDTH + ZERO }, r: { y: D90 }, c: 'white' },
    { id: 'b4', par: 'r', rT: 'w', s: { x: DEPTH }, p: { y: (HEIGHT * 2) - ZERO, x: WIDTH - ZERO }, r: { y: D90 }, c: 'white' },

    { id: 'b5', par: 'r', rT: 'w', s: { x: HEIGHT }, p: { y: HEIGHT, z: -DEPTH + ZERO, x: -WIDTH + ZERO }, r: { y: D90, x: D90 }, c: 'white' },
    { id: 'b6', par: 'r', rT: 'w', s: { x: HEIGHT }, p: { y: HEIGHT, z: -DEPTH + ZERO, x: WIDTH - ZERO }, r: { y: D90, x: D90 }, c: 'white' },
    { id: 'b7', par: 'r', rT: 'w', s: { x: HEIGHT }, p: { y: HEIGHT, z: DEPTH - ZERO, x: -WIDTH + ZERO }, r: { y: D90, x: D90 }, c: 'white' },
    { id: 'b7', par: 'r', rT: 'w', s: { x: HEIGHT }, p: { y: HEIGHT, z: DEPTH - ZERO, x: WIDTH - ZERO }, r: { y: D90, x: D90 }, c: 'white' }

  ]
};

// ground grid
var i;
for (i = 1; i < HEIGHT - 1; ++i) {
  trainingCube.p.push({
    id: `g${i}`, par: 'r', rT: 'w', s: { x: WIDTH - GUTTER }, p: { y: ZERO / 2, z: i }, c: C2
  });
  trainingCube.p.push({
    id: `g${i}`, par: 'r', rT: 'w', s: { x: WIDTH - GUTTER }, p: { y: ZERO / 2, z: -i }, c: C2
  });
}
for (i = 1; i < WIDTH - GUTTER; ++i) {
  trainingCube.p.push({
    id: `g${i}`, par: 'r', rT: 'w', s: { x: DEPTH - GUTTER }, p: { y: ZERO / 2, x: i }, r: { y: D90 }, c: C2
  });
  trainingCube.p.push({
    id: `g${i}`, par: 'r', rT: 'w', s: { x: DEPTH - GUTTER }, p: { y: ZERO / 2, x: -i }, r: { y: D90 }, c: C2
  });
}

export default trainingCube;
