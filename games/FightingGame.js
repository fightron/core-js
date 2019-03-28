import { BaseGame } from './BaseGame';
import { CharacterCollection } from '../collections/CharacterCollection';
import { BuildCollection } from '../collections/BuildCollection';

import npcs from '../data/npcs';
import builds from '../data/npc-builds';

export class FightingGame extends BaseGame {
  constructor (worker) {
    super(worker);
    this.match = null; // current match
    this.characters = new CharacterCollection(this);
    this.builds = new BuildCollection(this);
    this.characters.patch(npcs);
    this.builds.patch(builds, this);
  }

  inputCommand (inputId, event) {
    var match = this.match;
    if (match) {
      var user = this.users.get(inputId);
      if (!user) {
        console.log('Received Input without User', inputId, event);
        return;
      }
      match.input(user.id, event);
    } else {
      // No match registered
      console.log('Input Command', inputId, event);
    }
  }

  free () {
    this.builds.free();
    this.characters.free();
    super.free();
  }
}
