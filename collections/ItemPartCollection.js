import {ArrayCollection} from './ArrayCollection'
import {ItemPart} from '../lib/ItemPart'

export class ItemPartCollection extends ArrayCollection {
  addSchematicPart (schematicPart, dataParts) {
    if (!schematicPart) {
      throw new Error('ITEM_PART_COLLECTION_REQUIRES_SCHEMATIC_PART')
    }
    var item = this.owner
    if (!item) {
      throw new Error('ITEM_PART_COLLECTION_ITEM_NOT_SET')
    }
    var itemPart = new ItemPart(item, schematicPart)
    if (dataParts) {
      for (var data of dataParts) {
        if (schematicPart.id === data.id) {
          itemPart.patch(data)
          break
        }
      }
    }
    var parentId = schematicPart.parent ? schematicPart.parent.id : null
    if (parentId) {
      var parent = this.find(parentId)
      if (parent) {
        itemPart.parent = parent
      } else {
        console.warn('ITEM_PARENT_NOT_FOUND', parentId)
      }
    }
    this.push(itemPart)
    this.dictionary.set(itemPart.id, itemPart)
  }
}
