import { ClientCollection } from './ClientCollection'

export class ItemCollection extends ClientCollection {
  add (object, id) {
    var schematic = this.owner.schematics.get(object.sch)
    if (!schematic) {
      console.warn('IC_A_SCH', id, object.sch)
      return
    }
    object.schematic = schematic
    return super.add(object, id)
  }
}
