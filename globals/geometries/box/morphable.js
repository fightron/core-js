import {GeometryResource} from '../../../resources/GeometryResource'

import data from './morphable.json'

export const geometry = new GeometryResource()

geometry.patch(data)

console.log(geometry)
