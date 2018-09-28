import { expect } from 'chai'
import { humanSkeletonResource } from '../../../globals/skeletons/human'

describe('globals/skeletons/human', function () {
  it('has correct id and name', function () {
    expect(humanSkeletonResource.id).to.equal('h')
    expect(humanSkeletonResource.name).to.equal('Human')
  })

  it('has all bones', function () {
    expect(humanSkeletonResource.bones).to.have.length(54)
  })
})
