import { Base } from './Base'
import { Vector3 } from '../3d/Vector3'

export class SchematicPart extends Base {
  constructor (data, itemResource) {
    if (!data || !data.id || !data.rT || !data.rI) {
      throw new Error('ITEM_PART_INVALID_DATA')
    }
    if (!itemResource) {
      throw new Error('ITEM_PART_INVALID_RESOURCE')
    }
    super()
    this.item = itemResource
    this.id = data.id
    this.resourceType = data.rT
    this.resourceId = data.rI
    this.parent = null // parent SchematicPart
    this.position = new Vector3()
    var position = data.p
    if (position) {
      this.position.set(position.x, position.y, position.z)
    }
    this.rotation = new Vector3()
    var rotation = data.r
    if (rotation) {
      this.rotation.set(rotation.x, rotation.y, rotation.z)
    }
    // this.quaternion = ??? // TODO
    this.scale = new Vector3()
    var scale = data.s
    if (scale) {
      this.scale.set(scale.x, scale.y, scale.z)
    }
    this.lightType = data.l
    this.castShadow = data.cs || false
    this.receiveShadow = data.rs || false
    this.outline = data.o || false
    this.slot = data.sl
  }

  free () {
    this.parent = null
    this.item = null
    super.free()
  }
}
