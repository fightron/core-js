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
    this.fighters = []
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

  free () {
    this.freeCollections()
    super.free()
  }

  freeCollections () {
    if (this.teams) this.teams.free()
    if (this.rounds) this.rounds.free()
  }
}
