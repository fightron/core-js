import { MapCollection } from './MapCollection';
import { CharacterResource } from '../resources/CharacterResource';

export class CharacterCollection extends MapCollection {
  add (/* one record */ data) {
    var character = new CharacterResource();
    character.patch(data);
    super.add(character);
  }
}
