import { expect } from 'chai'
import { DemoGame } from '../../demo/game'

describe('demo/game', function () {
  before(function () {
    this.game = new DemoGame({})
  })

  it('exists', function () {
    // TODO
    expect(this.game).to.exist()
  })
})
