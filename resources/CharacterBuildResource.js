import { BaseResource } from './BaseResource'

export class CharacterBuildResource extends BaseResource {
  constructor () {
    super()
    this._type = 'ChB'
    this.isCharacterBuildResource = true // internal optimization
    this.character = null // CharacterResource instance
  }

  patch (data, game) {
    super.patch(data)
    var characterId = data.ch
    if (!characterId) {
      console.warn('E-CBR-CHR')
      return
    }
    var character = game.characters.get(characterId)
    if (!character) {
      console.warn('E-CBR-CH')
      return
    }
    this.character = character
    this.patchMeters(data)
    this.patchAttributes(data)
    this.patchEnhancements(data)
  }

  patchMeters (data) {
    //
  }

  patchAttributes (data) {
    //
  }

  patchEnhancements (data) {
    //
  }

  free () {
    this.character = null
    super.free()
  }
}
