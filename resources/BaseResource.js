import sha256 from 'crypto-js/sha256'
import { Base } from '../lib/Base'

export class BaseResource extends Base {
  constructor () {
    super()
    this._id = null // remote ID
    this._type = null // resource type (table name)
    this.isResource = true // internal optimization
    this.renderableClass = null
    this.renderable = null // object to be rendered (client-dependent)
  }

  set id (value) {
    this._id = (value || value === 0) ? `${value}` : null
  }

  get id () {
    return this._id
  }

  set type (value) {
    this._type = value ? `${value}` : null
  }

  get type () {
    return this._type
  }

  get path () {
    if (this._id === null || this._type === null) {
      return null
    }
    return `${this._type}/${this._id}`
  }

  get filename () {
    var path = this.path
    return path ? `${path}/${this.fingerprint()}.json` : null
  }

  patch (data) {
    if (data.id || data.id === 0) {
      this.id = data.id
    }
  }

  fingerprint () {
    return sha256(this.identity()).toString()
  }

  identity () {
    return `${this.id}`
  }

  // Data to be saved in Datastore
  // Should be overwritten by subclasses.
  json () {
    return {}
  }
}
