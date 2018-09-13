import {BaseResource} from './BaseResource'
import {SchematicPartCollection} from '../collections/SchematicPartCollection'

export class SchematicResource extends BaseResource {
  constructor () {
    super()
    this._type = 'Sch'
    this.name = null
    this.isSchematicResource = true // internal optimization
    this.parts = new SchematicPartCollection(this)
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
