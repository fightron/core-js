'use strict'

import { expect } from 'chai'
import { behaves } from './namespace'

import triangleGeometry from '../fixtures/geometries/triangle'
import threeTrianglesSchematic from '../fixtures/schematics/three-triangles'
import oneTriangleSchematic from '../fixtures/schematics/one-triangle'
import threeTrianglesItem from '../fixtures/items/three-triangles'
import oneTriangleItem from '../fixtures/items/one-triangle'
import humanSkeleton from '../../globals/skeletons/human'
import triangleHumanRig from '../fixtures/rigs/triangle-human'

behaves.like.a.Client = function (client) {
  describe('instance', function () {
    before(function () {
      this.client = client
    })

    it('is a Client', function () {
      expect(this.client.isClient).to.equal(true)
    })

    it('has a counter', function () {
      expect(this.client.counter).to.exist()
    })

    describe('#receive', function () {
      context('collection command', function () {
        describe('+', function () {
          context('g', function () {
            before(function () {
              this.client.command('+', 'g', triangleGeometry)
              this.geometry = this.client.geometries.find('triangle')
            })

            it('adds a GeometryResource to client.geometries', function () {
              expect(this.geometry).to.exist()
              expect(this.geometry.isGeometryResource).to.equal(true)
              expect(this.geometry.vertices).to.have.length(4)
              expect(this.geometry.faces).to.have.length(4)
            })
          })

          context('s', function () {
            before(function () {
              this.client.command('+', 's', threeTrianglesSchematic)
              this.client.command('+', 's', oneTriangleSchematic)
              this.schematic = this.client.schematics.find('three-triangles')
            })

            it('adds a SchematicResource to client.schematics', function () {
              expect(this.schematic).to.exist()
              expect(this.schematic.isSchematicResource).to.equal(true)
              expect(this.schematic.parts).to.have.length(5)
            })
          })

          context('i', function () {
            before(function () {
              this.client.command('+', 'i', threeTrianglesItem)
              this.client.command('+', 'i', oneTriangleItem)
              this.item = this.client.items.find('three-triangles')
            })

            it('adds a ItemResource to client.items', function () {
              expect(this.item).to.exist()
              expect(this.item.isItemResource).to.equal(true)
              expect(this.item.parts).to.have.length(5)
            })
          })

          context('sl', function () {
            before(function () {
              this.client.command('+', 'sl', humanSkeleton)
              this.skeleton = this.client.skeletons.find('h')
            })

            it('adds a SkeletonResource to client.skeletons', function () {
              expect(this.skeleton).to.exist()
              expect(this.skeleton.id).to.equal('h')
            })
          })

          context('r', function () {
            before(function () {
              this.client.command('+', 'r', triangleHumanRig)
              this.rig = this.client.rigs.find('triangle-human')
            })

            it('adds a RigResource to client.rigs', function () {
              expect(this.rig).to.exist()
              expect(this.rig.isRigResource).to.equal(true)
              expect(this.rig.items).to.have.length(1)
            })

            it('assigns correct item references', function () {
              expect(this.rig.skeleton).to.equal(this.client.skeletons.find('h'))
              expect(this.rig.items[0].item).to.equal(this.client.items.find('one-triangle'))
              expect(this.rig.items[0].slot).to.equal('H')
            })
          })

          // before(function () {
          //   this.client.command('+', 'i', threeTrianglesSchematic)
          // })

          // it('adds items to given collections', function () {
          //   expect(this.client.geometries.get('triangle')).to.exist()
          //   expect(this.client.items.get('tri-item').id).to.equal('tri-item')
          // })

          // context('s', function () {
          //   before(function () {
          //     this.client.command('+', 's', {id: 'item-1', itm: 'tri-item'})
          //     this.item = this.client.items.get('item-1')
          //   })

          //   it('sets root item', function () {
          //     expect(this.item.root).to.exist()
          //   })

          //   it('sets named parts', function () {
          //     expect(this.item.parts['item-1-1'].name).to.equal('item-1-1')
          //     expect(this.item.parts['item-1-2'].name).to.equal('item-1-2')
          //     expect(this.item.parts['item-1-3'].name).to.equal('item-1-3')
          //   })

          //   it('sets hierarchy correctly', function () {
          //     expect(this.item.parts['item-1-2'].parent).to.equal(this.item.parts['item-1-1'])
          //     expect(this.item.parts['item-1-3'].parent).to.equal(this.item.parts['item-1-2'])
          //     expect(this.item.parts['item-1-1'].children[0].name).to.equal('item-1-2')
          //     expect(this.item.parts['item-1-2'].children[0].name).to.equal('item-1-3')
          //   })
          // })
        })
      })

      // context('item-altering command', function () {
      //   describe('p', function () {
      //     it('changes item position', function () {
      //       var position = this.client.items.get('item-1').root.position
      //       this.client.command('p', 'item-1', 1, 2, 3)
      //       expect(position.x).to.equal(1)
      //       expect(position.y).to.equal(2)
      //       expect(position.z).to.equal(3)
      //     })

      //     it('only changes given axes', function () {
      //       var position = this.client.items.get('item-1').root.position
      //       this.client.command('p', 'item-1', 4)
      //       expect(position.x).to.equal(4)
      //       expect(position.y).to.equal(2)
      //       expect(position.z).to.equal(3)
      //       this.client.command('p', 'item-1', null, 5, undefined)
      //       expect(position.x).to.equal(4)
      //       expect(position.y).to.equal(5)
      //       expect(position.z).to.equal(3)
      //       this.client.command('p', 'item-1', null, null, 6)
      //       expect(position.x).to.equal(4)
      //       expect(position.y).to.equal(5)
      //       expect(position.z).to.equal(6)
      //     })

      //     it('treats zeros as valid values', function () {
      //       var position = this.client.items.get('item-1').root.position
      //       this.client.command('p', 'item-1', 0, 0, 0)
      //       expect(position.x).to.equal(0)
      //       expect(position.y).to.equal(0)
      //       expect(position.z).to.equal(0)
      //     })
      //   })

      //   describe('p+', function () {
      //     it('changes item position incrementally', function () {
      //       var position = this.client.items.get('item-1').root.position
      //       this.client.command('p', 'item-1', 1, 2, 3)
      //       this.client.command('p+', 'item-1', 1, -1, -3)
      //       expect(position.x).to.equal(2)
      //       expect(position.y).to.equal(1)
      //       expect(position.z).to.equal(0)
      //     })

      //     it('treats nulls as zeros', function () {
      //       var position = this.client.items.get('item-1').root.position
      //       this.client.command('p+', 'item-1', null, undefined, 0)
      //       expect(position.x).to.equal(2)
      //       expect(position.y).to.equal(1)
      //       expect(position.z).to.equal(0)
      //     })
      //   })

      //   describe('r', function () {
      //     it('changes item rotation', function () {
      //       var rotation = this.client.items.get('item-1').root.rotation
      //       this.client.command('r', 'item-1', 1, 2, 3)
      //       expect(rotation.x).to.equal(1)
      //       expect(rotation.y).to.equal(2)
      //       expect(rotation.z).to.equal(3)
      //     })

      //     it('only changes given axes', function () {
      //       var rotation = this.client.items.get('item-1').root.rotation
      //       this.client.command('r', 'item-1', 4)
      //       expect(rotation.x).to.equal(4)
      //       expect(rotation.y).to.equal(2)
      //       expect(rotation.z).to.equal(3)
      //       this.client.command('r', 'item-1', null, 5, undefined)
      //       expect(rotation.x).to.equal(4)
      //       expect(rotation.y).to.equal(5)
      //       expect(rotation.z).to.equal(3)
      //       this.client.command('r', 'item-1', null, null, 6)
      //       expect(rotation.x).to.equal(4)
      //       expect(rotation.y).to.equal(5)
      //       expect(rotation.z).to.equal(6)
      //     })

      //     it('treats zeros as valid values', function () {
      //       var rotation = this.client.items.get('item-1').root.rotation
      //       this.client.command('r', 'item-1', 0, 0, 0)
      //       expect(rotation.x).to.equal(0)
      //       expect(rotation.y).to.equal(0)
      //       expect(rotation.z).to.equal(0)
      //     })
      //   })

      //   describe('r+', function () {
      //     it('changes item rotation incrementally', function () {
      //       var rotation = this.client.items.get('item-1').root.rotation
      //       this.client.command('r', 'item-1', 1, 2, 3)
      //       this.client.command('r+', 'item-1', 1, -1, -3)
      //       expect(rotation.x).to.equal(2)
      //       expect(rotation.y).to.equal(1)
      //       expect(rotation.z).to.equal(0)
      //     })

      //     it('treats nulls as zeros', function () {
      //       var rotation = this.client.items.get('item-1').root.rotation
      //       this.client.command('r+', 'item-1', null, undefined, 0)
      //       expect(rotation.x).to.equal(2)
      //       expect(rotation.y).to.equal(1)
      //       expect(rotation.z).to.equal(0)
      //     })
      //   })

      //   describe('q', function () {
      //     it('changes item quaternions', function () {
      //       var quaternion = this.client.items.get('item-1').root.quaternion
      //       this.client.command('q', 'item-1', 1, 2, 3, 4)
      //       expect(quaternion.x).to.equal(1)
      //       expect(quaternion.y).to.equal(2)
      //       expect(quaternion.z).to.equal(3)
      //       expect(quaternion.w).to.equal(4)
      //     })

      //     it('treats zeros as valid values', function () {
      //       var quaternion = this.client.items.get('item-1').root.quaternion
      //       this.client.command('q', 'item-1', 0, 0, 0, 0)
      //       expect(quaternion.x).to.equal(0)
      //       expect(quaternion.y).to.equal(0)
      //       expect(quaternion.z).to.equal(0)
      //       expect(quaternion.w).to.equal(0)
      //     })
      //   })

      //   describe('s', function () {
      //     it('changes item scale', function () {
      //       var scale = this.client.items.get('item-1').root.scale
      //       this.client.command('s', 'item-1', 1, 2, 3)
      //       expect(scale.x).to.equal(1)
      //       expect(scale.y).to.equal(2)
      //       expect(scale.z).to.equal(3)
      //     })

      //     it('only changes given axes', function () {
      //       var scale = this.client.items.get('item-1').root.scale
      //       this.client.command('s', 'item-1', 4)
      //       expect(scale.x).to.equal(4)
      //       expect(scale.y).to.equal(2)
      //       expect(scale.z).to.equal(3)
      //       this.client.command('s', 'item-1', null, 5, undefined)
      //       expect(scale.x).to.equal(4)
      //       expect(scale.y).to.equal(5)
      //       expect(scale.z).to.equal(3)
      //       this.client.command('s', 'item-1', null, null, 6)
      //       expect(scale.x).to.equal(4)
      //       expect(scale.y).to.equal(5)
      //       expect(scale.z).to.equal(6)
      //     })

      //     it('treats zeros as valid values', function () {
      //       var scale = this.client.items.get('item-1').root.scale
      //       this.client.command('s', 'item-1', 0, 0, 0)
      //       expect(scale.x).to.equal(0)
      //       expect(scale.y).to.equal(0)
      //       expect(scale.z).to.equal(0)
      //     })
      //   })

      //   describe('v', function () {
      //     it('changes item visibility', function () {
      //       var item = this.client.items.get('item-1')
      //       this.client.command('v', 'item-1', true)
      //       expect(item.root.visible).to.equal(true)
      //       this.client.command('v', 'item-1', false)
      //       expect(item.root.visible).to.equal(false)
      //     })
      //   })
      // })
    })
  })
}

exports.behaves = behaves
