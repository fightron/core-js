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
import { PoseResource } from '../resources/PoseResource'

const NOOP = () => {}

export class Client extends Base {
  constructor () {
    super()
    this.isClient = true
    this.rendering = false
    this.color = '#7da3be'
    this.shadows = true
    this.hud = null
    this.worker = null
    this.counter = new Counter()
    this.fps = new Fps(50)
    this.nextFrameFn = animationFrameFn // can be overwritten by clients
    this.render = this.render.bind(this)
    this.initializeScene()
    this.initializeCamera()
    this.initializeCollections()
  }

  initializeCollections () {
    this.geometries = new ClientCollection(this, 'g', GeometryResource)
    this.schematics = new ClientCollection(this, 's', SchematicResource)
    this.items = new ItemCollection(this, 'i', ItemResource)
    this.skeletons = new ClientCollection(this, 'sl', SkeletonResource)
    this.rigs = new ClientCollection(this, 'r', RigResource)
    this.poses = new ClientCollection(this, 'po', PoseResource)
    this.animations = new ClientCollection(this, 'am')
    this.sounds = new ClientCollection(this, 'snd')
  }

  initializeScene () {
    // overwritten by subclasses
    // scene needs to be set up before collections, so Injectors work properly
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

  set worker (worker) {
    if (this._worker) {
      this.send(['cl', 'dc'])
      this._worker.onmessage = NOOP
      this._worker = null
    }
    if (worker) {
      this._worker = worker
      this._worker.onmessage = this.receive.bind(this)
      this.send(['cl', 'cn'])
    } else {
      this._worker = null
    }
  }

  get worker () {
    return this._worker
  }

  // Sends a message to the game worker.
  send (message) {
    if (!this.worker) {
      console.warn('E-CL-WRK')
      return
    }
    console.log('Sending message', Date.now())
    this.worker.postMessage(JSON.stringify(message))
  }

  // Receives a message from the game worker or other external sources.
  receive (/* Worker Event */ event) {
    // event.data is a JSON string. See:
    // -- https://nolanlawson.com/2016/02/29/high-performance-web-worker-messages/
    try {
      var [command, ...rest] = JSON.parse(event.data) // TODO: optimize
    } catch (e) {
      console.warn('E-CL-REC', event)
      return
    }
    this.command(command, ...rest)
  }

  command (command, ...rest) {
    // ifs are faster than hash lookups due to command priority.
    // Below are the most important item commands.
    if (command === 'po') {
      this.rigCommand(command, ...rest)
      return
    }
    if (command === 'p' ||
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
    console.warn('E-CL-CM', command, ...rest)
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
    console.warn('E-CL-CAM', command)
  }

  itemCommand (command, itemId, ...rest) {
    var item = this.items.get(itemId)
    if (!item) {
      console.warn('E-CL-IC-404', itemId)
      return
    }
    var renderable = item.renderable
    if (!renderable) {
      console.warn('E-CL-IC-RND', itemId)
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
      this.setRigPose(item, ...rest)
      return
    }
    console.warn('E-CL-IM', command, itemId, rest)
  }

  rigCommand (command, rigId, ...rest) {
    var rig = this.rigs.get(rigId)
    if (!rig) {
      console.warn('E-CL-RG-404', rigId) // rig not found
      return
    }
    var renderable = rig.renderable
    if (!renderable) {
      console.warn('E-CL-RG-RD', rigId) // renderable not found
      return
    }
    // Commands ordered by priority.
    if (command === 'po') {
      this.setRigPose(rig, renderable, rest[0])
      return
    }
    console.warn('E-CL-RG-CM', command, rigId, rest)
  }

  collectionCommand (command, ...rest) {
    var [collectionId, data] = rest // TODO: optimize
    if (!collectionId || !data || !data.id) {
      console.warn('E-CL-CC-PAR', command, ...rest)
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
    console.warn('E-CL-COL', command)
  }

  setRigPose (rig, renderable, poseId) {
    var skeleton = rig.skeleton
    if (!skeleton) {
      console.warn('E-CL-PO-400', rig.id) // not poseable
      return
    }
    var pose = this.poses.get(poseId)
    if (!pose) {
      console.warn('E-CL-PO-404', poseId) // pose not found
      return
    }
    if (!pose.compatibleWithRig(rig)) {
      console.warn('E-CL-PO-SL', rig.id, pose.id) // pose not compatible
      return
    }
    this.setRenderablePose(rig, renderable, pose)
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

  setRenderablePose (rig, renderable, pose) {
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
    this.rendering = false
    if (this.worker) {
      this.worker.terminate()
      this.worker = null
    }
    this.disposeCollections()
    this.counter.free()
    this.fps.free()
    this.nextFrameFn = null
    this.camera = null
    this.render = null
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
