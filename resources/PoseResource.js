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

  patch (data, client) {
    if (!data) return
    this.patchSkeleton(data, client)
    super.patch(data)
    this.rotations.patch(data.r)
  }

  patchSkeleton (data, client) {
    var skeleton = client.skeletons.find(data.sl)
    if (!skeleton) {
      throw new Error('E-PR-SL', data)
    }
    this.skeleton = skeleton
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
