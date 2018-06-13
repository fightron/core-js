'use strict'

const BaseCollection = require('./BaseCollection')
const HealthMeter = require('../meters/HealthMeter')

class MeterCollection extends BaseCollection {
  constructor (characterResource) {
    super(characterResource)
    this.set('hp', new HealthMeter(characterResource))
  }

  free () {
    this.get('hp').free()
    this.clear()
  }
}

module.exports = MeterCollection
