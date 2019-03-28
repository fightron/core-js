import { ArrayCollection } from './ArrayCollection';
import { Bone } from '../3d/Bone';

export class BoneCollection extends ArrayCollection {
  add (/* one Bone */ data) {
    var bone = new Bone(this.owner);
    bone.patch(data);
    super.add(bone);
  }
}
