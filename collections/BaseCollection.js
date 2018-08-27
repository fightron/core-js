export class BaseCollection extends Map {
  constructor (owner) {
    super()
    this.owner = owner
  }

  add (object) {
    this.set(object.id, object)
  }

  free () {
    this.owner = null
    var key
    var keys = this.keys()
    for (key of keys) {
      this.get(key).free()
    }
    this.clear()
  }
}
