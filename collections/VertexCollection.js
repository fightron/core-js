import {ArrayCollection} from './ArrayCollection'
import {Vertex} from '../3d/Vertex'
import {Vector3} from '../3d/Vector3'

export class VertexCollection extends ArrayCollection {
  add (/* one Vertex */ data) {
    var vertex = new Vertex(data.x, data.y, data.z)
    vertex.id = data.id
    vertex.index = this.length
    var n = data.n
    if (n) {
      vertex.normal = new Vector3(n.x, n.y, n.z)
    }
    this.push(vertex)
    this.dictionary.set(vertex.id, vertex)
    var mirror = this.mirrorize(data.mi, vertex)
    if (mirror) {
      mirror.index = this.length
      this.push(mirror)
      this.dictionary.set(mirror.id, mirror)
    }
  }

  mirrorize (mirrorId, vertex) {
    if (!mirrorId || !vertex) {
      return null
    }
    var mirror = new Vertex(-vertex.x, vertex.y, vertex.z)
    vertex.mirror = mirror
    mirror.mirror = vertex
    mirror.id = mirrorId
    mirror.mirrored = true
    if (vertex.normal) {
      mirror.normal = vertex.normal.clone()
      mirror.normal.x = -mirror.normal.x
    }
    return mirror
  }
}
