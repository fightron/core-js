import { BaseResource } from './BaseResource'
import { VertexCollection } from '../collections/VertexCollection'
import { FaceCollection } from '../collections/FaceCollection'

export class GeometryResource extends BaseResource {
  constructor () {
    super()
    this._type = 'Geo'
    this._parent = null // Parent Geometry ID
    this.isGeometryResource = true // internal optimization
    this.vertices = new VertexCollection(this)
    this.faces = new FaceCollection(this)
    this.regions = null
    this.morphs = null
  }

  patch (data) {
    if (!data) {
      return
    }
    super.patch(data)
    this.vertices.load(data.v)
    this.faces.load(data.f)
    // this.regions.load(data.r)
    // this.morphs.load(data.m)
  }

  free () {
    this.faces.free()
    this.vertices.free()
    this.faces = null
    this.vertices = null
  }
}
