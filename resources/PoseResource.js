import { BaseResource } from './BaseResource'
import { BoneRotationCollection } from '../collections/BoneRotationCollection'

export class PoseResource extends BaseResource {
  constructor () {
    super()
    this._type = 'Po'
    this.isPoseResource = true // internal optimization
    this.skeleton = null // SkeletonResource
    this.rotations = new BoneRotationCollection(this)
  }

  free () {
    this.skeleton = null
    this.rotations.free()
    this.rotations = null
    super.free()
  }

  compatibleWithRig (/* RigResource */ rig) {
    if (!this.skeleton || !rig || !rig.skeleton) {
      return false
    }
    return this.skeleton.id === rig.skeleton.id
  }
}
