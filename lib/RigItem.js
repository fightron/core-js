import { Base } from '@fightron/utils/Base';

export class RigItem extends Base {
  constructor () {
    super();
    this.isRigItem = true;
    this.rig = null;
    this.item = null;
    this.slot = null;
  }
}
