import {ArrayCollection} from './ArrayCollection'
import {Face3} from '../3d/Face3'

export class FaceCollection extends ArrayCollection {
  add (/* one Face */ data) {
    var geometry = this.owner
    if (!geometry) {
      throw new Error('FACE_COLLECTION_GEOMETRY_NOT_SET')
    }

    var a = geometry.vertices.find(data.a)
    var b = geometry.vertices.find(data.b)
    var c = geometry.vertices.find(data.c)

    if (a === undefined || b === undefined || c === undefined) {
      throw new Error('FACE_COLLECTION_VERTEX_NOT_FOUND', data.a, data.b, data.c)
    }

    var face = new Face3(a, b, c, data.n)
    face.id = data.id
    face.index = this.length

    this.push(face)
    this.dictionary.set(face.id, face)

    var mirror = this.mirrorize(data.mi, face)
    if (mirror) {
      mirror.index = this.length
      this.push(mirror)
      this.dictionary.set(mirror.id, mirror)
    }
  }

  mirrorize (mirrorId, face) {
    if (!mirrorId || !face) {
      return null
    }

    var a = face.b // invert ccw orientation
    var b = face.a
    var c = face.c

    // At least one vertex must have a mirror
    if (!a.mirror && !b.mirror && !c.mirror) {
      console.error('FACE_NOT_MIRRORABLE_1', face.id)
      return null
    }

    a = a.mirror || a
    b = b.mirror || b
    c = c.mirror || c

    // For a face to be mirrorable, vertices must either:
    //  a) have been mirrored; or
    //  b) be x-centered.
    if ((!a.mirrored && a.x !== 0) ||
        (!b.mirrored && b.x !== 0) ||
        (!c.mirrored && c.x !== 0)) {
      console.error('FACE_NOT_MIRRORABLE_2', face.id)
      return null
    }

    var normals

    if (face.normals) {
      normals = {}
      if (face.normals.b) normals.a = face.normals.b.clone() // inverted
      if (face.normals.a) normals.b = face.normals.a.clone()
      if (face.normals.c) normals.c = face.normals.c.clone()
      if (normals.a && normals.a.x) normals.a.x = -normals.a.x
      if (normals.b && normals.b.x) normals.b.x = -normals.b.x
      if (normals.c && normals.c.x) normals.c.x = -normals.c.x
    }

    var mirror = new Face3(a, b, c, normals)
    face.mirror = mirror
    mirror.mirror = face
    mirror.id = mirrorId
    mirror.mirrored = true

    return mirror
  }
}
