import { BaseResource } from './BaseResource'
import { Counter } from '../lib/Counter'
import { MatchTeamCollection } from '../collections/MatchTeamCollection'
import { MatchRoundCollection } from '../collections/MatchRoundCollection'

export class MatchResource extends BaseResource {
  constructor (game) {
    if (!game) {
      throw new Error('E-MT-GAME')
    }
    super()
    this._type = 'Mt'
    this.game = game
    this.isMatchResource = true

    // Match Type
    // v = 1v1
    // t = team (no tag)
    // g = team tag
    // r = royale
    this.type = 'v'

    this.teams = new MatchTeamCollection(this)
    this.rounds = new MatchRoundCollection(this)

    // Data events sent to client.
    this.events = []

    // Match counter is independent from game counter.
    this.counter = new Counter()
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
}
