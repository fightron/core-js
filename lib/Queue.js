// Inspired by https://github.com/nolanlawson/tiny-queue

export class Queue {
  constructor () {
    this.length = 0
    this.first = undefined
    this.last = undefined
  }

  enqueue (item) {
    var node = { item: item, next: undefined }
    if (this.last) {
      this.last = this.last.next = node
    } else {
      this.last = this.first = node
    }
    this.length++
  }

  peek () {
    var node = this.first
    return node ? node.item : undefined
  }

  dequeue () {
    var node = this.first
    if (!node) return
    this.first = node.next
    if (!(--this.length)) {
      this.last = undefined
    }
    var item = node.item
    // frees dequeued node
    node.item = undefined
    node.next = undefined
    return item
  }
}
