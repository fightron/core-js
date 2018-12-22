export class MapCollection extends Map {
  constructor (owner) {
    super()
    this.owner = owner
    this.isMapCollection = true
    this._free = false
  }

  add (object, id, _source) {
    this.set(id || object.id, object)
  }

  find (id) {
    return this.get(id)
  }

  patch (/* array of record data */ data, clientOrGame) {
    if (!data) return
    for (var item of data) {
      this.add(item, null, clientOrGame)
    }
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
