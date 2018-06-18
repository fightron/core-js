/* eslint-disable import/first */
require('esm')

import {ActiveAttribute} from './ActiveAttribute'

export class VitalityAttribute extends ActiveAttribute {
  constructor () {
    super('VIT')
    this.passives.push('health', 'shield', 'focus')
  }
}
