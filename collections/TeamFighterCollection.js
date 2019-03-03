import { MapCollection } from './MapCollection'
import { Fighter } from '../gameplay/Fighter'

export class TeamFighterCollection extends MapCollection {
  create (buildData, rigData) {
    var team = this.owner
    var fighter = new Fighter()
    fighter.build.patch(buildData, team.match.game)
    fighter.rigData = rigData
    fighter.team = team
    fighter.match = team.match
    fighter.orientation = (team.side === 'l') ? 1 : -1
    fighter.positionX = 1.5 * fighter.orientation * -1 * (this.size + 1)
    super.add(fighter)
    team.match.fighters.push(fighter)
    return fighter
  }
}
