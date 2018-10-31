import { ArrayCollection } from './ArrayCollection'
import { BoneRotation } from '../3d/BoneRotation'

export class BoneRotationCollection extends ArrayCollection {
  add (/* one BoneRotation */ data) {
    var rotation = new BoneRotation(this.owner)
    rotation.patch(data)
    super.add(rotation)
  }
}
