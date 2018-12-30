import { Base } from './Base'
import { Vector3 } from '../3d/Vector3'

export class SchematicPart extends Base {
  constructor (data, itemResource) {
    if (!data || !data.id || !data.rT || (data.rT === 'g' && !data.rI)) {
      throw new Error('E-SP-DATA')
    }
    if (!itemResource) {
      throw new Error('E-SP-RES', data.id)
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
    this.scale = new Vector3(1, 1, 1)
    var scale = data.s
    if (scale) {
      this.scale.set(scale.x || 1, scale.y || 1, scale.z || 1)
    }
    this.color = data.c
    this.lightType = data.l
    this.intensity = data.i || 1
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
