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
    this.skeleton = null
    this.bones = null
  }

  patch (data, client) {
    if (!data) {
      return
    }
    super.patch(data)
    this.vertices.load(data.v)
    this.faces.load(data.f)
    var bone, boneId
    if (data.sl) {
      var skeleton = client.skeletons.find(data.sl)
      if (skeleton) {
        this.skeleton = skeleton
        if (data.b) {
          this.bones = []
          for (boneId of data.b) {
            bone = skeleton.bones.find(boneId)
            if (bone) {
              this.bones.push(bone)
            } else {
              console.warn('E-GR-B', this.id, skeleton.id, boneId)
            }
          }
        }
      } else {
        console.warn('E-GR-SL', this.id, data.sl)
      }
    }
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
