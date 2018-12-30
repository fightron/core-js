import universal from './universal'

var inverse = JSON.parse(JSON.stringify(universal))

inverse.id = 'inverse'

// invert all faces so they render from the inside
for (var face of inverse.f) {
  [face.a, face.b] = [face.b, face.a]
}

export default inverse
