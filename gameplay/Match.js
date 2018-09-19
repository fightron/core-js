import { Base } from '../lib/Base'
// const Team = require('./Team')
import { Collection } from '../collections/MapCollection'

const NOOP = function () {}

export const STATUS_BUILDING = 0
// export const STATUS_INTRO = 1 // character intros
// export const STATUS_READY = 2 // ready...
export const STATUS_COMBAT = 3 // ... go!
// export const STATUS_KO = 4
// export const STATUS_WINNER = 5 // round result
// export const STATUS_RESULT = 6 // match result
export const STATUS_ENDED = -1

export class Match extends Base {
  constructor () {
    super()
    this.characters = new Collection(this)
    this.broadcast = NOOP
    this.rounds = 3 // max round
    this.round = 0 // current round
    this.status = STATUS_BUILDING
  }

  set characters (characterResources) {
    this.characters.clear()
    var ch1 = characterResources[0]
    var ch2 = characterResources[1]
    this.characters.add(ch1)
    this.characters.add(ch2)
    ch1.enemies.push(ch2)
    ch2.enemies.push(ch1)
  }

  input (characterId, input) {
    if (this.status !== STATUS_COMBAT) {
      return
    }
    var character = this.characters.get(characterId)
    if (!character) {
      return
    }
    var skills = character.skills
    if (!skills) {
      return
    }
    skills.input(input)
  }

  use (characterId, slotId) {
    if (this.status !== STATUS_COMBAT && slotId !== 'idle') {

    }
    // makes a character use a skill
  }

  free () {
    this.characters.free()
    this.characters = null
    this.broadcast = NOOP
    this.status = STATUS_ENDED
  }
}

// function assembleCharacterOrTeam (characterOrTeam) {
//   if (!characterOrTeam) {
//     throw new Error('MATCH_REQUIRES_CHARACTER_OR_TEAM')
//   }
//   if (characterOrTeam.isCharacterResource) {
//     return new Team(characterOrTeam)
//   } else if (characterOrTeam.isTeam) {
//     return characterOrTeam
//   } else {
//     throw new Error('MATCH_REQUIRES_CHARACTER_OR_TEAM')
//   }
// }
