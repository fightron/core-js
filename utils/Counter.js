/* eslint-disable import/first */
require('esm')

// Used as a frame counter by both Client and Server.
export class Counter {
  constructor () {
    this.current = 0
    this._freeze = 0
  }

  next () {
    if (this._freeze > 0) {
      --this._freeze
    } else {
      ++this.current
    }
  }

  set (c, f) {
    this.current = c
    if (f !== undefined) {
      this._freeze = f
    }
  }

  set freeze (value) {
    this._freeze = value
  }

  get freeze () {
    return this._freeze
  }
}
