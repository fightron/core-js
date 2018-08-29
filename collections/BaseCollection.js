export class BaseCollection extends Map {
  constructor (owner) {
    super()
    this.owner = owner
    this.objectClass = null
  }

  add (object) {
    var ObjectClass = this.objectClass
    if (ObjectClass) {
      var instance = new ObjectClass(object, this.owner)
      this.set(instance.id, instance)
    } else {
      this.set(object.id, object)
    }
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
