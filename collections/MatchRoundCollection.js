import { ArrayCollection } from './ArrayCollection'
import { Round } from '../gameplay/Round'

export class MatchRoundCollection extends ArrayCollection {
  create () {
    var round = new Round(this.owner)
    var length = this.length
    round.number = length + 1
    this.add(round)
    return round
  }
}
