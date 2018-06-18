/* eslint-disable import/first */
require('esm')

import {Meter} from './Meter'

export class Attribute extends Meter {
  constructor (id) {
    if (!id) {
      throw new Error('ATTRIBUTE_REQUIRES_ID')
    }
    super()
    this.id = id
    this.minimum = 0
    this.maximum = 50
    this.current = 0
  }
}
