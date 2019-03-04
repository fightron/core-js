import { BaseMatch } from './BaseMatch'
import { MatchTeamCollection } from '../collections/MatchTeamCollection'
import { MatchRoundCollection } from '../collections/MatchRoundCollection'

export class FightingMatch extends BaseMatch {
  constructor (game) {
    super(game)
    this.initialize()
  }

  initialize () {
    this.freeCollections()
    this.teams = new MatchTeamCollection(this)
    this.rounds = new MatchRoundCollection(this)

    // Match Type
    // v = 1v1
    // t = team (no tag)
    // g = team tag
    // r = royale
    this.type = 'v'

    // Fighters mapped by UserID.
    this.fightersByUserID = new Map()
  }

  input (userId, event) {
    var fighter = this.fightersByUserID.get(userId)
    if (fighter) {
      fighter.input(event)
      return
    }
    console.warn('[Match] Received input without Fighter from', userId, event)
  }

  set type (value) {
    if (value === 'v') {
      this._matchType = value
      if (!this.ft) {
        this.ft = 2 // default first-to
      }
    } else if (value === 't') {
      this._matchType = value
      this.ft = null
    } else if (value === 'g' || value === 'r') {
      this._matchType = value
      this.ft = 1
    }
  }

  get type () {
    return this._matchType
  }

  compute () {
    for (var team of this.teams) {
      team.compute()
    }
  }

  sendToClient () {
    var game = this.game
    var team
    var fighter
    var rig
    for (team of this.teams) {
      for (fighter of team.fighters.values()) {
        rig = fighter.rigData
        game.sendToClient('+', 'r', rig)
        game.sendToClient('v', rig.id, false)
        game.sendToClient('p', rig.id, fighter.x, fighter.y)
        game.sendToClient('r', rig.id, null, (fighter.orientation === 1) ? Math.PI / 2 : -Math.PI / 2)
        game.sendToClient('am', rig.id, 'test-animation')
        game.sendToClient('v', rig.id, true)
      }
    }
  }

  free () {
    this.freeCollections()
    this.fighters = null
    super.free()
  }

  freeCollections () {
    if (this.teams) this.teams.free()
    if (this.rounds) this.rounds.free()
  }
}
