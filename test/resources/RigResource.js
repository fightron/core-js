import { expect } from 'chai';
import { RigResource } from '../../resources/RigResource';
import { Client } from '../../client';

import triangleGeometry from '../fixtures/geometries/triangle';
import oneTriangleSchematic from '../fixtures/schematics/one-triangle';
import oneTriangleItem from '../fixtures/items/one-triangle';
import triangleHumanRig from '../fixtures/rigs/triangle-human';
import humanSkeleton from '../../data/skeletons/human';

describe('resources/RigResource', function () {
  it('initializes with default properties', function () {
    var resource = new RigResource();
    expect(resource.isRigResource).to.equal(true);
  });

  describe('#patch', function () {
    before(function () {
      this.client = new Client();
      this.client.initialize();
      this.client.command('+', 'g', triangleGeometry);
      this.client.command('+', 's', oneTriangleSchematic);
      this.client.command('+', 'i', oneTriangleItem);
      this.client.command('+', 'sl', humanSkeleton);
      this.client.command('+', 'r', triangleHumanRig);
      this.resource = this.client.rigs.find('triangle-human');
    });

    it('loads items as RigItem', function () {
      for (var item of this.resource.items) {
        expect(item.rig).to.equal(this.resource);
        expect(item.isRigItem).to.equal(true);
      }
    });

    it('loads correct items', function () {
      expect(this.resource.items[0].item.id).to.equal('one-triangle');
      expect(this.resource.items[0].slot).to.equal('H');
    });

    it('loads correct skeleton', function () {
      expect(this.resource.skeleton.id).to.equal('h');
    });
  });

  describe('#free', function () {
    before(function () {
      this.resource = new RigResource();
      this.resource.free();
    });

    it('sets skeleton to null', function () {
      expect(this.resource.skeleton).to.equal(null);
    });

    it('frees items', function () {
      expect(this.resource.items).to.equal(null);
    });
  });
});
