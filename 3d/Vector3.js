import {Base} from '../lib/Base'

export class Vector3 extends Base {
  constructor (x, y, z) {
    super()
    this.isVector3 = true
    this.set(x, y, z)
  }

  set (x, y, z) {
    this.x = x || 0
    this.y = y || 0
    this.z = z || 0
  }

  clone () {
    return new Vector3(this.x, this.y, this.z)
  }
}
