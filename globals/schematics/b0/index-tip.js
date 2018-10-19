import {
  INDEX_TIP_HEIGHT,
  INDEX_WIDTH,
  INDEX_DEPTH
} from '../../skeletons/human-constants'

export default {
  id: 'b0-index-tip',
  name: 'B0 - Index (Tip)',
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
        y: INDEX_TIP_HEIGHT / 2,
        z: INDEX_DEPTH / 2
      },
      p: {
        x: INDEX_WIDTH / 2,
        y: -INDEX_TIP_HEIGHT / 2
      }
    }
  ]
}
