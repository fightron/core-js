import { Base } from './Base'
import { Counter } from './Counter'

// Global collections are always loaded with every client instance.
import skeletons from '../data/skeletons'
import geometries from '../data/geometries'
import schematics from '../data/schematics'

export class Game extends Base {
  constructor (worker) {
    super()
    this.worker = worker
    this.counter = new Counter()
    this.counter.onChange = this.onFrame.bind(this)
    this.user = null
    this.match = null // current match
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
    this.receiveFromClient(command, ...rest)
  }

  onFrame (counter) {
    this.sendToClient('f', counter.current)
  }

  // Sends a message to the Client.
  sendToClient (...parts) {
    this.worker.postMessage(JSON.stringify(parts))
  }

  receiveFromClient (command, ...rest) {
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
      // console.log('Input registered', rest)
      return
    }
    if (command === 'cn') {
      // Connected: send globals
      console.log('Client connected', rest)
      this.loadGlobals()
      this.counter.start()
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
    // Skeletons come first. Skinned Geometries depend on them.
    for (var skeleton of skeletons) {
      this.sendToClient('+', 'sl', skeleton)
    }
    for (var geometry of geometries) {
      this.sendToClient('+', 'g', geometry)
    }
    for (var schematic of schematics) {
      this.sendToClient('+', 's', schematic)
    }
  }
}
