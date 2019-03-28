import { Base } from '@fightron/utils/Base';
import { PoseResource } from '../resources/PoseResource';

export class AnimationKeyframe extends Base {
  constructor (animationResource) {
    super();
    this.animation = animationResource;
    this.isAnimationKeyframe = true;
    this.frame = null; // frame number
    this.poses = [];
    this.pose = new PoseResource(); // merged pose
    this.reset = true;
    this.interpolated = false;
  }

  patch (data, client) {
    if (data.f) {
      this.frame = data.f;
      this.pose.id = `AKF-${this.animation.id}-${data.f}`;
    }
    if (data.r) this.reset = data.r;
    this.patchPoses(data.p, client);
  }

  patchPoses (poseIds, client) {
    if (!poseIds) return;
    var pose;
    for (var poseId of poseIds) {
      pose = client.poses.find(poseId);
      if (!pose) {
        console.warn('E-AK-PO', this.animation.id, poseIds);
        continue;
      }
      this.poses.push(pose);
    }
    this.pose.clear();
    for (pose of this.poses) {
      this.pose.merge(pose);
    }
  }
}
