import { flipGeometry } from '../../../3d/utils'
import handLeft from './hand-left'

var handRight = JSON.parse(JSON.stringify(handLeft))

handRight.id = 'b1-hand-right'
handRight.b = [
  'PR',
  'TBR', 'TMR', 'TTR',
  'IBR', 'IMR', 'ITR',
  'MBR', 'MMR', 'MTR',
  'RBR', 'RMR', 'RTR',
  'PBR', 'PMR', 'PTR'
]

flipGeometry(handRight)

export default handRight
