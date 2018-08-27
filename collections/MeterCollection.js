import {BaseCollection} from './BaseCollection'
import {HealthMeter} from '../gameplay/meters/HealthMeter'

export class MeterCollection extends BaseCollection {
  constructor (characterResource) {
    super(characterResource)
    this.set('hp', new HealthMeter(characterResource))
  }

  free () {
    this.get('hp').free()
    super.free()
  }
}
