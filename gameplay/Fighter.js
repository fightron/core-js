import { Base } from '../lib/Base'
import { FighterMeterCollection } from '../collections/FighterMeterCollection'
import { CharacterBuildResource } from '../resources/CharacterBuildResource'

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

    // populated by team.fighters.create()
    this.match = null
    this.team = null
    this.allies = []
    this.enemies = []

    // character position on screen
    this.positionX = 0
    this.positionY = 0

    // temporary position, used for shake effects
    this.temporaryX = 0
    this.temporaryY = 0

    // orientation, 1 = facing left, -1 = facing right
    this.orientation = 1
  }

  get x () {
    return this.positionX + this.temporaryX
  }

  get y () {
    return this.positionY + this.temporaryY
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

  sendToClient () {
    var game = this.team.match.game
    var rig = this.rigData
    game.sendToClient('+', 'r', rig)
    game.sendToClient('v', rig.id, false)
    game.sendToClient('p', rig.id, this.x, this.y)
    game.sendToClient('r', rig.id, null, (this.orientation === 1) ? Math.PI / 2 : -Math.PI / 2)
    game.sendToClient('am', rig.id, 'test-animation')
    game.sendToClient('v', rig.id, true)
  }
}
