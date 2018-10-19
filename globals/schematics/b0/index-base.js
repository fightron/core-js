import {
  INDEX_BASE_HEIGHT,
  INDEX_WIDTH,
  INDEX_DEPTH
} from '../../skeletons/human-constants'

export default {
  id: 'b0-index-base',
  name: 'B0 - Index (Base)',
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
        y: INDEX_BASE_HEIGHT / 2,
        z: INDEX_DEPTH / 2
      },
      p: {
        x: INDEX_WIDTH / 2,
        y: -INDEX_BASE_HEIGHT / 2
      }
    }
  ]
}
