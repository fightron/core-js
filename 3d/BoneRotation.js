import { Base } from '@fightron/utils/Base';

export class BoneRotation extends Base {
  constructor (poseResource) {
    if (!poseResource) {
      throw new Error('F-BR-PR'); // Fatal: BoneRotation requires BoneResource
    }
    super();
    this.pose = poseResource;
    this.isBoneRotation = true;
    this.id = null; // Bone ID
    this.position = false;
    this.x = 0;
    this.y = 0;
    this.z = 0;
  }

  patch (data) {
    var boneId = data.id;
    if (boneId) {
      var skeleton = this.pose.skeleton;
      if (skeleton) {
        var bone = skeleton.bones.find(boneId);
        if (!bone) {
          console.warn('E-BR-SK-BN', skeleton.id, boneId);
        } else {
          this.id = boneId;
        }
      }
    }
    if (data.x) this.x = data.x;
    if (data.y) this.y = data.y;
    if (data.z) this.z = data.z;
    if (data.p) this.position = true;
  }
}
