import {expect} from 'chai'
import {BaseCollection} from '../../collections/BaseCollection'

describe('collections/BaseCollection', function () {
  before(function () {
    this.collection = new BaseCollection()
  })

  describe('#add', function () {
    it('adds item to collection', function () {
      this.collection.add({id: '1', name: 'abc'})
      expect(this.collection.get('1').name).to.equal('abc')
    })
  })
})
