import {ArrayCollection} from './ArrayCollection'
import {ItemColor} from '../lib/ItemColor'

export class ItemColorCollection extends ArrayCollection {
  add (/* one ItemColor */ data) {
    var item = this.owner
    if (!item) {
      throw new Error('ITEM_COLOR_COLLECTION_ITEM_NOT_SET')
    }
    var itemColor = new ItemColor(data, item)
    this.push(itemColor)
    this.dictionary.set(itemColor.id, itemColor)
  }
}
