import { FightingGame } from '../games/FightingGame'

// Demo scene imports (temporary)
import items from '../data/items'
import rigs from '../data/rigs'

// Demo poses
import lowerA from '../data/poses/lower/A'
import lowerAD2 from '../data/poses/lower/A-down-2'
import lowerAU1 from '../data/poses/lower/A-up-1'
import upperA from '../data/poses/upper/A'
import upperAU1 from '../data/poses/upper/A-up-1'
import upperAD1 from '../data/poses/upper/A-down-1'
import handsRestedLeft from '../data/poses/hands/rested-left'
import handsRestedRight from '../data/poses/hands/rested-right'

// Animations
import testAnimation from '../test/fixtures/animations/test'

export class DemoGame extends FightingGame {
  loadGlobals () {
    super.loadGlobals()
    for (var item of items) {
      this.sendToClient('+', 'i', item)
    }
    for (var rig of rigs) {
      this.sendToClient('+', 'r', rig)
    }
    this.sendToClient('+', 'po', lowerA)
    this.sendToClient('+', 'po', lowerAU1)
    this.sendToClient('+', 'po', lowerAD2)
    this.sendToClient('+', 'po', upperA)
    this.sendToClient('+', 'po', upperAU1)
    this.sendToClient('+', 'po', upperAD1)
    this.sendToClient('+', 'po', handsRestedLeft)
    this.sendToClient('+', 'po', handsRestedRight)

    this.sendToClient('+', 'am', testAnimation)
    this.sendToClient('p', 'proto-1', -120, 0, 0)
    this.sendToClient('r', 'proto-1', null, Math.PI / 2)
    this.sendToClient('p', 'jet-1', 120, 0, 0)
    this.sendToClient('r', 'jet-1', null, -Math.PI / 2)

    setTimeout(() => { this.sendToClient('am', 'proto-1', 'test-animation') }, 1000)
    setTimeout(() => { this.sendToClient('am', 'jet-1', 'test-animation') }, 1000)
  }
}
