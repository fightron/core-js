import { MapCollection } from './MapCollection'
import { Fighter } from '../gameplay/Fighter'

export class TeamFighterCollection extends MapCollection {
  create (buildData, rigData, user) {
    var team = this.owner
    var match = team.match
    var game = match.game
    var fighter = new Fighter()
    fighter.build.patch(buildData, game)
    fighter.rigData = rigData
    fighter.orientation = (team.side === 'l') ? 1 : -1
    fighter.positionX = 1.5 * fighter.orientation * -1 * (this.size + 1)
    super.add(fighter)
    match.fightersByUserID.set(user.id, fighter)
    return fighter
  }
}
