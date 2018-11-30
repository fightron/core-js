import { BaseResource } from './BaseResource'
import { BoneRotationCollection } from '../collections/BoneRotationCollection'
import { BoneRotation } from '../3d/BoneRotation'

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

  // Updates this pose with another pose's rotations
  merge (anotherPose) {
    var aRotation, sRotation, found
    for (aRotation of anotherPose.rotations) {
      found = false
      for (sRotation of this.rotations) {
        if (sRotation.id === aRotation.id) {
          found = true
          break
        }
      }
      if (!found) {
        // Creates a new copy
        sRotation = new BoneRotation(this)
        sRotation.id = aRotation.id
        this.rotations.addObject(sRotation)
      }
      sRotation.x = aRotation.x
      sRotation.y = aRotation.y
      sRotation.z = aRotation.z
      sRotation.position = aRotation.position
    }
  }

  clear () {
    var rotations = this.rotations
    while (rotations.length > 0) {
      rotations.shift()
    }
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
