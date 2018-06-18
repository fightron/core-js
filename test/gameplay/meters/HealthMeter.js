import {expect} from 'chai'
import {HealthMeter} from '../../../gameplay/meters/HealthMeter'
import {CharacterResource} from '../../../resources/CharacterResource'

describe('meters/HealthMeter', function () {
  it('initializes with correct defaults', function () {
    var character = new CharacterResource()
    var meter = new HealthMeter(character)
    expect(meter.character).to.equal(character)
    expect(meter.minimum).to.equal(0)
    expect(meter.maximum).to.equal(800)
  })
})
