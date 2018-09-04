import {MapCollection} from './MapCollection'
import {VitalityAttribute} from '../gameplay/attributes/VitalityAttribute'

export class AttributeCollection extends MapCollection {
  constructor () {
    super(...arguments)
    this.add(new VitalityAttribute())
  }
}
