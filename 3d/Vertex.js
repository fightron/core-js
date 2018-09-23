import { Vector3 } from './Vector3'

export class Vertex extends Vector3 {
  constructor (x, y, z) {
    super(x, y, z)
    this.id = null
    this.mirror = null // another Vertex
    this.mirrored = false // true if this Vertex was generated by mirrorize()
    this.normal = null // Vector3
    this.index = null // will be set by collection
    this.isVertex = true // optimization
  }

  free () {
    this.mirror =
    this.normal = null
    super.free()
  }
}