import sha256 from 'crypto-js/sha256';
import { expect } from 'chai';
import { BaseResource } from '../../resources/BaseResource';

describe('resources/BaseResource', function () {
  it('initializes with correct properties', function () {
    var resource = new BaseResource();
    expect(resource.id).to.equal(null);
    expect(resource.type).to.equal(null);
    expect(resource.path).to.equal(null);
    expect(resource.isResource).to.equal(true);
  });

  describe('#path', function () {
    it('is updated when ID or type changes', function () {
      var resource = new BaseResource();
      resource.id = '0123';
      resource.type = 'characters';
      expect(resource.path).to.equal('characters/0123');
      resource.id = 456; // accepts integers too
      resource.type = 'items';
      expect(resource.path).to.equal('items/456');
      resource.id = null;
      expect(resource.path).to.equal(null);
      resource.id = undefined;
      expect(resource.path).to.equal(null);
      resource.id = '789';
      resource.type = null;
      expect(resource.path).to.equal(null);
    });
  });

  describe('#filename', function () {
    it('returns storage file path', function () {
      var sha123 = sha256('123').toString();
      var resource = new BaseResource();
      resource.id = '123';
      resource.type = 'characters';
      expect(resource.filename).to.equal(`characters/123/${sha123}.json`);
    });

    it('returns null if path is null', function () {
      var resource = new BaseResource();
      resource.id = '123';
      expect(resource.filename).to.equal(null);
    });
  });

  describe('#patch', function () {
    it('updates resource ID', function () {
      var resource = new BaseResource();
      resource.patch({ id: 123 });
      expect(resource.id).to.equal('123');
      resource.patch({}); // only updates present attributes
      expect(resource.id).to.equal('123');
      resource.patch({ id: 0 });
      expect(resource.id).to.equal('0');
    });
  });

  describe('#identity', function () {
    it('returns the resource ID', function () {
      var resource = new BaseResource();
      resource.id = 123;
      expect(resource.identity()).to.equal('123');
    });
  });

  describe('#fingerprint', function () {
    it("returns a sha-256 hash of the resource's identity()", function () {
      var sha123 = sha256('123').toString();
      var sha456 = sha256('456').toString();
      var resource = new BaseResource();
      resource.id = 123;
      expect(resource.fingerprint()).to.equal(sha123);
      resource.id = 456;
      expect(resource.fingerprint()).to.equal(sha456);
      resource.id = 123;
      expect(resource.fingerprint()).to.equal(sha123); // should revert to previous fingerprint
    });
  });
});
