import { expect } from 'chai';
import { SkeletonResource } from '../../resources/SkeletonResource';

import humanSkeleton from '../../data/skeletons/human';

describe('resources/SkeletonResource', function () {
  describe('constructor', function () {
    it('initializes with default properties', function () {
      var resource = new SkeletonResource();
      expect(resource._type).to.equal('Sl');
      expect(resource.name).to.equal(null);
      expect(resource.isSkeletonResource).to.equal(true);
      expect(resource.bones.isArrayCollection).to.equal(true);
    });
  });

  describe('patch', function () {
    before(function () {
      this.resource = new SkeletonResource();
      this.resource.patch(humanSkeleton);
    });

    it('sets name', function () {
      expect(this.resource.name).to.equal('Human');
    });

    it('loads bones', function () {
      expect(this.resource.bones).to.have.length.above(0);
      var root = this.resource.bones[0];
      expect(root.isBone).to.equal(true);
    });
  });

  describe('free', function () {
    it('sets bones to null', function () {
      var resource = new SkeletonResource();
      resource.free();
      expect(resource.bones).to.equal(null);
    });
  });
});
