import {expect} from 'chai'
import {Vector3} from '../../3d/Vector3'

describe('3d/Vector3', function () {
  describe('constructor', function () {
    it('correctly sets coordinates', function () {
      var vector = new Vector3(1, 2, 3)
      expect(vector.x).to.equal(1)
      expect(vector.y).to.equal(2)
      expect(vector.z).to.equal(3)
      expect(vector.isVector3).to.equal(true)
    })

    it('defaults to zeros', function () {
      var vector = new Vector3()
      expect(vector.x).to.equal(0)
      expect(vector.y).to.equal(0)
      expect(vector.z).to.equal(0)
    })
  })

  describe('clone', function () {
    before(function () {
      this.vector = new Vector3(1, 2, 3)
      this.clone = this.vector.clone()
    })

    it('clones the instance', function () {
      expect(this.clone.x).to.equal(1)
      expect(this.clone.y).to.equal(2)
      expect(this.clone.z).to.equal(3)
    })

    it('does not update original instance on changes', function () {
      this.clone.x = 4
      this.clone.y = 5
      this.clone.z = 6
      expect(this.vector.x).to.equal(1)
      expect(this.vector.y).to.equal(2)
      expect(this.vector.z).to.equal(3)
    })
  })
})
