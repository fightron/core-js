import { expect } from 'chai'
import { SkeletonResource } from '../../resources/SkeletonResource'
import { humanSkeletonResource } from '../../globals/skeletons/human'

describe('resources/SkeletonResource', function () {
  describe('constructor', function () {
    it('initializes with default properties', function () {
      var resource = new SkeletonResource()
      expect(resource._type).to.equal('Sl')
      expect(resource.name).to.equal(null)
      expect(resource.isSkeletonResource).to.equal(true)
      expect(resource.bones.isArrayCollection).to.equal(true)
    })
  })

  describe('patch', function () {
    it('sets name', function () {
      expect(humanSkeletonResource.name).to.equal('Human')
    })

    it('loads bones', function () {
      expect(humanSkeletonResource.bones).to.have.length.above(0)
      var root = humanSkeletonResource.bones[0]
      expect(root.isBone).to.equal(true)
    })
  })

  describe('free', function () {
    it('sets bones to null', function () {
      var resource = new SkeletonResource()
      resource.free()
      expect(resource.bones).to.equal(null)
    })
  })
})
