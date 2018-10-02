import { expect } from 'chai'
import { KeyboardInput } from '../../inputs/KeyboardInput'

var holds = []
var releases = []

function onHold (action) { holds.push(['held', action]) }
function onRelease (action) { releases.push(['released', action]) }

describe('inputs/KeyboardInput', function () {
  before(function () {
    this.input = new KeyboardInput()
    this.input.onHold = onHold
    this.input.onRelease = onRelease
  })

  describe('#onKeyDown', function () {
    it('calls #onHold', function () {
      this.input.onKeyDown({ code: 'KeyW' })
      expect(holds.pop()).to.eql(['held', 'u'])
    })

    it('does not call #onHold if key is already down', function () {
      this.input.onKeyDown({ code: 'KeyW' })
      expect(holds).to.have.length(0)
    })

    it('does not call #onHold if key is invalid', function () {
      this.input.onKeyDown({ code: 'NonExistingCode' })
      expect(holds).to.have.length(0)
    })
  })

  describe('#onKeyUp', function () {
    it('calls #onRelease', function () {
      this.input.onKeyUp({ code: 'KeyW' })
      expect(releases.pop()).to.eql(['released', 'u'])
    })

    it('does not call #onRelease if key is invalid', function () {
      this.input.onKeyUp({ code: 'NonExistingCode' })
      expect(releases).to.have.length(0)
    })
  })

  describe('#onWindowBlur', function () {
    after(function () {
      holds.length = 0
      releases.length = 0
    })

    it('releases all held keys', function () {
      this.input.onKeyDown({ code: 'KeyW' })
      this.input.onKeyDown({ code: 'KeyS' })
      this.input.onKeyDown({ code: 'KeyA' })
      this.input.onKeyDown({ code: 'KeyD' })
      expect(holds).to.have.length(4)
      this.input.onWindowBlur()
      expect(releases).to.have.length(4)
    })
  })

  describe('#capture', function () {
    it('reads from event.which', function () {
      var result = this.input.capture({ which: 87 })
      expect(result).to.equal('u')
    })

    it('reads from event.keyCode', function () {
      var result = this.input.capture({ keyCode: 87 })
      expect(result).to.equal('u')
    })

    context('event (captured)', function () {
      it('does not propagate', function () {
        var event = { keyCode: 87 }
        this.input.capture(event)
        expect(event.returnValue).to.equal(false)
      })

      it('calls preventDefault() if available', function () {
        var called = false
        var event = { keyCode: 87, preventDefault: () => { called = true } }
        this.input.capture(event)
        expect(called).to.equal(true)
      })
    })

    context('event (not captured)', function () {
      it('propagates', function () {
        var event = { keyCode: 99999 }
        this.input.capture(event)
        expect(event.returnValue).to.not.exist()
      })

      it('does not call preventDefault() if available', function () {
        var called = false
        var event = { keyCode: 99999, preventDefault: () => { called = true } }
        this.input.capture(event)
        expect(called).to.equal(false)
      })
    })
  })

  context('window', function () {
    before(function () {
      this.window = {
        listeners: {}
      }
      var that = this
      this.window.addEventListener = function (event, method, _flag) {
        that.window.listeners[event] = method
      }
      this.window.removeEventListener = function (event, method) {
        delete that.window.listeners[event]
      }
    })

    describe('#install', function () {
      it('calls addEventListener', function () {
        this.input.install(this.window)
        expect(this.window.listeners.keydown).to.equal(this.input.onKeyDown)
        expect(this.window.listeners.keyup).to.equal(this.input.onKeyUp)
        expect(this.window.listeners.blur).to.equal(this.input.onWindowBlur)
      })
    })

    describe('#uninstall', function () {
      it('calls removeEventListener', function () {
        this.input.uninstall(this.window)
        expect(this.window.listeners.keydown).to.not.exist()
        expect(this.window.listeners.keyup).to.not.exist()
        expect(this.window.listeners.blur).to.not.exist()
      })
    })
  })

  describe('defaults', function () {
    it('sets correct keys', function () {
      this.input.onKeyDown({ code: 'KeyW' })
      expect(holds.pop()).to.eql(['held', 'u'])

      this.input.onKeyDown({ code: 'KeyS' })
      expect(holds.pop()).to.eql(['held', 'd'])

      this.input.onKeyDown({ code: 'KeyA' })
      expect(holds.pop()).to.eql(['held', 'l'])

      this.input.onKeyDown({ code: 'KeyD' })
      expect(holds.pop()).to.eql(['held', 'r'])

      this.input.onKeyDown({ code: 'KeyY' })
      expect(holds.pop()).to.eql(['held', 'X'])

      this.input.onKeyDown({ code: 'KeyU' })
      expect(holds.pop()).to.eql(['held', 'Y'])

      this.input.onKeyDown({ code: 'KeyI' })
      expect(holds.pop()).to.eql(['held', 'R1'])

      this.input.onKeyDown({ code: 'KeyH' })
      expect(holds.pop()).to.eql(['held', 'A'])

      this.input.onKeyDown({ code: 'KeyJ' })
      expect(holds.pop()).to.eql(['held', 'B'])

      this.input.onKeyDown({ code: 'KeyK' })
      expect(holds.pop()).to.eql(['held', 'R2'])

      this.input.onKeyDown({ code: 'KeyO' })
      expect(holds.pop()).to.eql(['held', 'L1'])

      this.input.onKeyDown({ code: 'KeyL' })
      expect(holds.pop()).to.eql(['held', 'L2'])

      this.input.onKeyDown({ code: 'Enter' })
      expect(holds.pop()).to.eql(['held', 'S'])

      this.input.onKeyDown({ code: 'Backspace' })
      expect(holds.pop()).to.eql(['held', 'T'])

      this.input.onKeyUp({ code: 'KeyW' })
      expect(releases.pop()).to.eql(['released', 'u'])

      this.input.onKeyUp({ code: 'KeyS' })
      expect(releases.pop()).to.eql(['released', 'd'])

      this.input.onKeyUp({ code: 'KeyA' })
      expect(releases.pop()).to.eql(['released', 'l'])

      this.input.onKeyUp({ code: 'KeyD' })
      expect(releases.pop()).to.eql(['released', 'r'])

      this.input.onKeyUp({ code: 'KeyY' })
      expect(releases.pop()).to.eql(['released', 'X'])

      this.input.onKeyUp({ code: 'KeyU' })
      expect(releases.pop()).to.eql(['released', 'Y'])

      this.input.onKeyUp({ code: 'KeyI' })
      expect(releases.pop()).to.eql(['released', 'R1'])

      this.input.onKeyUp({ code: 'KeyH' })
      expect(releases.pop()).to.eql(['released', 'A'])

      this.input.onKeyUp({ code: 'KeyJ' })
      expect(releases.pop()).to.eql(['released', 'B'])

      this.input.onKeyUp({ code: 'KeyK' })
      expect(releases.pop()).to.eql(['released', 'R2'])

      this.input.onKeyUp({ code: 'KeyO' })
      expect(releases.pop()).to.eql(['released', 'L1'])

      this.input.onKeyUp({ code: 'KeyL' })
      expect(releases.pop()).to.eql(['released', 'L2'])

      this.input.onKeyUp({ code: 'Enter' })
      expect(releases.pop()).to.eql(['released', 'S'])

      this.input.onKeyUp({ code: 'Backspace' })
      expect(releases.pop()).to.eql(['released', 'T'])
    })
  })
})
