import {BaseResource} from './BaseResource'

export class GeometryResource extends BaseResource {
  constructor () {
    super()
    this._type = 'Geo'
    this.isGeometryResource = true // internal optimization
    this.vertices = null
    this.faces = null
    this.regions = null
    this.morphs = null
  }

  patch (data) {
    if (!data) {
      return
    }
    super.patch(data)
    if (data.vertices) {
      this.vertices = data.vertices
    }
    if (data.faces) {
      this.faces = data.faces
    }
    if (data.regions) {
      this.regions = data.regions
    }
    if (data.morphs) {
      this.morphs = data.morphs
    }
  }
}
