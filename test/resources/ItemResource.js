import { expect } from 'chai'
import { ItemResource } from '../../resources/ItemResource'
import triangleGeometry from '../fixtures/geometries/triangle'
import triangleSchematic from '../fixtures/schematics/three-triangles'
import triangleItem from '../fixtures/items/three-triangles'
import { Client } from '../../client'

describe('resources/ItemResource', function () {
  it('initializes with default properties', function () {
    var resource = new ItemResource()
    expect(resource.isItemResource).to.equal(true)
  })

  describe('#patch', function () {
    before(function () {
      this.client = new Client()
      this.client.command('+', 'g', triangleGeometry)
      this.client.command('+', 's', triangleSchematic)
    })

    context('with valid parameters', function () {
      before(function () {
        this.item = new ItemResource()
        this.item.patch(triangleItem, this.client)
      })

      it('sets item ID', function () {
        expect(this.item.id).to.equal('three-triangles')
      })

      it('loads with correct number of parts', function () {
        expect(this.item.parts.length).to.equal(5)
      })

      it('names parts correctly', function () {
        expect(this.item.parts[0].id).to.equal('root')
        expect(this.item.parts[1].id).to.equal('1')
        expect(this.item.parts[2].id).to.equal('2')
        expect(this.item.parts[3].id).to.equal('3')
        expect(this.item.parts[4].id).to.equal('light')
      })

      it('positions parts correctly', function () {
        expect(this.item.parts[1].position.y).to.equal(0)
        expect(this.item.parts[2].position.y).to.equal(100)
        expect(this.item.parts[3].position.y).to.equal(100)
      })

      it('rotates parts correctly', function () {
        expect(this.item.parts[1].rotation.y).to.equal(0)
      })

      it('scales parts correctly', function () {
        expect(this.item.parts[3].scale.x).to.equal(1)
        expect(this.item.parts[3].scale.z).to.equal(1)
      })

      it('sets part parents', function () {
        expect(this.item.parts[0].parent).to.not.exist()
        expect(this.item.parts[1].parent).to.equal(this.item.parts[0])
        expect(this.item.parts[2].parent).to.equal(this.item.parts[1])
        expect(this.item.parts[3].parent).to.equal(this.item.parts[2])
      })

      it('sets shadow properties correctly', function () {
        expect(this.item.parts[1].castShadow).to.equal(true)
        expect(this.item.parts[1].receiveShadow).to.equal(false)
        expect(this.item.parts[2].castShadow).to.equal(false)
        expect(this.item.parts[2].receiveShadow).to.equal(true)
      })

      it('sets outline property correctly', function () {
        expect(this.item.parts[1].outline).to.equal(true)
        expect(this.item.parts[2].outline).to.equal(false)
      })
    })
  })

  describe('#free', function () {
    it('frees all collections', function () {
      var resource = new ItemResource()
      resource.free()
      expect(resource.parts).to.equal(null)
      expect(resource.colors).to.equal(null)
    })
  })
})
