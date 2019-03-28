import { expect } from 'chai';
import { MapCollection } from '../../collections/MapCollection';

describe('collections/MapCollection', function () {
  before(function () {
    this.collection = new MapCollection();
  });

  describe('#add', function () {
    it('adds item to collection', function () {
      this.collection.add({ id: '1', name: 'abc' });
      expect(this.collection.get('1').name).to.equal('abc');
    });
  });
});
