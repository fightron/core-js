import { expect } from 'chai';
import { MatchResource } from '../../resources/MatchResource';
import { FightingGame } from '../../games/FightingGame';

describe('resources/MatchResource', function () {
  before(function () {
    this.game = new FightingGame();
  });

  it('initializes with default properties', function () {
    var resource = new MatchResource(this.game);
    expect(resource.isMatchResource).to.equal(true);
  });
});
