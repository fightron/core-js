'use strict'

const expect = require('chai').expect
const HealthMeter = require('../../meters/HealthMeter')
const CharacterResource = require('../../resources/CharacterResource')

describe('meters/HealthMeter', function () {
  it('initializes with correct defaults', function () {
    var character = new CharacterResource()
    var meter = new HealthMeter(character)
    expect(meter.character).to.equal(character)
    expect(meter.minimum).to.equal(0)
    expect(meter.maximum).to.equal(800)
  })
})
