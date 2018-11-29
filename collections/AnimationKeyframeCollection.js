import { MapCollection } from './MapCollection'
import { AnimationKeyframe } from '../lib/AnimationKeyframe'

export class AnimationKeyframeCollection extends MapCollection {
  add (/* one AnimationKeyframe */ data, client) {
    var keyframe = new AnimationKeyframe(this.owner)
    keyframe.patch(data, client)
    super.add(keyframe, keyframe.frame)
  }

  patch (data, client) {
    if (!data) return
    for (var k of data) {
      this.add(k, client)
    }
  }
}
