import { expect } from 'chai'
import { SkeletonResource } from '../../../resources/SkeletonResource'

import humanSkeleton from '../../../globals/skeletons/human'

describe('globals/skeletons/human', function () {
  before(function () {
    this.resource = new SkeletonResource()
    this.resource.patch(humanSkeleton)
  })

  it('has correct id and name', function () {
    expect(this.resource.id).to.equal('h')
    expect(this.resource.name).to.equal('Human')
  })

  it('has all bones', function () {
    expect(this.resource.bones).to.have.length(54)
  })
})
