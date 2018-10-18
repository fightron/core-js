'use strict'

import { Base } from '../lib/Base'
import { Counter } from '../lib/Counter'
import { Fps } from '../lib/Fps'
import { ClientCollection } from '../collections/ClientCollection'
import { ItemCollection } from '../collections/ItemCollection'
import { GeometryResource } from '../resources/GeometryResource'
import { SchematicResource } from '../resources/SchematicResource'
import { ItemResource } from '../resources/ItemResource'
import { SkeletonResource } from '../resources/SkeletonResource'
import { RigResource } from '../resources/RigResource'

// Global collections are always loaded with every client instance.
import geometries from '../globals/geometries'
import skeletons from '../globals/skeletons'
import schematics from '../globals/schematics'

const NOOP = () => {}

export class Client extends Base {
  constructor () {
    super()
    this.isClient = true
    this.rendering = false
    this.color = '#7da3be'
    this.hud = null
    this.game = null
    this.counter = new Counter()
    this.fps = new Fps(50)
    this.nextFrameFn = animationFrameFn // can be overwritten by clients
    this.render = this.render.bind(this)
    this.initializeCollections()
    this.initializeCamera()
    this.loadGlobals()
  }

  initializeCollections () {
    this.geometries = new ClientCollection(this, 'g', GeometryResource)
    this.schematics = new ClientCollection(this, 's', SchematicResource)
    this.items = new ItemCollection(this, 'i', ItemResource)
    this.skeletons = new ClientCollection(this, 'sl', SkeletonResource)
    this.rigs = new ClientCollection(this, 'r', RigResource)
    this.poses = new ClientCollection(this, 'po')
    this.animations = new ClientCollection(this, 'am')
    this.sounds = new ClientCollection(this, 'snd')
  }

  loadGlobals () {
    for (var geometry of geometries) {
      this.geometries.add(geometry)
    }
    for (var skeleton of skeletons) {
      this.skeletons.add(skeleton)
    }
    for (var schematic of schematics) {
      this.schematics.add(schematic)
    }
  }

  initializeCamera () {
    this.camera = null
  }

  render () {
    if (!this._rendering) {
      return
    }
    this.nextFrameFn(this.render)
    this.fps.start()
    this.renderFrame()
    this.fps.end()
  }

  set rendering (v) {
    this._rendering = !!v
    if (this._rendering) {
      this.render()
    }
  }

  get rendering () {
    return this._rendering
  }

  set game (game) {
    if (this._game) {
      this._game.onmessage = NOOP
      this._game = null
    }
    if (game) {
      this._game = game
      this._game.onmessage = this.receive.bind(this)
    } else {
      this._game = null
    }
  }

  get game () {
    return this._game
  }

  // This probably should go in the Game class.
  receive (/* Worker Event */ event) {
    // event.data is a JSON string. See:
    // -- https://nolanlawson.com/2016/02/29/high-performance-web-worker-messages/
    var [command, ...rest] = JSON.parse(event.data)
    this.command(command, ...rest)
  }

  command (command, ...rest) {
    // ifs are faster than hash lookups due to command priority.
    // Below are the most important item commands.
    if (command === 'p' ||
        command === 'po' ||
        command === 'p+' ||
        command === 'r' ||
        command === 'r+' ||
        command === 'v') {
      this.itemCommand(command, ...rest)
      return
    }
    if (command === 'f') {
      this.setFrameNumber(rest)
      return
    }
    if (command === 'cam') {
      this.cameraCommand(...rest)
      return
    }
    if (command === '+' || command === '-') {
      this.collectionCommand(command, ...rest)
      return
    }
    // Less important item commands.
    if (command === '>' || command === 'q' || command === 's') {
      this.itemCommand(command, ...rest)
      return
    }
    console.warn('UNKNOWN_COMMAND', command, ...rest)
  }

  cameraCommand (command, ...rest) {
    if (command === 'p') {
      this.setCameraPosition(...rest)
      return
    }
    if (command === 'r') {
      this.setCameraRotation(...rest)
      return
    }
    if (command === 't') {
      this.setCameraTarget(...rest)
      return
    }
    if (command === '>') {
      this.setCameraParent(...rest)
      return
    }
    console.warn('UNKNOWN_CAM_COMMAND', command)
  }

  itemCommand (command, itemId, ...rest) {
    var item = this.items.get(itemId)
    if (!item) {
      console.warn('itemCommand: not found', itemId)
      return
    }
    var renderable = item.renderable
    if (!renderable) {
      console.warn('itemCommand: renderable not set', itemId)
      return
    }
    // Commands ordered by priority.
    if (command === 'p') {
      this.setRenderablePosition(renderable, ...rest)
      return
    }
    if (command === 'r') {
      this.setRenderableRotation(renderable, ...rest)
      return
    }
    if (command === 'po') {
      this.setItemPose(item, ...rest)
      return
    }
    console.warn('itemCommand: invalid command', command, itemId, rest)
  }

  collectionCommand (command, ...rest) {
    var [collectionId, data] = rest
    if (!collectionId || !data || !data.id) {
      console.warn('collectionCommand: invalid parameters', command, ...rest)
      return
    }
    var collection = this[collectionId]
    if (!collection) {
      return
    }
    if (command === '+') {
      collection.add(data)
      return
    }
    if (command === '-') {
      collection.remove(data.id)
      return
    }
    console.warn('collectionCommand: invalid command', command)
  }

  setItemPose (item, renderable, poseId) {
    var skeleton = item.skeleton
    if (!skeleton) {
      console.warn('setItemPose: not poseable', item.id)
      return
    }
    var pose = this.poses.get(poseId)
    if (!pose) {
      console.warn('setItemPose: not found', poseId)
      return
    }
    this.setRenderablePose(renderable, pose)
  }

  setFrameNumber (frameNumber) {
    this.counter.set(frameNumber)
  }

  setRenderablePosition (renderable, x, y, z) {
    // defined in subclasses
  }

  setRenderableRotation (renderable, x, y, z) {
    // defined in subclasses
  }

  incrementRenderablePosition (renderable, x, y, z) {
    // defined in subclasses
  }

  incrementRenderableRotation (renderable, x, y, z) {
    // defined in subclasses
  }

  setRenderablePose (renderable, pose) {
    // defined in subclasses
  }

  setRenderableParent (renderable, renderableParent) {
    // defined in subclasses
  }

  setCameraPosition () {
    // defined in subclasses
  }

  setCameraRotation () {
    // defined in subclasses
  }

  setCameraTarget () {
    // defined in subclasses
  }

  setCameraParent () {
    // defined in subclasses
  }

  dispose () {
    this.disposeCollections()
    this.counter.free()
    this.fps.free()
    this.nextFrameFn = null
    this.camera = null
    this.render = null
    this.game = null
    super.free()
  }

  disposeCollections () {
    this.sounds.free()
    this.animations.free()
    this.poses.free()
    this.items.free()
    this.schematics.free()
    this.geometries.free()

    this.sounds = null
    this.animations = null
    this.poses = null
    this.items = null
    this.schematics = null
    this.geometries = null
  }
}

const defaultFrameInterval = 1000 / 60

/* istanbul ignore next */
function animationFrameFn (fn) {
  setInterval(fn, defaultFrameInterval)
}
