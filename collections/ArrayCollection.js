export class ArrayCollection extends Array {
  constructor (owner) {
    super()
    this.owner = owner
    this.dictionary = new Map()
    this.isArrayCollection = true
  }

  find (id) {
    return this.dictionary.get(id)
  }

  load (objects) {
    if (!objects) {
      return
    }
    for (var object of objects) {
      this.add(object)
    }
  }

  // Should be overwritten by subclasses
  add (data) {
    this.push(data)
    this.dictionary.set(data.id, data)
  }

  free () {
    this.owner = null
    var object
    for (var i = this.length - 1; i >= 0; --i) {
      object = this[i]
      if (typeof object.free === 'function') {
        object.free()
      }
      this.pop()
    }
    this.dictionary.clear()
    this._free = true
  }
}
