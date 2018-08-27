import {CharacterMeter} from './CharacterMeter'

export const DEFAULT_HEALTH = 800

export class HealthMeter extends CharacterMeter {
  constructor () {
    super(...arguments)
    this.minimum = 0
    this.maximum = DEFAULT_HEALTH
    this.current = DEFAULT_HEALTH
  }
}
