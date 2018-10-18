'use strict'

import { BaseInput } from './BaseInput'
import { KeyCodes } from './KeyCodes'

export class KeyboardInput extends BaseInput {
  constructor () {
    super()
    this.assignments = new Map()
    this.keysDown = new Map() // blocks keydown auto-repeat
    this.onKeyDown = this.onKeyDown.bind(this)
    this.onKeyUp = this.onKeyUp.bind(this)
    this.onWindowBlur = this.onWindowBlur.bind(this)
    this.onWindowBlurInput = this.onWindowBlurInput.bind(this)
    this.defaults()
  }

  assign (key, action) {
    this.assignments.set(key, action)
  }

  onKeyDown (event) {
    var action = this.capture(event)
    if (!action) {
      return
    }
    if (this.keysDown.get(action)) {
      return
    }
    this.hold(action)
    this.keysDown.set(action, true)
  }

  onKeyUp (event) {
    var action = this.capture(event)
    if (!action) {
      return
    }
    this.release(action)
    this.keysDown.set(action, false)
  }

  onWindowBlur (event) {
    this.keysDown.forEach(this.onWindowBlurInput)
  }

  onWindowBlurInput (_, action) {
    this.release(action)
    this.keysDown.set(action, false)
  }

  capture (event) {
    var code = event.code
    if (code) {
      return this.captureCode(code, event)
    }
    var keyNumber = event.which || event.keyCode
    code = KeyCodes.get(keyNumber)
    if (!code) {
      return
    }
    return this.captureCode(code, event)
  }

  captureCode (code, event) {
    var action = this.assignments.get(code)
    if (!action) {
      return false
    }
    // Always prevent default if captured key is assigned.
    if (event.preventDefault) {
      event.preventDefault()
    } else {
      event.returnValue = false
    }
    return action
  }

  install (windowInstance) {
    windowInstance.addEventListener('keydown', this.onKeyDown, false)
    windowInstance.addEventListener('keyup', this.onKeyUp, false)
    windowInstance.addEventListener('blur', this.onWindowBlur, false)
  }

  uninstall (windowInstance) {
    windowInstance.removeEventListener('keydown', this.onKeyDown, false)
    windowInstance.removeEventListener('keyup', this.onKeyUp, false)
    windowInstance.removeEventListener('blur', this.onWindowBlur, false)
  }

  defaults () {
    this.assignments.clear()
    this.assign('KeyW', 'u')
    this.assign('KeyA', 'l')
    this.assign('KeyS', 'd')
    this.assign('KeyD', 'r')
    this.assign('KeyY', 'X')
    this.assign('KeyU', 'Y')
    this.assign('KeyI', 'R1')
    this.assign('KeyO', 'L1')
    this.assign('KeyH', 'A')
    this.assign('KeyJ', 'B')
    this.assign('KeyK', 'R2')
    this.assign('KeyL', 'L2')
    this.assign('Enter', 'S')
    this.assign('Backspace', 'T')
  }
}
