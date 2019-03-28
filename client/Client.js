'use strict';

import { Base } from '@fightron/utils/Base';
import { Counter } from '@fightron/utils/Counter';
import { Fps } from '../lib/Fps';
import { ClientCollection } from '../collections/ClientCollection';
import { ItemCollection } from '../collections/ItemCollection';
import { GeometryResource } from '../resources/GeometryResource';
import { SchematicResource } from '../resources/SchematicResource';
import { ItemResource } from '../resources/ItemResource';
import { SkeletonResource } from '../resources/SkeletonResource';
import { RigResource } from '../resources/RigResource';
import { PoseResource } from '../resources/PoseResource';
import { AnimationResource } from '../resources/AnimationResource';

const NOOP = () => {};

export class Client extends Base {
  constructor () {
    super();
    this.isClient = true;
    this.rendering = false;
    this.color = '#7da3be';
    this.shadows = true;
    this.hud = null;
    this.inputs = [];
    this.worker = null;
    this.counter = new Counter();
    this.fps = new Fps(120);
    this.commandFps = new Fps(120);
    this.nextFrameFn = animationFrameFn; // can be overwritten by clients
    this.render = this.render.bind(this);
  }

  initialize () {
    this.initializeCollections();
    this.initializeInputs();
  }

  initializeCollections () {
    this.geometries = new ClientCollection(this, 'g', GeometryResource);
    this.schematics = new ClientCollection(this, 's', SchematicResource);
    this.items = new ItemCollection(this, 'i', ItemResource);
    this.skeletons = new ClientCollection(this, 'sl', SkeletonResource);
    this.rigs = new ClientCollection(this, 'r', RigResource);
    this.poses = new ClientCollection(this, 'po', PoseResource);
    this.animations = new ClientCollection(this, 'am', AnimationResource);
    this.sounds = new ClientCollection(this, 'snd');
  }

  initializeInputs () {
    // overwritten by subclasses
  }

  render () {
    if (!this._rendering) {
      return;
    }
    this.nextFrameFn(this.render);
    this.fps.start();
    this.renderFrame();
    this.fps.end();
  }

  renderFrame () {
    // defined in subclasses
  }

  set rendering (v) {
    this._rendering = !!v;
    if (this._rendering) {
      this.render();
    }
  }

  get rendering () {
    return this._rendering;
  }

  set worker (worker) {
    if (this._worker) {
      this.send('cl', 'dc');
      this._worker.onmessage = NOOP;
      this._worker = null;
    }
    if (worker) {
      this._worker = worker;
      this._worker.onmessage = this.receive.bind(this);

      // Client connected
      this.send('cl', 'cn');

      // Register inputs
      for (var input of this.inputs) {
        this.send('cl', 'in', input.id);
      }
    } else {
      this._worker = null;
    }
  }

  get worker () {
    return this._worker;
  }

  // Sends a message to the game worker.
  send (...message) {
    if (!this._worker) {
      console.warn('E-CL-WRK', message);
      return;
    }
    this._worker.postMessage(JSON.stringify(message));
  }

  // Receives a message from the game worker or other external sources.
  receive (/* Worker Event */ event) {
    // event.data is a JSON string. See:
    // -- https://nolanlawson.com/2016/02/29/high-performance-web-worker-messages/
    this.commandFps.start();
    try {
      var [command, ...rest] = JSON.parse(event.data); // TODO: optimize
    } catch (e) {
      console.warn('E-CL-REC', event);
      return;
    }
    this.command(command, ...rest);
    this.commandFps.end();
  }

  command (command, ...rest) {
    // ifs are faster than hash lookups due to command priority.
    // The most often-issued commands come first.
    if (command === 'f') {
      this.setFrameNumber(rest[0]);
      // TODO: frame subcommands
      this.updateAnimations();
      return;
    }
    if (command === 'am' || command === 'po') {
      this.rigCommand(command, ...rest);
      return;
    }
    if (command === 'p' ||
        command === 'p+' ||
        command === 'r' ||
        command === 'r+' ||
        command === 'v') {
      this.itemCommand(command, ...rest);
      return;
    }
    if (command === 'cam') {
      this.cameraCommand(...rest);
      return;
    }
    if (command === '+' || command === '-') {
      this.collectionCommand(command, ...rest);
      return;
    }
    // Less important item commands.
    if (command === '>' || command === 'q' || command === 's') {
      this.itemCommand(command, ...rest);
      return;
    }
    console.warn('E-CL-CM', command, ...rest);
  }

  cameraCommand (command, ...rest) {
    if (command === 'p') {
      this.setCameraPosition(...rest);
      return;
    }
    if (command === 'r') {
      this.setCameraRotation(...rest);
      return;
    }
    if (command === 't') {
      this.setCameraTarget(...rest);
      return;
    }
    if (command === '>') {
      this.setCameraParent(...rest);
      return;
    }
    console.warn('E-CL-CAM', command);
  }

  itemCommand (command, itemId, ...rest) {
    var item = this.items.get(itemId);
    if (!item) {
      console.warn('E-CL-IC-404', itemId);
      return;
    }
    var renderable = item.renderable;
    if (!renderable) {
      console.warn('E-CL-IC-RND', itemId);
      return;
    }
    // Commands ordered by priority.
    if (command === 'p') {
      this.setRenderablePosition(renderable, ...rest);
      return;
    }
    if (command === 'r') {
      this.setRenderableRotation(renderable, ...rest);
      return;
    }
    if (command === 'po') {
      this.setRigPose(item, ...rest);
      return;
    }
    if (command === 'v') {
      this.setRenderableVisibility(renderable, ...rest);
      return;
    }
    console.warn('E-CL-IM', command, itemId, rest);
  }

  rigCommand (command, rigId, ...rest) {
    var rig = this.rigs.get(rigId);
    if (!rig) {
      console.warn('E-CL-RG-404', rigId); // rig not found
      return;
    }
    var renderable = rig.renderable;
    if (!renderable) {
      console.warn('E-CL-RG-RD', rigId); // renderable not found
      return;
    }
    // Commands ordered by priority.
    if (command === 'am') {
      this.setRigAnimation(rig, renderable, rest[0]);
      return;
    }
    if (command === 'po') {
      this.setRigPose(rig, renderable, rest[0]);
      return;
    }
    console.warn('E-CL-RG-CM', command, rigId, rest);
  }

  collectionCommand (command, ...rest) {
    var [collectionId, data] = rest; // TODO: optimize
    if (!collectionId) {
      console.warn('E-CL-CC-ID', command, ...rest);
      return;
    }
    if (!data || !data.id) {
      console.warn('E-CL-CC-DT', command, ...rest);
      return;
    }
    var collection = this[collectionId];
    if (!collection) {
      return;
    }
    if (command === '+') {
      collection.add(data);
      return;
    }
    if (command === '-') {
      collection.remove(data.id);
      return;
    }
    console.warn('E-CL-COL', command, rest);
  }

  setRigAnimation (rig, renderable, animationId) {
    var animation = this.animations.get(animationId);
    if (!animation) {
      console.warn('E-CL-AM-404', animationId); // animation not found
      return;
    }
    rig.animation = animation;
    rig.animationStart = this.counter.current;
    this.updateAnimation(rig);
  }

  setRigPose (rig, renderable, poseId) {
    var skeleton = rig.skeleton;
    if (!skeleton) {
      console.warn('E-CL-PO-400', rig.id); // not poseable
      return;
    }
    var pose = this.poses.get(poseId);
    if (!pose) {
      console.warn('E-CL-PO-404', poseId); // pose not found
      return;
    }
    if (!pose.compatibleWithRig(rig)) {
      console.warn('E-CL-PO-SL', rig.id, pose.id); // pose not compatible
      return;
    }
    this.setRenderablePose(rig, renderable, pose);
  }

  setFrameNumber (frameNumber) {
    this.counter.set(frameNumber);
  }

  setRenderablePosition (renderable, x, y, z) {
    // defined in subclasses
  }

  setRenderableRotation (renderable, x, y, z) {
    // defined in subclasses
  }

  setRenderableVisibility (renderable, visible) {
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

  updateAnimations () {
    for (var rig of this.rigs) {
      this.updateAnimation(rig[1]); // rigs is a Map, not Array
    }
  }

  updateAnimation (rig) {
    var animation = rig.animation;
    if (!animation) {
      return;
    }
    var renderable = rig.renderable;
    if (!renderable) {
      return;
    }
    var keyframe = animation.keyframes.findByGlobalFrames(rig.animationStart, this.counter.current);
    if (!keyframe) {
      return;
    }
    var pose = keyframe.pose;
    if (!pose) {
      console.warn('E-CL-UA-AMKF', animation.id, keyframe.frame);
      return;
    }
    this.setRenderablePose(rig, renderable, pose);
  }

  onInput (handler, event) {
    this.send('i', handler.id, event);
  }

  dispose () {
    this.rendering = false;
    this.disposeInputs();
    if (this.worker) {
      this.send('cl', 'dc');
      this.worker.terminate();
      this.worker = null;
    }
    this.disposeCollections();
    this.counter.free();
    this.fps.free();
    this.commandFps.free();
    this.nextFrameFn = null;
    this.camera = null;
    this.render = null;
    super.free();
  }

  disposeInputs () {
    //
  }

  disposeCollections () {
    this.sounds.free();
    this.animations.free();
    this.poses.free();
    this.items.free();
    this.schematics.free();
    this.geometries.free();

    this.sounds = null;
    this.animations = null;
    this.poses = null;
    this.items = null;
    this.schematics = null;
    this.geometries = null;
  }
} // eslint-disable-line semi

const defaultFrameInterval = 1000 / 60;

/* istanbul ignore next */
function animationFrameFn (fn) {
  setInterval(fn, defaultFrameInterval);
}
