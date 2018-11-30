import { ArrayCollection } from './ArrayCollection'
import { BoneRotation } from '../3d/BoneRotation'

export class BoneRotationCollection extends ArrayCollection {
  patch (rotations) {
    if (!rotations) return
    for (var rotation of rotations) {
      this.update(rotation)
    }
  }

  add (/* one BoneRotation */ data) {
    var rotation = new BoneRotation(this.owner)
    rotation.patch(data)
    super.add(rotation)
  }

  addObject (rotation) {
    super.add(rotation)
  }

  update (/* one BoneRotation */ data) {
    var current
    for (var item of this) {
      if (item.id === data.id) {
        current = item
      }
    }
    if (!current) {
      this.add(data)
      return
    }
    // update existing rotation
    current.x = data.x || 0
    current.y = data.y || 0
    current.z = data.z || 0
  }
}
