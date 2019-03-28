import { expect } from 'chai';
import { FightingGame } from '../../games/FightingGame';

describe('games/FightingGame', function () {
  before(function () {
    this.game = new FightingGame({});
  });

  it('initializes without errors', function () {
    // TODO
    expect(this.game).to.exist();
  });
});
