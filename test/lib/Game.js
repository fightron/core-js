import { expect } from 'chai'
import { Game } from '../../lib/Game'

describe('lib/Game', function () {
  before(function () {
    this.game = new Game({})
  })

  it('exists', function () {
    // TODO
    expect(this.game).to.exist()
  })
})
