import { FightingMatch } from '../matches/FightingMatch'

// Data
import protoBuild from '../data/npc-builds/proto'
import protoRig from '../data/rigs/npcs/proto-1'

import jetBuild from '../data/npc-builds/jet'
import jetRig from '../data/rigs/npcs/jet-1'

// import teraBuild from '../data/npc-builds/tera'
// import teraRig from '../data/rigs/npcs/tera-1'

export class DemoMatch extends FightingMatch {
  load () {
    var userK = this.game.users.get('K') // keyboard user
    var userN = this.game.users.get('N') // numpad user
    var teams = this.teams
    var teamL = teams.create()
    var teamR = teams.create()
    teamL.fighters.create(protoBuild, protoRig, userK)
    teamR.fighters.create(jetBuild, jetRig, userN)
    // teamL.fighters.create(teraBuild, teraRig)
    this.compute()
    this.sendToClient()
  }
}
