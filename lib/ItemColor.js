import {Base} from './Base'

export class ItemColor extends Base {
  constructor (data, itemResource) {
    if (!data || !data.id || !data.color) {
      throw new Error('ITEM_COLOR_INVALID_DATA')
    }
    if (!itemResource) {
      throw new Error('ITEM_COLOR_INVALID_RESOURCE')
    }
    super()
    this.item = itemResource
    this.id = `${itemResource.id}-c-${data.id}`
    this.color = data.color // TODO: character color code
    this.isItemColor = true
  }

  free () {
    this.item = null
    this.color = null
    super.free()
  }
}
