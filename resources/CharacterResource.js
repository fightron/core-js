'use strict'

const BaseResource = require('./BaseResource')
const MeterCollection = require('../collections/MeterCollection')

class CharacterResource extends BaseResource {
  constructor () {
    super()
    this._type = 'ch'
    this.isCharacterResource = true // internal optimization
    this.meters = new MeterCollection(this)
  }

  free () {
    this.meters.free()
    this.meters = null
    super.free()
  }
}

module.exports = CharacterResource
