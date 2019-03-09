import { Base } from '@fightron/utils/Base'
import { FighterMeterCollection } from '../collections/FighterMeterCollection'
import { CharacterBuildResource } from '../resources/CharacterBuildResource'
import { FighterCollision } from './FighterCollision'

// A Fighter is a runtime version of a Character Build.
export class Fighter extends Base {
  constructor () {
    super()
    this.isFighter = true
    this.build = new CharacterBuildResource()
    this.rigData = null

    // ID will be the same as build's
    this.id = null
    this.meters = new FighterMeterCollection(this)

    // character position on screen
    this.positionX = 0
    this.positionY = 0

    // temporary position, used for shake effects
    this.temporaryX = 0
    this.temporaryY = 0

    // orientation, 1 = facing left, -1 = facing right
    this.orientation = 1

    // Collision system
    this.collision = new FighterCollision()
  }

  get x () {
    return this.positionX + this.temporaryX
  }

  get y () {
    return this.positionY + this.temporaryY
  }

  input (event) {
    console.log(`[Fighter#${this.id}] received input`, event)
  }

  compute () {
    if (!this.build) {
      console.warn('E-FT-CP-BLD')
      return false
    }
    this.id = this.build.id
    // computes build's meters and attributes
    // requires allies and enemies to be present
  }
}
