'use strict'

const expect = require('chai').expect
const Queue = require('../Queue')

describe('Queue', function () {
  it('starts with a length of zero', function () {
    let queue = new Queue()
    expect(queue.length).to.equal(0)
  })

  describe('#enqueue', function () {
    it('changes length accordingly', function () {
      let queue = new Queue()
      queue.enqueue('abc')
      expect(queue.length).to.equal(1)
      queue.enqueue('def')
      expect(queue.length).to.equal(2)
      queue.enqueue('ghi')
      expect(queue.length).to.equal(3)
    })
  })

  describe('#dequeue', function () {
    it('returns undefined when queue is empty', function () {
      let queue = new Queue()
      expect(queue.dequeue()).to.equal(undefined)
      expect(queue.length).to.equal(0)
    })

    it('returns first item added', function () {
      let queue = new Queue()
      queue.enqueue('abc')
      queue.enqueue('def')
      queue.enqueue('ghi')
      expect(queue.dequeue()).to.equal('abc')
      expect(queue.length).to.equal(2)
      expect(queue.dequeue()).to.equal('def')
      expect(queue.length).to.equal(1)
      expect(queue.dequeue()).to.equal('ghi')
      expect(queue.length).to.equal(0)
      expect(queue.dequeue()).to.equal(undefined)
    })
  })

  describe('#peek', function () {
    it('returns undefined when queue is empty', function () {
      let queue = new Queue()
      expect(queue.peek()).to.equal(undefined)
    })

    it('returns first item added without removing it from queue', function () {
      let queue = new Queue()
      queue.enqueue('abc')
      queue.enqueue('def')
      queue.enqueue('ghi')
      expect(queue.peek()).to.equal('abc')
      expect(queue.peek()).to.equal('abc')
      expect(queue.peek()).to.equal('abc')
      expect(queue.length).to.equal(3)
      queue.dequeue()
      expect(queue.peek()).to.equal('def')
    })
  })
})
