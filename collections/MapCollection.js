export class MapCollection extends Map {
  constructor (owner) {
    super()
    this.owner = owner
    this.isMapCollection = true
    this._free = false
  }

  add (object, id) {
    this.set(id || object.id, object)
  }

  find (id) {
    return this.get(id)
  }

  free () {
    this.owner = null
    var key, object
    var keys = this.keys()
    for (key of keys) {
      object = this.get(key)
      if (typeof object.free === 'function') {
        object.free()
      }
    }
    this.clear()
    this._free = true
  }
}
