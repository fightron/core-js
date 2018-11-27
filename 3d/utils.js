function flipGeometry (geometry) {
  var vertices = geometry.v
  if (vertices) {
    for (var vertex of vertices) {
      flipVertex(vertex)
    }
  }
  var faces = geometry.f
  if (faces) {
    for (var face of faces) {
      flipFace(face)
    }
  }
}

function flipVertex (vertex) {
  vertex.x = -vertex.x
  var normals = vertex.n
  if (normals && normals.x) {
    normals.x = -normals.x
  }
}

function flipFace (face) {
  var temp = face.a
  face.a = face.b
  face.b = temp
}

export { flipGeometry }
