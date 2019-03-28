import { expect } from 'chai';
import { Bone } from '../../3d/Bone';
import { SkeletonResource } from '../../resources/SkeletonResource';

describe('3d/Bone', function () {
  var skeleton = new SkeletonResource();
  skeleton.bones.add({ id: 'root' });
  var root = skeleton.bones.find('root');

  describe('constructor', function () {
    it('fails without skeleton instance', function () {
      var fn1 = () => { return new Bone(); };
      var fn2 = () => { return new Bone({}); };
      expect(fn1).to.throw('BONE_REQUIRES_SKELETON');
      expect(fn2).to.throw('BONE_REQUIRES_SKELETON');
    });

    it('initializes with correct defaults', function () {
      var bone = new Bone(skeleton);
      expect(bone.skeleton).to.equal(skeleton);
      expect(bone.id).to.equal(null);
      expect(bone.parent).to.equal(null);
      expect(bone.rotationOrder).to.equal('XYZ');
      expect(bone.position.isVector3).to.equal(true);
      expect(bone.isBone).to.equal(true);
    });
  });

  describe('patch', function () {
    it('sets id', function () {
      var bone = new Bone(skeleton);
      bone.patch({ id: 'Bone1' });
      expect(bone.id).to.equal('Bone1');
    });

    it('sets parent', function () {
      var bone = new Bone(skeleton);
      bone.patch({ id: 'Bone2', par: 'root' });
      expect(bone.parent).to.equal(root);
    });

    it('sets position', function () {
      var bone = new Bone(skeleton);
      bone.patch({ id: 'Bone3', p: { x: 1, y: 2, z: 3 } });
      expect(bone.position.x).to.equal(1);
      expect(bone.position.y).to.equal(2);
      expect(bone.position.z).to.equal(3);
    });

    it('sets rotationOrder', function () {
      var bone = new Bone(skeleton);
      bone.patch({ id: 'Bone5', rO: 'YXZ' });
      expect(bone.rotationOrder).to.equal('YXZ');
    });
  });
});
