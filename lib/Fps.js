import { Base } from './Base'

export class Fps extends Base {
  constructor (size) {
    super()
    this.size = size || 10
    this.samples = new Float64Array(this.size)
    this.position = 0
    this.total = 0.0
    this.now = dateNow
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

/* istanbul ignore next */
function dateNow () {
  return new Date()
}
