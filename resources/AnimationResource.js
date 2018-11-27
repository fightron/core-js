import { BaseResource } from './BaseResource'
import { AnimationKeyframeCollection } from '../collections/AnimationKeyframeCollection'

export class AnimationResource extends BaseResource {
  constructor () {
    super()
    this._type = 'Ani'
    this.name = null
    this.isAnimationResource = true // internal optimization
    this.skeleton = null
    this.counter = null
    this.length = null
    this.keyframes = new AnimationKeyframeCollection(this)
  }

  patch (data, _client) {
    if (!data) return
    super.patch(data)
    this.name = data.n
    this.keyframes.load(data.k)
  }

  free () {
    this.keyframes.free()
    this.keyframes = null
    super.free()
  }
}
