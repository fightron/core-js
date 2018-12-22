import { Base } from '../lib/Base'
import { TeamFighterCollection } from '../collections/TeamFighterCollection'

export class Team extends Base {
  constructor (match) {
    super()
    if (!match) {
      throw new Error('E-T-MT')
    }
    this.match = match
    this.fighters = new TeamFighterCollection(this)
  }
}
