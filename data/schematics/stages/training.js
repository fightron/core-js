var building = {
  id: 'building1',
  par: 'root',
  rT: 'g',
  rI: 'box',
  cs: true,
  rs: true,
  o: true,
  s: { x: 0.28, y: 2.3, z: 0.28 },
  r: { y: Math.PI / 4 },
  c: 'silver'
}

export default {
  id: 'training-stage',
  n: 'Training Stage',
  p: [
    {
      id: 'root',
      rT: 'p'
    },
    {
      id: 'floor',
      par: 'root',
      rT: 'g',
      rI: 'box',
      cs: false,
      rs: true,
      o: true,
      s: { x: 10, y: 0.000001, z: 20 },
      // p: { y: -0.20 },
      c: 'gray'
    },
    Object.assign({}, building, { id: 'building05', p: { x: -5, y: 2.4, z: -6 } }),
    Object.assign({}, building, { id: 'building10', p: { x: -4, y: 2.4, z: -6 } }),
    Object.assign({}, building, { id: 'building15', p: { x: -3, y: 2.4, z: -6 } }),
    Object.assign({}, building, { id: 'building20', p: { x: -2, y: 2.4, z: -6 } }),
    Object.assign({}, building, { id: 'building25', p: { x: -1, y: 2.4, z: -6 } }),
    Object.assign({}, building, { id: 'building30', p: { x: 0, y: 2.4, z: -6 } }),
    Object.assign({}, building, { id: 'building35', p: { x: 1, y: 2.4, z: -6 } }),
    Object.assign({}, building, { id: 'building40', p: { x: 2, y: 2.4, z: -6 } }),
    Object.assign({}, building, { id: 'building45', p: { x: 3, y: 2.4, z: -6 } }),
    Object.assign({}, building, { id: 'building50', p: { x: 4, y: 2.4, z: -6 } }),
    Object.assign({}, building, { id: 'building55', p: { x: 5, y: 2.4, z: -6 } })
  ]
}
