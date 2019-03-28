import { expect } from 'chai';
import { CharacterResource } from '../../resources/CharacterResource';

describe('resources/CharacterResource', function () {
  it('initializes with default properties', function () {
    var resource = new CharacterResource();
    expect(resource.isCharacterResource).to.equal(true);
  });

  describe('#free', function () {
    before(function () {
      this.resource = new CharacterResource();
      this.resource.free();
    });

    it('sets skeleton to null', function () {
      expect(this.resource.skeleton).to.equal(null);
    });
  });
});
