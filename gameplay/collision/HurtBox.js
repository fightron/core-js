import { CharacterBox } from './CharacterBox'

export class HurtBox extends CharacterBox {
  constructor () {
    super(...arguments)
    this.isHurtBox = true
    this.reset()
  }

  reset () {
    //
  }
}
