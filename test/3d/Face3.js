import { expect } from 'chai'
import { Face3 } from '../../3d/Face3'
import { Vertex } from '../../3d/Vertex'
import { Vector3 } from '../../3d/Vector3'

describe('3d/Face3', function () {
  var a = new Vertex(1, 0, 0)
  var b = new Vertex(0, 1, 0)
  var c = new Vertex(0, 0, 1)
  var d = new Vertex(0, 0, -1)
  var n = new Vector3(1, 0, 0)
  var o = {}

  a.id = 'v-1'
  a.normal = new Vector3(0, 1, 0)
  b.id = 'v-2'
  b.normal = new Vector3(0, -1, 0)
  c.id = 'v-3'
  c.normal = new Vector3(0, 0, 1)

  describe('constructor', function () {
    it('initializes with vertices', function () {
      var face = new Face3(a, b, c)
      expect(face.a.id).to.equal('v-1')
      expect(face.b.id).to.equal('v-2')
      expect(face.c.id).to.equal('v-3')
    })

    it('fails to initialize without vertices', function () {
      expect(() => { return new Face3(null, null, null) }).to.throw('FACE3_INVALID_VERTICES')
      expect(() => { return new Face3(a, null, null) }).to.throw('FACE3_INVALID_VERTICES')
      expect(() => { return new Face3(a, b, null) }).to.throw('FACE3_INVALID_VERTICES')
      expect(() => { return new Face3(o, o, o) }).to.throw('FACE3_INVALID_VERTICES')
      expect(() => { return new Face3(a, o, o) }).to.throw('FACE3_INVALID_VERTICES')
      expect(() => { return new Face3(a, b, o) }).to.throw('FACE3_INVALID_VERTICES')
    })

    context('with normals', function () {
      it('loads defaults from vertices', function () {
        var face = new Face3(a, b, c)
        expect(face.normals.a.x).to.equal(0)
        expect(face.normals.a.y).to.equal(1)
        expect(face.normals.a.z).to.equal(0)
        expect(face.normals.b.x).to.equal(0)
        expect(face.normals.b.y).to.equal(-1)
        expect(face.normals.b.z).to.equal(0)
        expect(face.normals.c.x).to.equal(0)
        expect(face.normals.c.y).to.equal(0)
        expect(face.normals.c.z).to.equal(1)
        face = new Face3(b, a, c)
        expect(face.normals.b.x).to.equal(0)
        expect(face.normals.b.y).to.equal(1)
        expect(face.normals.b.z).to.equal(0)
        face = new Face3(b, c, a)
        expect(face.normals.c.x).to.equal(0)
        expect(face.normals.c.y).to.equal(1)
        expect(face.normals.c.z).to.equal(0)
      })

      it('sets vertex normals for vertices without normals', function () {
        var face = new Face3(a, b, c, { b: n })
        expect(face.normals.a.x).to.equal(0)
        expect(face.normals.a.y).to.equal(1)
        expect(face.normals.a.z).to.equal(0)
        expect(face.normals.b.x).to.equal(1)
        expect(face.normals.b.y).to.equal(0)
        expect(face.normals.b.z).to.equal(0)
        face = new Face3(a, b, c, { c: n })
        expect(face.normals.c.x).to.equal(1)
        expect(face.normals.c.y).to.equal(0)
        expect(face.normals.c.z).to.equal(0)
      })

      it('overwrites vertex normals from vertices with default normals', function () {
        var face = new Face3(a, b, c, { a: n })
        expect(face.normals.a.x).to.equal(1)
        expect(face.normals.a.y).to.equal(0)
        expect(face.normals.a.z).to.equal(0)
      })

      it('does not set face normals if any vertex normal is not present', function () {
        var face = new Face3(b, c, d)
        expect(face.normals).to.equal(null)
      })
    })
  })

  describe('#free', function () {
    it('sets vertices and normals to null', function () {
      var face = new Face3(a, b, c)
      face.free()
      expect(face.a).to.equal(null)
      expect(face.b).to.equal(null)
      expect(face.c).to.equal(null)
      expect(face.normals).to.equal(null)
    })
  })
})
