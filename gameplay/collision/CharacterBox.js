import AARectangle from 'aa-rectangle-javascript'

export class CharacterBox extends AARectangle {
  constructor (character) {
    super()
    this.character = character // CharacterResource
  }

  canGuard (hitBox) {
    return false
  }
}
