import {expect} from 'chai'
import {CharacterMeter} from '../../../gameplay/meters/CharacterMeter'
import {CharacterResource} from '../../../resources/CharacterResource'

// TODO: move to behavior

describe('meters/CharacterMeter', function () {
  it('initializes with correct defaults', function () {
    var character = new CharacterResource()
    var meter = new CharacterMeter(character)
    expect(meter.character).to.equal(character)
  })

  it('raises an error if no characterResource instance is given', function () {
    expect(() => { return new CharacterMeter() }).to.throw('CHARACTER_METER_REQUIRES_CHARACTER_RESOURCE')
    expect(() => { return new CharacterMeter({}) }).to.throw('CHARACTER_METER_REQUIRES_CHARACTER_RESOURCE')
  })

  describe('#free', function () {
    it('removes character reference', function () {
      var character = new CharacterResource()
      var meter = new CharacterMeter(character)
      meter.free()
      expect(meter.character).to.equal(null)
    })
  })
})
