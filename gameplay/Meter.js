import {Base} from '../lib/Base'

const NOOP = function () {}

export class Meter extends Base {
  constructor (min, max, current) {
    super()
    this.id = null
    this.minimum = min || 0
    this.maximum = max || 1
    this.current = current || this.minimum
    this.onChange = NOOP
    this.onDepletion = NOOP
    this.onCompletion = NOOP
  }

  // Set to fixed value
  set (value) {
    var v = value || 0
    var previousAmount = this.current
    if (v < this.minimum) {
      v = this.minimum
    }
    if (v > this.maximum) {
      v = this.maximum
    }
    if (v === previousAmount) {
      return // no change
    }
    this.current = v
    this.afterUpdate()
  }

  // Change amount incrementally
  change (amount) {
    if (!amount) { // zero == false
      return
    }
    return this.set(this.current + amount)
  }

  afterUpdate () {
    this.onChange()
    if (this.current === this.minimum) {
      this.onDepletion()
    } else if (this.current === this.maximum) {
      this.onCompletion()
    }
  }

  free () {
    this.onChange = NOOP
    this.onDepletion = NOOP
    this.onCompletion = NOOP
    super.free()
  }
}
