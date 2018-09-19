import { CharacterBox } from './CharacterBox'

export class GuardBox extends CharacterBox {
  constructor () {
    super(...arguments)
    this.isGuardBox = true
    this.reset()
  }

  reset () {
    // Block region. Possible values:
    // 'l' - crouching block. Vulnerable to overheads.
    // 'm' - omnidirectional block. Blocks overheads and lows.
    // 'h' - standing block. Vulnerable to lows.
    this.region = 'h'

    // Just-frame block.
    // Block skills will set this flag during the first frames.
    this.just = false
  }

  canGuard (hitBox) {
    if (hitBox.unblockable) {
      return false
    }
    if (hitBox.region === 'h' && this.region === 'l') {
      return false
    }
    if (hitBox.region === 'l' && this.region === 'h') {
      return false
    }
    return true
  }

  // Apply reaction skills, damage to character, etc.
  onCollision (hitBox) {
    var character = this.character
    character.incrementHealth(-hitBox.chipDamage, hitBox.lethalOnBlock)
  }
}
