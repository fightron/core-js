/* eslint-disable import/first */
require('esm')

import {Attribute} from '../Attribute'

export class ActiveAttribute extends Attribute {
  constructor (id) {
    super(id)
    this.passives = []
  }
}
