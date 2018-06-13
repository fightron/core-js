'use strict'

const expect = require('chai').expect
const CharacterResource = require('../../resources/CharacterResource')

describe('resources/CharacterResource', function () {
  it('initializes with default properties', function () {
    var resource = new CharacterResource()
    expect(resource.isCharacterResource).to.equal(true)
    expect(resource.meters.get('hp').current).to.be.above(1)
  })

  describe('#free', function () {
    it('frees all collections', function () {
      var resource = new CharacterResource()
      resource.free()
      expect(resource.meters).to.equal(null)
    })
  })
})
