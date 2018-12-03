import { BaseResource } from './BaseResource'

export class MatchResource extends BaseResource {
  constructor () {
    super()
    this._type = 'Mt'
    this.game = null
    this.teams = []
    this.fighters = []
    this.rounds = []
    this.events = []
    this.counter = null
  }
}
