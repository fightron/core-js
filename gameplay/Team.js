import { Base } from '../lib/Base'
import { TeamFighterCollection } from '../collections/TeamFighterCollection'

export class Team extends Base {
  constructor (match) {
    super()
    if (!match) {
      throw new Error('E-T-MT')
    }
    this.match = match
    this.index = -1
    this.color = 'white'
    this.side = null
    this.fighters = new TeamFighterCollection(this)
  }

  compute () {
    // TODO: optimize
    for (var fighter of this.fighters.values()) {
      fighter.compute()
    }
  }
}
