import { Base } from '@fightron/utils/Base'

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

  increment (x, y, z) {
    if (x) { this.x += x }
    if (y) { this.y += y }
    if (z) { this.z += z }
  }

  clone () {
    return new Vector3(this.x, this.y, this.z)
  }
}
