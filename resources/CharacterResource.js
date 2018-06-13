'use strict'

const BaseResource = require('./BaseResource')

class CharacterResource extends BaseResource {
  constructor () {
    super()
    this.isCharacterResource = true // internal optimization
  }
}

module.exports = CharacterResource
