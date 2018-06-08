const sha256 = require('crypto-js/sha256')

class BaseResource {
  constructor () {
    this._id = null // remote ID
    this._type = null // resource type, usually in plural form, e.g., "characters"
    this.isResource = true // internal optimization
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
}

module.exports = BaseResource
