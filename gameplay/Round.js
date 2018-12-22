import { Base } from '../lib/Base'

export class Round extends Base {
  constructor (match) {
    super()
    if (!match) {
      throw new Error('E-R-MT')
    }
    this.match = match
  }
}
