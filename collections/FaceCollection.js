import {ArrayCollection} from '.ArrayCollection'
import {Face3} from '../3d/Face3'
import {Vector3} from '../3d/Vector3'

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

    var aN, bN, cN
    var n = data.n // normal overrides: object indexed by vertex name
    if (n) {
      aN = n.a
      if (aN) { aN = new Vector3(aN.x, aN.y, aN.z) }
      bN = n.b
      if (bN) { bN = new Vector3(bN.x, bN.y, bN.z) }
      cN = n.c
      if (cN) { cN = new Vector3(cN.x, cN.y, cN.z) }
    }

    // If no overrides are found, use vertex normals if available
    if (!aN && a.normal) { aN = a.normal }
    if (!bN && b.normal) { bN = b.normal }
    if (!cN && c.normal) { cN = c.normal }

    var normals

    // Face normals are only enabled if all vertex normals are present
    if (aN && bN && cN) {
      normals = [aN, bN, cN]
    }

    var face = new Face3(a.index, b.index, c.index, normals)
    face.id = data.id
    face.index = this.length
    face.geometry = geometry

    this.push(face)
    this.dictionary.set(face.name, face)

    var mirror = face.mirrorize(data.mi)
    if (mirror) {
      mirror.index = this.length
      this.push(mirror)
      this.dictionary.set(mirror.name, mirror)
    }
  }

  mirrorize (mirrorId, face) {
    if (!mirrorId || !face) {
      return null
    }

    var a = this.b // invert ccw orientation
    var b = this.a
    var c = this.c

    // At least one vertex must have a mirror
    if (!a.mirror && !b.mirror && !c.mirror) {
      console.error('FACE_NOT_MIRRORABLE_1', this.id)
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
      console.error('FACE_NOT_MIRRORABLE_2', this.id)
      return null
    }

    var normals

    if (this.normals) {
      normals = {
        a: this.normals.b.clone(), // also inverted
        b: this.normals.a.clone(),
        c: this.normals.c.clone()
      }
      normals.a.x = -normals.a.x
      normals.b.x = -normals.b.x
      normals.c.x = -normals.c.x
    }

    if (!normals && a.normal && b.normal && c.normal) {
      // Already x-reversed
      normals = {
        a: a.normal,
        b: b.normal,
        c: c.normal
      }
    }

    var mirror = new Face3(a, b, c, normals)
    this.mirror = mirror
    mirror.mirror = this
    mirror.name = mirrorId
    mirror.mirrored = true

    return mirror
  }
}
