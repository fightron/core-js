import footLeft from './foot-left'

var footRight = JSON.parse(JSON.stringify(footLeft))

footRight.id = 'b1-foot-right'
footRight.b = ['FR', 'TR'] // right side bones

export default footRight
