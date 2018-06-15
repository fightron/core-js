'use strict'

const BaseCollection = require('./BaseCollection')

class SkillCollection extends BaseCollection {
  constructor (characterResource) {
    super(characterResource)
  }

  input (inputCode) {
    // passes inputCode onto all skills
  }

  free () {
    super.free()
  }
}

module.exports = SkillCollection
