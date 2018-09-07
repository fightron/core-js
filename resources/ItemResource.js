import {BaseResource} from './BaseResource'
import {ItemPartCollection} from '../collections/ItemPartCollection'

export class ItemResource extends BaseResource {
  constructor () {
    super()
    this._type = 'Itm'
    this.name = null
    this.isItemResource = true // internal optimization
    this.parts = new ItemPartCollection(this)
  }

  patch (data) {
    if (!data) return
    super.patch(data)
    this.name = data.n
    this.parts.load(data.p)
  }

  free () {
    this.parts.free()
    this.parts = null
    super.free()
  }
}
