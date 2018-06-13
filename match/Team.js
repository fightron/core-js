'use strict'

class Team {
  constructor (...characters) {
    this.isTeam = true // internal optimization
    if (characters.length === 0) {
      throw new Error('TEAM_REQUIRES_ONE_OR_MORE_CHARACTERS')
    }

    var character
    for (character of characters) {
      if (!character.isCharacter) {
        throw new Error('TEAM_REQUIRES_CHARACTER_INSTANCES')
      }
    }
    this.characters = characters
    // for (character of characters) {
    //   character.team = this
    // }
    this.current = characters[0] // current character
  }

  free () {
    // var character
    // for (character of this.characters) {
    //   character.team = null
    // }
    this.current = null
    this.characters = null
  }
}

module.exports = Team
