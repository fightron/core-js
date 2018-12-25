import { FightingGame } from '../games/FightingGame'

// Demo scene imports (temporary)
import items from '../data/items'
import rigs from '../data/rigs'
import poses from '../data/poses'

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
    for (var pose of poses) {
      this.sendToClient('+', 'po', pose)
    }
    this.sendToClient('+', 'am', testAnimation)

    this.sendToClient('p', 'proto-1', -120, 0, 0)
    this.sendToClient('r', 'proto-1', null, Math.PI / 2)
    this.sendToClient('p', 'jet-1', 120, 0, 0)
    this.sendToClient('r', 'jet-1', null, -Math.PI / 2)

    setTimeout(() => { this.sendToClient('am', 'proto-1', 'test-animation') }, 1000)
    setTimeout(() => { this.sendToClient('am', 'jet-1', 'test-animation') }, 1000)
  }
}
