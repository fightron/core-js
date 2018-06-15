'use strict'

const BaseResource = require('./BaseResource')
const MeterCollection = require('../collections/MeterCollection')

class CharacterResource extends BaseResource {
  constructor () {
    super()
    this._type = 'ch'
    this.isCharacterResource = true // internal optimization

    // Data Properties
    this.attributes = null
    this.skills = null

    // Runtime Properties
    this.meters = null
    this.enemy = null
  }

  prepareMeters () {
    this.meters = new MeterCollection(this)
  }

  input (inputCode) {
    // passes inputCode onto character
  }

  free () {
    this.freeMeters()
    this.freeAttributes()
    super.free()
  }

  freeAttributes () {
    if (this.attributes === null) {
      return
    }
    this.attributes.free()
    this.attributes = null
  }

  freeMeters () {
    if (this.meters === null) {
      return
    }
    this.meters.free()
    this.meters = null
  }
}

module.exports = CharacterResource
