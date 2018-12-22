import { Base } from '../lib/Base'
import { FighterMeterCollection } from '../collections/FighterMeterCollection'

// A Fighter is a runtime version of a Character Build.
export class Fighter extends Base {
  constructor (team, build) {
    if (!team) {
      throw new Error('E-FT-TM')
    }
    if (!build) {
      throw new Error('E-FT-BLD')
    }
    super()
    this.team = team
    this.build = build
    this.match = team.match
    this.meters = new FighterMeterCollection(this)

    // populated by match.teams.compute()
    this.allies = []
    this.enemies = []

    this.compute()
  }

  compute () {
    // computes build's meters and attributes
  }
}
