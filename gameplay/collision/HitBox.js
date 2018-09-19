import { CharacterBox } from './CharacterBox'

export class HitBox extends CharacterBox {
  constructor () {
    super(...arguments)
    this.reset()
  }

  reset () {
    // True if this hit must be blocked while crouching.
    this.low = false

    // True if this hit must be blocked while standing.
    this.overhead = false

    // True if this hit cannot be blocked.
    this.unblockable = false

    // Damage to enemy Health on hit.
    this.healthDamage = 0

    // Damage to enemy Shields on block.
    this.shieldDamage = 0

    // Damage to enemy Focus on hit.
    this.focusDamage = 0

    // Damage to enemy Health on block.
    this.chipDamage = 0

    // Amount of SP gained on collision.
    this.specialGainOnHit = 0
    this.specialGainOnBlock = 0

    // Amount of Revenge gained on collision.
    this.revengeGainOnHit = 0
    this.revengeGainOnBlock = 0

    // Hit region. Determines enemy blocking stance. Possible values:
    // 'l' = hits low, must be blocked crouching
    // 'm' = hits mid, any blocking stance will work
    // 'h' = hits high (overhead), must be blocked standing
    this.region = 'm'

    // Hit stun. Possible values:
    // 'l' = light stun
    // 'm' = medium stun
    // 'h' = heavy stun
    this.stun = 'l'

    // Freeze frames (both attacker and victim).
    this.freezeOnHit = 0
    this.freezeOnBlock = 0

    // Sends the enemy into the air.
    this.juggle = false

    // Sends the enemy high into the air.
    this.launch = false

    // Enemy will be defeated on hit.
    this.lethalOnHit = true

    // Enemy will be defeated on block if Chip Damage causes
    //   their Health to drop below zero.
    this.lethalOnBlock = false

    // Hit direction.
    // Determines reaction animation to be played by enemy.
    // Possible values:
    // 'd' = default (no particular direction, used for grazes, scratches, etc)
    // 'f' = front (hits the target's front area)
    // 'l' = left (hits the target's left area)
    // 'r' = right (hits the target's right area)
    // 'b' = bottom (hits the target from below, as in an uppercut)
    // 't' = top (hits the target from above, as in overheads)
    this.direction = 'd'
  }

  onCollision (targetBox) {
    var character = this.character
    var characterMeters = character.meters
    var victim = targetBox.character
    var victimMeters = victim.meters
    if (targetBox.canGuard(this)) {
      victimMeters.enqueue('hp', -this.chipDamage, this.lethalOnBlock)
      victimMeters.enqueue('sh', -this.shieldDamage)
      characterMeters.enqueue('sp', this.specialGainOnBlock)
      characterMeters.enqueue('rv', this.revengeGainOnBlock)
      character.freeze(this.freezeOnBlock)
      victim.freeze(this.freezeOnBlock)
    } else {
      victimMeters.enqueue('hp', -this.healthDamage, this.lethalOnHit)
      victimMeters.enqueue('fp', -this.focusDamage)
      characterMeters.enqueue('sp', this.specialGainOnHit)
      characterMeters.enqueue('rv', this.revengeGainOnHit)
      character.freeze(this.freezeOnHit)
      victim.freeze(this.freezeOnHit)
    }

    //
  }
}
