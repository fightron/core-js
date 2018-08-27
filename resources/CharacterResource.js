import {BaseResource} from './BaseResource'

import {AttributeCollection} from '../collections/AttributeCollection'
import {MeterCollection} from '../collections/MeterCollection'
import {SkillCollection} from '../collections/SkillCollection'

export class CharacterResource extends BaseResource {
  constructor () {
    super()
    this._type = 'Ch'
    this.isCharacterResource = true // internal optimization

    // Data Properties
    this.attributes = null
    this.skills = null

    // Runtime Properties
    this.meters = null
    this.enemies = []
  }

  prepareAttributes () {
    if (this.attributes) return
    this.attributes = new AttributeCollection(this)
  }

  prepareMeters () {
    if (this.meters) return
    this.meters = new MeterCollection(this)
  }

  prepareSkills () {
    if (this.skills) return
    this.skills = new SkillCollection(this)
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
