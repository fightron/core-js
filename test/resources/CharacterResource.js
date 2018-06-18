import {expect} from 'chai'
import {CharacterResource} from '../../resources/CharacterResource'

describe('resources/CharacterResource', function () {
  it('initializes with default properties', function () {
    var resource = new CharacterResource()
    expect(resource.isCharacterResource).to.equal(true)
    expect(resource.meters).to.equal(null)
    expect(resource.attributes).to.equal(null)
  })

  describe('#free', function () {
    it('frees all collections', function () {
      var resource = new CharacterResource()
      resource.free()
      expect(resource.meters).to.equal(null)
      expect(resource.attributes).to.equal(null)
    })
  })
})
