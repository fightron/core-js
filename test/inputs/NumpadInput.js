import { expect } from 'chai'
import { NumpadInput } from '../../inputs/NumpadInput'

var holds = []
var releases = []

function onHold (action) { holds.push(['held', action]) }
function onRelease (action) { releases.push(['released', action]) }

describe('inputs/NumpadInput', function () {
  before(function () {
    this.input = new NumpadInput()
    this.input.onHold = onHold
    this.input.onRelease = onRelease
  })

  describe('defaults', function () {
    it('sets correct keys', function () {
      this.input.onKeyDown({ code: 'ArrowUp' })
      expect(holds.pop()).to.eql(['held', 'u'])

      this.input.onKeyDown({ code: 'ArrowDown' })
      expect(holds.pop()).to.eql(['held', 'd'])

      this.input.onKeyDown({ code: 'ArrowLeft' })
      expect(holds.pop()).to.eql(['held', 'l'])

      this.input.onKeyDown({ code: 'ArrowRight' })
      expect(holds.pop()).to.eql(['held', 'r'])

      this.input.onKeyDown({ code: 'Numpad7' })
      expect(holds.pop()).to.eql(['held', 'X'])

      this.input.onKeyDown({ code: 'Numpad8' })
      expect(holds.pop()).to.eql(['held', 'Y'])

      this.input.onKeyDown({ code: 'Numpad9' })
      expect(holds.pop()).to.eql(['held', 'R1'])

      this.input.onKeyDown({ code: 'Numpad4' })
      expect(holds.pop()).to.eql(['held', 'A'])

      this.input.onKeyDown({ code: 'Numpad5' })
      expect(holds.pop()).to.eql(['held', 'B'])

      this.input.onKeyDown({ code: 'Numpad6' })
      expect(holds.pop()).to.eql(['held', 'R2'])

      this.input.onKeyDown({ code: 'NumpadEnter' })
      expect(holds.pop()).to.eql(['held', 'S'])

      this.input.onKeyDown({ code: 'NumpadSubtract' })
      expect(holds.pop()).to.eql(['held', 'T'])

      this.input.onKeyUp({ code: 'ArrowUp' })
      expect(releases.pop()).to.eql(['released', 'u'])

      this.input.onKeyUp({ code: 'ArrowDown' })
      expect(releases.pop()).to.eql(['released', 'd'])

      this.input.onKeyUp({ code: 'ArrowLeft' })
      expect(releases.pop()).to.eql(['released', 'l'])

      this.input.onKeyUp({ code: 'ArrowRight' })
      expect(releases.pop()).to.eql(['released', 'r'])

      this.input.onKeyUp({ code: 'Numpad7' })
      expect(releases.pop()).to.eql(['released', 'X'])

      this.input.onKeyUp({ code: 'Numpad8' })
      expect(releases.pop()).to.eql(['released', 'Y'])

      this.input.onKeyUp({ code: 'Numpad9' })
      expect(releases.pop()).to.eql(['released', 'R1'])

      this.input.onKeyUp({ code: 'Numpad4' })
      expect(releases.pop()).to.eql(['released', 'A'])

      this.input.onKeyUp({ code: 'Numpad5' })
      expect(releases.pop()).to.eql(['released', 'B'])

      this.input.onKeyUp({ code: 'Numpad6' })
      expect(releases.pop()).to.eql(['released', 'R2'])

      this.input.onKeyUp({ code: 'NumpadEnter' })
      expect(releases.pop()).to.eql(['released', 'S'])

      this.input.onKeyUp({ code: 'NumpadSubtract' })
      expect(releases.pop()).to.eql(['released', 'T'])
    })
  })
})
