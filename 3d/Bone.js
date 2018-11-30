import { Base } from '../lib/Base'
import { Vector3 } from './Vector3'

export class Bone extends Base {
  constructor (skeleton) {
    if (!skeleton || !skeleton.isSkeletonResource) {
      throw new Error('BONE_REQUIRES_SKELETON')
    }
    super()
    this.skeleton = skeleton
    this.id = null
    this.parent = null
    this.position = new Vector3()
    this.rotationOrder = 'XYZ'
    this.isBone = true
  }

  patch (data) {
    this.id = data.id
    var parentId = data.par
    if (parentId) {
      var parent = this.skeleton.bones.find(parentId)
      /* istanbul ignore if */
      if (!parent) {
        console.warn('Parent bone not found in Skeleton', data)
      }
      this.parent = parent
    }
    var position = data.p
    if (position) {
      this.position.set(position.x, position.y, position.z)
    }
    var rotationOrder = data.rO
    if (rotationOrder) {
      this.rotationOrder = rotationOrder
    }
  }
}
