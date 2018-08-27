import {BaseCollection} from './BaseCollection'
import {VitalityAttribute} from '../gameplay/attributes/VitalityAttribute'

export class AttributeCollection extends BaseCollection {
  constructor () {
    super(...arguments)
    this.add(new VitalityAttribute())
  }
}
