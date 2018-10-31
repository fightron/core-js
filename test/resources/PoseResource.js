import { expect } from 'chai'
import { PoseResource } from '../../resources/PoseResource'

describe('resources/PoseResource', function () {
  it('initializes with default properties', function () {
    var resource = new PoseResource()
    expect(resource.isPoseResource).to.equal(true)
  })

  describe('#free', function () {
    before(function () {
      this.resource = new PoseResource()
      this.resource.free()
    })

    it('sets rotations to null', function () {
      expect(this.resource.rotations).to.equal(null)
    })
  })
})
