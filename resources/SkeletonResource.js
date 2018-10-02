import { BaseResource } from './BaseResource'
import { BoneCollection } from '../collections/BoneCollection'

export class SkeletonResource extends BaseResource {
  constructor (name) {
    super()
    this._type = 'Sl'
    this.name = null
    this.isSkeletonResource = true // internal optimization
    this.bones = new BoneCollection(this)
  }

  patch (data, _client) {
    if (!data) return
    super.patch(data)
    this.name = data.n
    var bones = data.b
    if (bones) {
      for (var bone of bones) {
        this.bones.add(bone)
      }
    }
  }

  free () {
    this.bones.free()
    this.bones = null
    super.free()
  }
}
