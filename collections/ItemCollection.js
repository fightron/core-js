import { ClientCollection } from './ClientCollection'

export class ItemCollection extends ClientCollection {
  add (object, id) {
    var schematic = this.owner.schematics.get(object.sch)
    if (!schematic) {
      throw new Error('IC_A_SCH', id, object.sch)
    }
    object.schematic = schematic
    return super.add(object, id)
  }
}
