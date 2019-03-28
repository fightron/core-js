import { MapCollection } from './MapCollection';
import { CharacterBuildResource } from '../resources/CharacterBuildResource';

export class BuildCollection extends MapCollection {
  add (/* one record */ data, id, game) {
    var build = new CharacterBuildResource();
    build.patch(data, game);
    super.add(build, id);
  }
}
