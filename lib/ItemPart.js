import { Base } from '@fightron/utils/Base'

export class ItemPart extends Base {
  constructor (itemResource, schematicPart) {
    if (!itemResource || !schematicPart) {
      throw new Error('ITEM_PART_INVALID_PARAMS')
    }
    super()
    this.isItemPart = true
    this.item = itemResource
    this.id = schematicPart.id
    this.resourceType = schematicPart.resourceType
    this.resourceId = schematicPart.resourceId
    this.parent = null
    this.color = schematicPart.color
    this.intensity = schematicPart.intensity
    this.lightType = schematicPart.lightType
    this.position = schematicPart.position.clone()
    this.rotation = schematicPart.rotation.clone()
    this.scale = schematicPart.scale.clone()
    this.castShadow = schematicPart.castShadow || false
    this.receiveShadow = schematicPart.receiveShadow || false
    this.outline = schematicPart.outline || false
    this.slot = schematicPart.slot
    this.renderable = null // renderable object (client-dependent)
  }

  patch (data) {
    if (!data) {
      return
    }
    if (data.c) {
      this.color = data.c
    }
    if (data.i) {
      this.intensity = data.i
    }
    var position = data.p
    if (position) {
      this.position.increment(position.x, position.y, position.z)
    }
    var rotation = data.r
    if (rotation) {
      this.rotation.increment(rotation.x, rotation.y, rotation.z)
    }
    var scale = data.s
    if (scale) {
      this.scale.increment(scale.x, scale.y, scale.z)
    }
  }

  free () {
    this.parent = null
    this.position = null
    this.rotation = null
    this.scale = null
    this.item = null
    this.renderable = null
    super.free()
  }
}
