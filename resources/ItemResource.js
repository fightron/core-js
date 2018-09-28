import { BaseResource } from './BaseResource'
import { ItemColorCollection } from '../collections/ItemColorCollection'
import { ItemPartCollection } from '../collections/ItemPartCollection'

export class ItemResource extends BaseResource {
  constructor () {
    super()
    this._type = 'Itm'
    this.schematic = null // SchematicResource
    this.character = null // CharacterResource
    this.colors = new ItemColorCollection(this)
    this.parts = new ItemPartCollection(this)
    this.isItemResource = true
  }

  patch (data, client) {
    if (!data) return
    var schematic = client.schematics.find(data.sch)
    if (!schematic) {
      throw new Error('ITEM_RESOURCE_PATCH_SCHEMATIC_NOT_FOUND')
    }
    super.patch(data)
    this.schematic = schematic
    for (var part of schematic.parts) {
      this.parts.addSchematicPart(part, data.p)
    }
    // this.colors.load(data.c)
  }

  free () {
    this.parts.free()
    this.colors.free()
    this.parts = null
    this.colors = null
    super.free()
  }
}
