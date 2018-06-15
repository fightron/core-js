'use strict'

const Base = require('../utils/Base')
const Team = require('./Team')
const Collection = require('../collections/BaseCollection')

const NOOP = function () {}

const STATUS_BUILDING = 0
const STATUS_INTRO = 1  // character intros
const STATUS_READY = 2  // ready...
const STATUS_COMBAT = 3 // ... go!
const STATUS_KO = 4
const STATUS_WINNER = 5 // round result
const STATUS_RESULT = 6 // match result
const STATUS_ENDED = -1

class Match extends Base {
  constructor () {
    super()
    this.characters = new Collection(this)
    this.broadcast = NOOP
    this.rounds = 3 // max round
    this.round = 0 // current round
    this.status = STATUS_BUILDING
  }

  set characters (characterResource1, characterResource2) {
    this.characters.clear()
    this.characters.add(characterResource1)
    this.characters.add(characterResource2)
    characterResource1.enemy = characterResource2
    characterResource2.enemy = characterResource1
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
      return
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

function assembleCharacterOrTeam (characterOrTeam) {
  if (!characterOrTeam) {
    throw new Error('MATCH_REQUIRES_CHARACTER_OR_TEAM')
  }
  if (characterOrTeam.isCharacterResource) {
    return new Team(characterOrTeam)
  } else if (characterOrTeam.isTeam) {
    return characterOrTeam
  } else {
    throw new Error('MATCH_REQUIRES_CHARACTER_OR_TEAM')
  }
}

module.exports = Match
