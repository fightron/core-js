import { Base } from './Base'

// Global collections are always loaded with every client instance.
import geometries from '../globals/geometries'
import skeletons from '../globals/skeletons'
import schematics from '../globals/schematics'
import items from '../globals/items'

// Demo scene imports (temporary)
import humanRig from '../test/fixtures/rigs/human'
import b0items from '../test/fixtures/items/b0'
import testPose1 from '../test/fixtures/poses/test-1'
import testPose2 from '../test/fixtures/poses/test-2'
import testPose3 from '../test/fixtures/poses/test-3'

export class Game extends Base {
  constructor (worker) {
    super()
    this.worker = worker
  }

  // Receives a message from the worker.
  onMessage (event) {
    // event.data is a JSON string. See:
    // -- https://nolanlawson.com/2016/02/29/high-performance-web-worker-messages/
    try {
      var [command, ...rest] = JSON.parse(event.data) // TODO: optimize
    } catch (e) {
      console.warn('E-GM-REC', event)
      return
    }
    this.commandFromClient(command, ...rest)
  }

  // Sends a message to the Worker -> Client.
  sendToClient (...parts) {
    this.worker.postMessage(JSON.stringify(parts))
  }

  commandFromClient (command, ...rest) {
    if (command === 'i') {
      this.inputCommand(...rest)
      return
    }
    if (command === 'cl') {
      this.clientCommand(...rest)
      return
    }
    console.warn('E-GM-COM', command, rest)
  }

  clientCommand (command, ...rest) {
    if (command === 'in') {
      // Input registration
      // TODO
      console.log('Input registered', rest)
      return
    }
    if (command === 'cn') {
      // Connected: send globals
      console.log('Client connected', rest)
      this.loadGlobals()
      this.demo()
      return
    }
    if (command === 'dc') {
      // Disconnected: clear inputs
      console.log('Client disconnected', rest)
      // TODO
    }
  }

  inputCommand (inputId, event) {
    console.log('Input Command', inputId, event)
  }

  loadGlobals () {
    for (var geometry of geometries) {
      this.sendToClient('+', 'g', geometry)
    }
    for (var skeleton of skeletons) {
      this.sendToClient('+', 'sl', skeleton)
    }
    for (var schematic of schematics) {
      this.sendToClient('+', 's', schematic)
    }
    for (var item of items) {
      this.sendToClient('+', 'i', item)
    }
  }

  demo () {
    createCharacter('1-1', this, '#3366ff')
    createCharacter('1-2', this, 'red')

    createCharacter('2-1', this, 'cyan')
    createCharacter('2-2', this, '#ffcc00')

    createCharacter('3-1', this, 'lime')
    createCharacter('3-2', this, '#cc99ff')

    createCharacter('4-1', this, 'yellow')
    createCharacter('4-2', this, '#66ccff')

    createCharacter('5-1', this, '#ffcc99')
    createCharacter('5-2', this, '#ff00ff')

    this.sendToClient('+', 'po', testPose1)
    this.sendToClient('+', 'po', testPose2)
    this.sendToClient('+', 'po', testPose3)

    this.sendToClient('po', '1-1', 'test-1')
    this.sendToClient('po', '1-2', 'test-2')
    this.sendToClient('po', '2-1', 'test-3')
    this.sendToClient('po', '2-2', 'test-1')
    this.sendToClient('po', '3-1', 'test-2')
    this.sendToClient('po', '3-2', 'test-3')
    this.sendToClient('po', '4-1', 'test-1')
    this.sendToClient('po', '4-2', 'test-2')
    this.sendToClient('po', '5-1', 'test-3')
    this.sendToClient('po', '5-2', 'test-1')

    var pos = 80
    var distance = 55

    this.sendToClient('p', '1-1', -pos)
    this.sendToClient('r', '1-1', null, Math.PI / 2)
    this.sendToClient('p', '2-1', -pos - distance)
    this.sendToClient('r', '2-1', null, Math.PI / 2)
    this.sendToClient('p', '3-1', -pos - (distance * 2))
    this.sendToClient('r', '3-1', null, Math.PI / 2)
    this.sendToClient('p', '4-1', -pos - (distance * 3))
    this.sendToClient('r', '4-1', null, Math.PI / 2)
    this.sendToClient('p', '5-1', -pos - (distance * 4))
    this.sendToClient('r', '5-1', null, Math.PI / 2)

    this.sendToClient('p', '1-2', pos)
    this.sendToClient('r', '1-2', null, -Math.PI / 2)
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
