class Resource {
  constructor () {
    this._id = null // remote ID
    this._type = null // resource type, usually in plural form, e.g., "characters"
    this._path = null // computed path, based on type and ID
    this.isResource = true // internal optimization
  }

  set id (value) {
    this._id = (value || value === 0) ? `${value}` : null
    this.updatePath()
  }

  get id () {
    return this._id
  }

  set type (value) {
    this._type = value ? `${value}` : null
    this.updatePath()
  }

  get type () {
    return this._type
  }

  get path () {
    return this._path
  }

  fill (data) {
    if (data.id || data.id === 0) {
      this.id = data.id
    }
  }

  updatePath () {
    if (this._id === null || this._type === null) {
      this._path = null
      return
    }
    this._path = `${this._type}/${this._id}`
  }
}

module.exports = Resource
