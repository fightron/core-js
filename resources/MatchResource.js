import { BaseResource } from './BaseResource'

export class MatchResource extends BaseResource {
  constructor (game) {
    if (!game) {
      throw new Error('E-MT-GAME')
    }
    super()
    this._type = 'Mt'
    this.isMatchResource = true

    // Match Type
    // v = 1v1
    // t = team (no tag)
    // g = team tag
    // r = royale
    this.type = 'v'

    // All data events sent to client.
    this.events = []
  }
}
