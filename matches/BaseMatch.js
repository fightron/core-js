import { Base } from '../lib/Base'
import { Counter } from '../lib/Counter'

// This is a runtime representation of a MatchResource.
export class BaseMatch extends Base {
  constructor (game) {
    if (!game) {
      throw new Error('F-MT-GM')
    }
    super()
    this.id = null
    this.game = game
    this.resource = null // MatchResource
    this.initialize()
  }

  initialize () {
    // Match counter is independent from game counter.
    this.freeCounter()
    this.counter = new Counter()

    // key = user ID, value = fighter/build ID
    // used to capture inputs
    this.users = new Map()

    // When the match is inactive, it is not accepting inputs.
    this.active = false

    // A finished match can only be accessed for replay purposes.
    this.finished = false

    // A training match never ends, and its events are not stored.
    this.training = false
  }

  set resource (value) {
    if (value === null || value === undefined) {
      this._resource = null
      this.initialize() // reset match
      return
    }
    this._resource = value
    this.load()
  }

  load () {
    // Load from _resource
  }

  free () {
    this.game = null
    this.resource = null
    this.freeCounter()
    super.free()
  }

  freeCounter () {
    if (this.counter) {
      this.counter.free()
      this.counter = null
    }
  }
}
