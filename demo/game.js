import { Game } from '../lib/Game'

// Demo scene imports (temporary)
import items from '../data/items'
import humanRig from '../test/fixtures/rigs/human'
import b0items from '../test/fixtures/items/b0'

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

export class DemoGame extends Game {
  loadGlobals () {
    super.loadGlobals()
    for (var item of items) {
      this.sendToClient('+', 'i', item)
    }
    this.demo()
  }

  demo () {
    createCharacter('1-2', this, 'red')
    createCharacter('1-1', this, '#3366ff')

    createCharacter('2-1', this, 'cyan')
    createCharacter('2-2', this, '#ffcc00')

    createCharacter('3-1', this, 'lime')
    createCharacter('3-2', this, '#cc99ff')

    createCharacter('4-1', this, 'yellow')
    createCharacter('4-2', this, '#66ccff')

    createCharacter('5-1', this, '#ffcc99')
    createCharacter('5-2', this, '#ff00ff')

    this.sendToClient('+', 'po', lowerA)
    this.sendToClient('+', 'po', lowerAU1)
    this.sendToClient('+', 'po', lowerAD2)
    this.sendToClient('+', 'po', upperA)
    this.sendToClient('+', 'po', upperAU1)
    this.sendToClient('+', 'po', upperAD1)
    this.sendToClient('+', 'po', handsRestedLeft)
    this.sendToClient('+', 'po', handsRestedRight)

    this.sendToClient('+', 'am', testAnimation)

    setTimeout(() => { this.sendToClient('am', '1-1', 'test-animation') }, 1000)
    setTimeout(() => { this.sendToClient('am', '2-1', 'test-animation') }, 1200)
    setTimeout(() => { this.sendToClient('am', '3-1', 'test-animation') }, 1400)
    setTimeout(() => { this.sendToClient('am', '4-1', 'test-animation') }, 1600)
    setTimeout(() => { this.sendToClient('am', '5-1', 'test-animation') }, 1800)

    setTimeout(() => { this.sendToClient('am', '1-2', 'test-animation') }, 2000)
    setTimeout(() => { this.sendToClient('am', '2-2', 'test-animation') }, 2200)
    setTimeout(() => { this.sendToClient('am', '3-2', 'test-animation') }, 2400)
    setTimeout(() => { this.sendToClient('am', '4-2', 'test-animation') }, 2600)
    setTimeout(() => { this.sendToClient('am', '5-2', 'test-animation') }, 2800)

    var pos = 80
    var distance = 55

    this.sendToClient('p', '1-1', -pos /* - distance */, 0, 0)
    this.sendToClient('r', '1-1', null, Math.PI / 2)
    this.sendToClient('p', '2-1', -pos - distance)
    this.sendToClient('r', '2-1', null, Math.PI / 2)
    this.sendToClient('p', '3-1', -pos - (distance * 2))
    this.sendToClient('r', '3-1', null, Math.PI / 2)
    this.sendToClient('p', '4-1', -pos - (distance * 3))
    this.sendToClient('r', '4-1', null, Math.PI / 2)
    this.sendToClient('p', '5-1', -pos - (distance * 4))
    this.sendToClient('r', '5-1', null, Math.PI / 2)

    this.sendToClient('p', '1-2', pos /* + distance */, 0, 0)
    this.sendToClient('r', '1-2', null, -Math.PI / 2)

    // this.sendToClient('p', '1-1', pos + distance, 0, 0)
    // this.sendToClient('r', '1-1', null, -Math.PI / 2)

    this.sendToClient('p', '2-2', pos + distance)
    this.sendToClient('r', '2-2', null, -Math.PI / 2)
    this.sendToClient('p', '3-2', pos + (distance * 2))
    this.sendToClient('r', '3-2', null, -Math.PI / 2)
    this.sendToClient('p', '4-2', pos + (distance * 3))
    this.sendToClient('r', '4-2', null, -Math.PI / 2)
    this.sendToClient('p', '5-2', pos + (distance * 4))
    this.sendToClient('r', '5-2', null, -Math.PI / 2)
  }
}

function createCharacter (id, game, color) {
  var item, rig, part
  for (var b0item of b0items) {
    item = JSON.parse(JSON.stringify(b0item)) // deep clone
    item.id = `${id}-${item.id}`
    if (color) {
      if (item.p) {
        for (part of item.p) {
          part.c = color
        }
      } else {
        item.p = [{ id: '0', c: color }]
      }
    }
    game.sendToClient('+', 'i', item)
  }

  rig = JSON.parse(JSON.stringify(humanRig))
  rig.id = id
  for (var rigItem of rig.i) {
    rigItem.id = `${id}-${rigItem.id}`
  }
  game.sendToClient('+', 'r', rig)
}
