import {ArrayCollection} from './ArrayCollection'

export class RegionCollection extends ArrayCollection {
  constructor () {
    super(...arguments)
    this.dictionary = new Map()
  }

  load (regions) {
    if (!regions) {
      return
    }
    for (var region of regions) {
      this.add(region)
    }
  }

  add (data) {
    //
  }
}
