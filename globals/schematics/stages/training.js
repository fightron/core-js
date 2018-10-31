var building = {
  id: 'building1',
  par: 'root',
  rT: 'g',
  rI: 'box',
  cs: true,
  rs: true,
  o: true,
  s: { x: 40, y: 300, z: 200 },
  p: { x: -400, y: 295.7, z: -600 },
  c: 'silver'
}

export default {
  id: 'training-stage',
  n: 'Training Stage',
  p: [
    {
      id: 'root',
      rT: 'p',
      s: { x: 1, y: 1, z: 1 }
    },
    {
      id: 'floor',
      par: 'root',
      rT: 'g',
      rI: 'box',
      cs: true,
      rs: true,
      o: true,
      s: { x: 450, y: 5, z: 250 },
      p: { y: -5.7 },
      c: 'silver'
    },
    {
      id: 'subfloor',
      par: 'root',
      rT: 'g',
      rI: 'box',
      cs: false,
      rs: true,
      o: true,
      s: { x: 1000, y: 10, z: 2000 },
      p: { y: -15.7 },
      c: 'gray'
    },
    Object.assign({}, building, { id: 'building1', p: { x: -400, y: 295.7, z: -600 } }),
    Object.assign({}, building, { id: 'building2', p: { x: -200, y: 295.7, z: -600 } }),
    Object.assign({}, building, { id: 'building3', p: { x: 0, y: 295.7, z: -600 } }),
    Object.assign({}, building, { id: 'building4', p: { x: 200, y: 295.7, z: -600 } }),
    Object.assign({}, building, { id: 'building5', p: { x: 400, y: 295.7, z: -600 } })
  ]
}
