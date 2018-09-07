import {ArrayCollection} from './ArrayCollection'
import {ItemPart} from '../lib/ItemPart'

export class ItemPartCollection extends ArrayCollection {
  add (/* one ItemPart */ data) {
    var part = new ItemPart(data, this.owner)
    var parentId = data.par
    if (parentId) {
      var parent = this.find(`${this.owner.id}-${parentId}`)
      if (parent) {
        part.parent = parent
      } else {
        console.warn('ITEM_PARENT_NOT_FOUND', parentId)
      }
    }
    this.push(part)
    this.dictionary.set(part.id, part)
  }
}
