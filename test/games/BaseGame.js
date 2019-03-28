import { expect } from 'chai';
import { BaseGame } from '../../games/BaseGame';

describe('games/BaseGame', function () {
  before(function () {
    this.game = new BaseGame({});
  });

  it('initializes without errors', function () {
    // TODO
    expect(this.game).to.exist();
  });
});
