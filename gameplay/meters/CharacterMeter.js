import { Meter } from '../Meter'

export class CharacterMeter extends Meter {
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
