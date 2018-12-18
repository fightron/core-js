import { Base } from './Base'

var defaultNow
if (typeof window !== 'undefined' && window.performance) {
  defaultNow = window.performance.now.bind(window.performance)
} else {
  defaultNow = function () { return new Date() }
}

export class Fps extends Base {
  constructor (size) {
    super()
    this.size = size || 60
    this.samples = new Float64Array(this.size)
    this.position = 0
    this.resets = 0
    this.total = 0.0
    this.max = 0.0
    this.now = defaultNow
    this.startTime = 0.0
  }

  start () {
    this.startTime = this.now()
  }

  end () {
    this.add(this.now() - this.startTime)
  }

  add (time) {
    var s = this.samples
    var p = this.position
    this.total += time - s[p]
    s[p] = time
    this.position++
    if (this.position > this.size - 1) {
      this.position = 0
      this.resets++
    }
    if (time > this.max || this.resets % 10 === 0) {
      this.max = time
    }
  }

  average () {
    var avg = this.averageSample()
    return 1000 / avg
  }

  averageSample () {
    return this.total / this.size
  }
}
