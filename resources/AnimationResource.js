import { BaseResource } from './BaseResource'
import { AnimationKeyframeCollection } from '../collections/AnimationKeyframeCollection'

export class AnimationResource extends BaseResource {
  constructor () {
    super()
    this._type = 'Am'
    this.name = null
    this.isAnimationResource = true // internal optimization
    this.skeleton = null
    this.counter = null
    this.length = null
    this.keyframes = new AnimationKeyframeCollection(this)
  }

  patch (data, client) {
    if (!data) return
    super.patch(data)
    this.name = data.n
    this.keyframes.patch(data.k, client)
  }

  free () {
    this.keyframes.free()
    this.keyframes = null
    super.free()
  }
}
