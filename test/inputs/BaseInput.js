import { expect } from 'chai'
import { INPUT_ACTIONS, BaseInput } from '../../inputs/BaseInput'

var holds = []
var releases = []

function onHold (action) { holds.push(['held', action]) }
function onRelease (action) { releases.push(['released', action]) }

describe('inputs/BaseInput', function () {
  describe('INPUT_ACTIONS', function () {
    it('has four directions', function () {
      expect(INPUT_ACTIONS).to.include('u')
      expect(INPUT_ACTIONS).to.include('d')
      expect(INPUT_ACTIONS).to.include('l')
      expect(INPUT_ACTIONS).to.include('r')
    })

    it('has eight attack buttons', function () {
      expect(INPUT_ACTIONS).to.include('A')
      expect(INPUT_ACTIONS).to.include('B')
      expect(INPUT_ACTIONS).to.include('X')
      expect(INPUT_ACTIONS).to.include('Y')
      expect(INPUT_ACTIONS).to.include('L1')
      expect(INPUT_ACTIONS).to.include('L2')
      expect(INPUT_ACTIONS).to.include('R1')
      expect(INPUT_ACTIONS).to.include('R2')
    })

    it('has start and select/options', function () {
      expect(INPUT_ACTIONS).to.include('S')
      expect(INPUT_ACTIONS).to.include('T')
    })
  })

  describe('constructor', function () {
    before(function () {
      this.input = new BaseInput()
    })

    it('sets enabled to true', function () {
      expect(this.input.enabled).to.equal(true)
    })

    it('sets default hold event', function () {
      expect(this.input.onHold.name).to.equal('unassignedFn')
    })

    it('sets default release event', function () {
      expect(this.input.onRelease.name).to.equal('unassignedFn')
    })

    it('sets #current as a Map', function () {
      expect(this.input.current).to.be.instanceof(Map)
    })
  })

  describe('#enabled', function () {
    it('changes property value correctly', function () {
      var input = new BaseInput()
      input.enabled = false
      expect(input._enabled).to.equal(false)
      input.enabled = true
      expect(input._enabled).to.equal(true)
    })
  })

  describe('#valid', function () {
    it('returns true for all valid input actions', function () {
      var input = new BaseInput()
      for (var action of INPUT_ACTIONS) {
        expect(input.valid(action)).to.equal(true)
      }
    })

    it('returns false for values other than input actions', function () {
      var input = new BaseInput()
      expect(input.valid('a')).to.equal(false)
      expect(input.valid('D')).to.equal(false)
      expect(input.valid('1')).to.equal(false)
    })

    it('returns false when not enabled', function () {
      var input = new BaseInput()
      input.enabled = false
      for (var action of INPUT_ACTIONS) {
        expect(input.valid(action)).to.equal(false)
      }
    })
  })

  describe('#hold/#release', function () {
    it('adds held keys to #current map', function () {
      var input = new BaseInput()
      input.hold('d')
      expect(input.current.get('d')).to.equal(true)
      input.hold('r')
      expect(input.current.get('d')).to.equal(true)
      expect(input.current.get('r')).to.equal(true)
      input.release('d')
      expect(input.current.get('d')).to.equal(false)
      expect(input.current.get('r')).to.equal(true)
    })
  })

  describe('#onHold/#onRelease', function () {
    before(function () {
      this.input = new BaseInput()
      this.input.onHold = onHold
      this.input.onRelease = onRelease
    })

    it('does not call methods for invalid actions', function () {
      this.input.hold('f')
      expect(holds).to.have.length(0)
      this.input.release('f')
      expect(releases).to.have.length(0)
    })

    it('calls proper callbacks', function () {
      this.input.hold('d')
      expect(holds[0]).to.eql(['held', 'd'])
      this.input.release('d')
      expect(releases[0]).to.eql(['released', 'd'])
    })
  })
})
