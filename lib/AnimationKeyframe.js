import { Base } from './Base'
import { PoseResource } from '../resources/PoseResource'

export class AnimationKeyframe extends Base {
  constructor (animationResource) {
    super()
    this.animation = animationResource
    this.isAnimationKeyframe = true
    this.frame = null // frame number
    this.poses = []
    this.pose = new PoseResource() // merged pose
    this.reset = true
  }
}
