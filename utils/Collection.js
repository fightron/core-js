'use strict'

class Collection extends Map {
  constructor (owner) {
    super()
    this.owner = owner
  }

  add (object) {
    this.set(object.id, object)
  }

  free () {
    this.owner = null
    // TODO: free() each item
    this.clear()
  }
}

module.exports = Collection
