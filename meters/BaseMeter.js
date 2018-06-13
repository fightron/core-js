'use strict'

const NOOP = function () {}

class BaseMeter {
  constructor (min, max, current) {
    this.minimum = min || 0
    this.maximum = max || 1
    this.current = current || this.minimum
    this.onDepletion = NOOP
    this.onCompletion = NOOP
  }

  change (amount) {
    if (!amount) { // zero == false
      return
    }
    var previousAmount = this.current
    this.current += amount
    if (this.current < this.minimum) {
      this.current = this.minimum
    }
    if (this.current > this.maximum) {
      this.current = this.maximum
    }
    if (previousAmount === this.current) {
      return // no change
    }
    this.afterUpdate()
  }

  afterUpdate () {
    if (this.current === this.minimum) {
      this.onDepletion()
    } else if (this.current === this.maximum) {
      this.onCompletion()
    }
  }

  free () {
    this.onDepletion = NOOP
    this.onCompletion = NOOP
  }
}

module.exports = BaseMeter
