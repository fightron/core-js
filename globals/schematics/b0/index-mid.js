import {
  INDEX_MID_HEIGHT,
  INDEX_WIDTH,
  INDEX_DEPTH
} from '../../skeletons/human-constants'

export default {
  id: 'b0-index-mid',
  name: 'B0 - Index (Mid)',
  p: [
    {
      id: '0',
      rT: 'g',
      rI: 'box',
      cs: true,
      rs: true,
      o: true,
      s: {
        x: INDEX_WIDTH / 2,
        y: INDEX_MID_HEIGHT / 2,
        z: INDEX_DEPTH / 2
      },
      p: {
        x: INDEX_WIDTH / 2,
        y: -INDEX_MID_HEIGHT / 2
      }
    }
  ]
}
