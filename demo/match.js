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
    var teams = this.teams
    var teamL = teams.create()
    var teamR = teams.create()
    var proto = teamL.fighters.create(protoBuild, protoRig)
    var jet = teamR.fighters.create(jetBuild, jetRig)
    // teamL.fighters.create(teraBuild, teraRig)
    proto.user = this.game.users.get('K')
    jet.user = this.game.users.get('N')
    this.compute()
    this.sendToClient()
  }
}
