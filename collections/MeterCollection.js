import { MapCollection } from './MapCollection'
import { HealthMeter } from '../gameplay/meters/HealthMeter'

export class MeterCollection extends MapCollection {
  constructor (characterResource) {
    super(characterResource)
    this.set('hp', new HealthMeter(characterResource))
  }

  free () {
    this.get('hp').free()
    super.free()
  }
}
