import {expect} from 'chai'
import {Vertex} from '../../3d/Vertex'
import {Vector3} from '../../3d/Vector3'

describe('3d/Vertex', function () {
  describe('constructor', function () {
    it('initializes properties', function () {
      var vertex = new Vertex(1, 2, 3)
      expect(vertex.x).to.equal(1)
      expect(vertex.y).to.equal(2)
      expect(vertex.z).to.equal(3)
      expect(vertex.id).to.equal(null)
      expect(vertex.mirror).to.equal(null)
      expect(vertex.mirrored).to.equal(false)
      expect(vertex.normal).to.equal(null)
      expect(vertex.index).to.equal(null)
      expect(vertex.isVertex).to.equal(true)
    })
  })

  describe('free', function () {
    before(function () {
      this.vertex = new Vertex(1, 2, 3)
      var mirror = new Vertex(4, 5, 6)
      this.vertex.mirror = mirror
      var normal = new Vector3(1, 0, 0)
      this.vertex.normal = normal
      this.vertex.free()
    })

    it('frees mirror and normal objects', function () {
      expect(this.vertex.mirror).to.equal(null)
      expect(this.vertex.normal).to.equal(null)
    })
  })
})
