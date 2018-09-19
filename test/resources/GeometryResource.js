import { expect } from 'chai'
import { GeometryResource } from '../../resources/GeometryResource'
import triangleGeometry from '../fixtures/geometries/triangle'

describe('resources/GeometryResource', function () {
  it('initializes with default properties', function () {
    var resource = new GeometryResource()
    expect(resource.isGeometryResource).to.equal(true)
  })

  describe('#patch', function () {
    before(function () {
      this.geometry = new GeometryResource()
      this.geometry.patch(triangleGeometry)
    })

    it('loads with correct number of vertices', function () {
      expect(this.geometry.vertices.length).to.equal(4)
    })

    it('loads with correct number of faces', function () {
      expect(this.geometry.faces.length).to.equal(4)
    })

    it('loads vertex normals correctly', function () {
      expect(this.geometry.vertices[0].normal.x).to.equal(0)
      expect(this.geometry.vertices[0].normal.y).to.equal(1)
      expect(this.geometry.vertices[0].normal.z).to.equal(0)
      expect(this.geometry.vertices[1].normal.x).to.equal(-1)
      expect(this.geometry.vertices[1].normal.y).to.equal(0)
      expect(this.geometry.vertices[1].normal.z).to.equal(1)
      expect(this.geometry.vertices[2].normal.x).to.equal(1) // mirrored
      expect(this.geometry.vertices[2].normal.y).to.equal(0)
      expect(this.geometry.vertices[2].normal.z).to.equal(1)
      expect(this.geometry.vertices[3].normal).to.not.exist()
    })

    it('loads face normals correctly', function () {
      expect(this.geometry.faces[0].normals.a.x).to.equal(0)
      expect(this.geometry.faces[0].normals.a.y).to.equal(1)
      expect(this.geometry.faces[0].normals.a.z).to.equal(0)
      expect(this.geometry.faces[0].normals.b.x).to.equal(-2) // override
      expect(this.geometry.faces[0].normals.b.y).to.equal(0)
      expect(this.geometry.faces[0].normals.b.z).to.equal(1)
      expect(this.geometry.faces[0].normals.c.x).to.equal(1) // should not be affected by override
      expect(this.geometry.faces[0].normals.c.y).to.equal(0)
      expect(this.geometry.faces[0].normals.c.z).to.equal(1)
      expect(this.geometry.faces[1].normals.c.x).to.equal(-1)
      expect(this.geometry.faces[2].normals.c.x).to.equal(1)
    })

    it('mirrors vertices properly', function () {
      expect(this.geometry.vertices[0].mirror).to.not.exist()
      expect(this.geometry.vertices[1].mirror.id).to.equal('front-right')
      expect(this.geometry.vertices[1].mirrored).to.equal(false)
      expect(this.geometry.vertices[2].mirror.id).to.equal('front-left')
      expect(this.geometry.vertices[2].mirrored).to.equal(true)
      expect(this.geometry.vertices[3].mirror).to.not.exist()
    })

    it('mirrors faces properly', function () {
      expect(this.geometry.faces[0].mirror).to.not.exist()
      expect(this.geometry.faces[1].mirror.id).to.equal('right')
      expect(this.geometry.faces[1].mirrored).to.equal(false)
      expect(this.geometry.faces[2].mirror.id).to.equal('left')
      expect(this.geometry.faces[2].mirrored).to.equal(true)
      expect(this.geometry.faces[3].mirror).to.not.exist()
    })

    // it('sets materialIndexes correctly', function () {
    //   expect(this.geometry.faces[0].materialIndex).to.equal(0)
    //   expect(this.geometry.faces[1].materialIndex).to.equal(0)
    //   expect(this.geometry.faces[2].materialIndex).to.equal(0)
    //   expect(this.geometry.faces[3].materialIndex).to.equal(1)
    // })
  })

  describe('#free', function () {
    it('frees all collections', function () {
      var resource = new GeometryResource()
      resource.free()
      expect(resource.vertices).to.equal(null)
      expect(resource.faces).to.equal(null)
    })
  })
})
