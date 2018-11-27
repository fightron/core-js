import { MapCollection } from './MapCollection'
import { AnimationKeyframe } from '../lib/AnimationKeyframe'

export class AnimationKeyframeCollection extends MapCollection {
  add (/* one AnimationKeyframe */ data) {
    var keyframe = new AnimationKeyframe(data, this.owner)
    this.push(keyframe)
    this.dictionary.set(keyframe.id, keyframe)
  }
}
