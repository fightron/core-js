'use strict'

const BaseMeter = require('./BaseMeter')

class CharacterMeter extends BaseMeter {
  constructor (characterResource) {
    if (!characterResource || !characterResource.isCharacterResource) {
      throw new Error('CHARACTER_METER_REQUIRES_CHARACTER_RESOURCE')
    }
    super()
    this.character = characterResource
  }

  free () {
    this.character = null
    super.free()
  }
}

module.exports = CharacterMeter
