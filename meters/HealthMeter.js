'use strict'

const CharacterMeter = require('./CharacterMeter')

const DEFAULT_HEALTH = 800

class HealthMeter extends CharacterMeter {
  constructor (characterResource) {
    super(characterResource)
    this.minimum = 0
    this.maximum = DEFAULT_HEALTH
    this.current = DEFAULT_HEALTH
  }
}

module.exports = HealthMeter
