import { expect } from 'chai'
import { Fps } from '../../lib/Fps'

describe('lib/Fps', function () {
  describe('constructor', function () {
    it('initializes with defaults', function () {
      var fps = new Fps()
      expect(fps.size).to.equal(10)
      expect(fps.samples).to.have.length(10)
      expect(fps.position).to.equal(0)
      expect(fps.total).to.equal(0.0)
      expect(fps.now).to.exist()
      expect(fps.startTime).to.equal(0.0)
    })

    it('initializes with given size', function () {
      var fps = new Fps(100)
      expect(fps.size).to.equal(100)
      expect(fps.samples).to.have.length(100)
    })
  })

  context('calculations', function () {
    before(function () {
      var faketime = 0
      this.fps = new Fps(2)
      this.fps.now = function () { return faketime }
      // Sample 1
      this.fps.start()
      faketime = 50
      this.fps.end()
      // Sample 2
      this.fps.start()
      faketime = 75
      this.fps.end()
      // Sample 3 (should override Sample 1)
      this.fps.start()
      faketime = 110
      this.fps.end()
    })

    describe('start-end', function () {
      it('adds correct samples', function () {
        expect(this.fps.samples[0]).to.equal(35)
        expect(this.fps.samples[1]).to.equal(25)
      })

      it('sets correct total', function () {
        expect(this.fps.total).to.equal(60)
      })
    })

    it('returns correct average fps', function () {
      expect(this.fps.average()).to.equal(1000 / (60 / 2))
    })
  })
})
