'use strict'

const expect = require('chai').expect
const CharacterResource = require('../../resources/CharacterResource')

describe('resources/CharacterResource', function () {
  it('initializes with correct properties', function () {
    var resource = new CharacterResource()
    expect(resource.isCharacterResource).to.equal(true)
  })
})
