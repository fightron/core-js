import { BaseResource } from './BaseResource';

export class CharacterResource extends BaseResource {
  constructor () {
    super();
    this._type = 'Ch';
    this.isCharacterResource = true; // internal optimization
    this.skeleton = null;
  }

  free () {
    // this.freeMeters()
    // this.freeAttributes()
    this.skeleton = null;
    super.free();
  }
}
