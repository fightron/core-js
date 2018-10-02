'use strict'

import { Base } from '../lib/Base'

export const INPUT_ACTIONS = [
  // directions
  'l', 'r', 'd', 'u',

  // action buttons
  'A', 'B', 'X', 'Y',
  'L1', 'L2', 'R1', 'R2',

  // start, select/option
  'S', 'T'
]

function unassignedFn (_inputInstance, _inputAction) {}

export class BaseInput extends Base {
  constructor () {
    super()
    this.current = new Map() // currently pressed actions
    this.player = null
    this.enabled = true
    this.reset()
  }

  set enabled (value) {
    if (value) {
      this._enabled = true
    } else {
      for (var action of INPUT_ACTIONS) {
        this.release(action)
      }
      this._enabled = false
    }
  }

  get enabled () {
    return this._enabled
  }

  reset () {
    this.onHold = unassignedFn
    this.onRelease = unassignedFn
  }

  hold (action) {
    if (!this.valid(action)) {
      return
    }
    this.current.set(action, true)
    this.onHold(action)
  }

  release (action) {
    if (!this.valid(action)) {
      return
    }
    this.current.set(action, false)
    this.onRelease(action)
  }

  valid (action) {
    return this._enabled && INPUT_ACTIONS.indexOf(action) >= 0
  }
}
