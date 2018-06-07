'use strict'

const expect = require('chai').expect
const Resource = require('../Resource')

describe('Resource', function () {
  it('initializes with correct properties', function () {
    var resource = new Resource()
    expect(resource.id).to.equal(null)
    expect(resource.type).to.equal(null)
    expect(resource.path).to.equal(null)
    expect(resource.isResource).to.equal(true)
  })

  describe('#path', function () {
    it('is updated when ID or type changes', function () {
      var resource = new Resource()
      resource.id = '0123'
      resource.type = 'characters'
      expect(resource.path).to.equal('characters/0123')
      resource.id = 456 // accepts integers too
      resource.type = 'items'
      expect(resource.path).to.equal('items/456')
      resource.id = null
      expect(resource.path).to.equal(null)
      resource.id = undefined
      expect(resource.path).to.equal(null)
      resource.id = '789'
      resource.type = null
      expect(resource.path).to.equal(null)
    })
  })

  describe('#fill', function () {
    it('updates resource ID', function () {
      var resource = new Resource()
      resource.fill({id: 123})
      expect(resource.id).to.equal('123')
      resource.fill({}) // only updates when present
      expect(resource.id).to.equal('123')
      resource.fill({id: 0})
      expect(resource.id).to.equal('0')
    })
  })
})
