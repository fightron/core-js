import { ArrayCollection } from './ArrayCollection'
import { Team } from '../gameplay/Team'

const MAX_TEAMS = 4
const COLORS = ['blue', 'red', 'lime', 'yellow']
const SIDES = ['l', 'r', 'l', 'r']

export class MatchTeamCollection extends ArrayCollection {
  create () {
    if (this.length >= MAX_TEAMS) {
      console.warn('E-MT-TM-MAX')
      return false
    }
    var team = new Team(this.owner)
    var length = this.length
    team.index = length
    team.color = COLORS[length]
    team.side = SIDES[length]
    this.add(team)
    return team
  }
}
