var building = {
  id: 'building1',
  par: 'root',
  rT: 'g',
  rI: 'box',
  cs: true,
  rs: true,
  o: true,
  s: { x: 28, y: 240, z: 28 },
  p: { x: -400, y: 295.7, z: -600 },
  r: { y: Math.PI / 4 },
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
    Object.assign({}, building, { id: 'building05', p: { x: -500, y: 235.7, z: -600 } }),
    Object.assign({}, building, { id: 'building10', p: { x: -400, y: 235.7, z: -600 } }),
    Object.assign({}, building, { id: 'building15', p: { x: -300, y: 235.7, z: -600 } }),
    Object.assign({}, building, { id: 'building20', p: { x: -200, y: 235.7, z: -600 } }),
    Object.assign({}, building, { id: 'building25', p: { x: -100, y: 235.7, z: -600 } }),
    Object.assign({}, building, { id: 'building30', p: { x: 0, y: 235.7, z: -600 } }),
    Object.assign({}, building, { id: 'building35', p: { x: 100, y: 235.7, z: -600 } }),
    Object.assign({}, building, { id: 'building40', p: { x: 200, y: 235.7, z: -600 } }),
    Object.assign({}, building, { id: 'building45', p: { x: 300, y: 235.7, z: -600 } }),
    Object.assign({}, building, { id: 'building50', p: { x: 400, y: 235.7, z: -600 } }),
    Object.assign({}, building, { id: 'building55', p: { x: 500, y: 235.7, z: -600 } })
  ]
}
