import {Base} from '../lib/Base'

export class Vector3 extends Base {
  constructor (x, y, z) {
    super()
    this.x = x || 0
    this.y = y || 0
    this.z = z || 0
    this.isVector3 = true
  }

  clone () {
    return new Vector3(this.x, this.y, this.z)
  }
}
