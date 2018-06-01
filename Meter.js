const NOOP = function () {}

class Meter {
  constructor (min, max, current) {
    this.minimum = min || 0
    this.maximum = max || 1
    this.current = current || 1
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

module.exports = Meter
