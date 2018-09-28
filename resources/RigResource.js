import { BaseResource } from './BaseResource'
import { RigItemCollection } from '../collections/RigItemCollection'

export class RigResource extends BaseResource {
  constructor () {
    super()
    this._type = 'Rig'
    this.isRigResource = true // internal optimization
    this.skeleton = null
    this.items = new RigItemCollection(this)
  }

  free () {
    this.skeleton = null
    this.items.free()
    this.items = null
    super.free()
  }
}
