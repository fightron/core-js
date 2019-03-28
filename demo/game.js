import { FightingGame } from '../games/FightingGame';
import { DemoMatch } from './match';

// Demo scene imports (temporary)
import items from '../data/items';

// Animations
import testAnimation from '../test/fixtures/animations/test';

export class DemoGame extends FightingGame {
  constructor (worker) {
    super(worker);
    this.users.set('K', { id: 'P1' });
    this.users.set('N', { id: 'P2' });
    this.match = null;
  }

  load () {
    super.load();
    for (var item of items) {
      this.sendToClient('+', 'i', item);
    }

    this.sendToClient('+', 'am', testAnimation);

    this.match = new DemoMatch(this);
    this.match.load();
  }
}
