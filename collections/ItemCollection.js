import { ClientCollection } from './ClientCollection'

export class ItemCollection extends ClientCollection {
  add (object, id) {
    var schematic = this.owner.schematics.get(object.sch)
    if (!schematic) {
      throw new Error('ITEM_COLLECTION_ADD_REQUIRES_SCHEMATIC')
    }
    object.schematic = schematic
    return super.add(object, id)
  }
}
