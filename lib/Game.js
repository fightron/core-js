import { Base } from './Base'

export class Game extends Base {
  constructor () {
    super()
    this.client = null
    this.worker = null
    this.controllers = [] // TODO: GameControllerCollection
  }
}
