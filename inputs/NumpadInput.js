import { KeyboardInput } from './KeyboardInput'

export class NumpadInput extends KeyboardInput {
  defaults () {
    this.assignments.clear()
    this.assign('ArrowUp', 'u')
    this.assign('ArrowLeft', 'l')
    this.assign('ArrowDown', 'd')
    this.assign('ArrowRight', 'r')
    this.assign('Numpad7', 'X')
    this.assign('Numpad8', 'Y')
    this.assign('Numpad9', 'R1')
    // this.assign('...', 'L1')
    this.assign('Numpad4', 'A')
    this.assign('Numpad5', 'B')
    this.assign('Numpad6', 'R2')
    // this.assign('...', 'L2')
    this.assign('NumpadEnter', 'S')
    this.assign('NumpadSubtract', 'T')
  }
}
