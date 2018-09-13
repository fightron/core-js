import {expect} from 'chai'
import {SchematicResource} from '../../resources/SchematicResource'
import triangleSchematic from '../fixtures/schematics/three-triangles'

describe('resources/SchematicResource', function () {
  it('initializes with default properties', function () {
    var resource = new SchematicResource()
    expect(resource.isSchematicResource).to.equal(true)
  })

  describe('#patch', function () {
    before(function () {
      this.item = new SchematicResource()
      this.item.patch(triangleSchematic)
    })

    it('sets item ID', function () {
      expect(this.item.id).to.equal('three-triangles')
    })

    it('sets item name', function () {
      expect(this.item.name).to.equal('Three Triangles on top of each other')
    })

    it('loads with correct number of parts', function () {
      expect(this.item.parts.length).to.equal(3)
    })

    it('names parts correctly', function () {
      expect(this.item.parts[0].id).to.equal('1')
      expect(this.item.parts[1].id).to.equal('2')
      expect(this.item.parts[2].id).to.equal('3')
    })

    it('positions parts correctly', function () {
      expect(this.item.parts[0].position.y).to.equal(0)
      expect(this.item.parts[1].position.y).to.equal(100)
      expect(this.item.parts[2].position.y).to.equal(101)
    })

    it('rotates parts correctly', function () {
      expect(this.item.parts[0].rotation.y).to.equal(1)
    })

    it('scales parts correctly', function () {
      expect(this.item.parts[2].scale.x).to.equal(2)
      expect(this.item.parts[2].scale.z).to.equal(2)
    })

    it('sets part parents', function () {
      expect(this.item.parts[0].parent).to.not.exist()
      expect(this.item.parts[1].parent).to.equal(this.item.parts[0])
      expect(this.item.parts[2].parent).to.equal(this.item.parts[1])
    })

    it('sets shadow properties correctly', function () {
      expect(this.item.parts[0].castShadow).to.equal(true)
      expect(this.item.parts[0].receiveShadow).to.equal(false)
      expect(this.item.parts[1].castShadow).to.equal(false)
      expect(this.item.parts[1].receiveShadow).to.equal(true)
    })

    it('sets outline property correctly', function () {
      expect(this.item.parts[0].outline).to.equal(true)
      expect(this.item.parts[1].outline).to.equal(false)
    })
  })

  describe('#free', function () {
    it('frees all collections', function () {
      var resource = new SchematicResource()
      resource.free()
      expect(resource.parts).to.equal(null)
    })
  })
})
