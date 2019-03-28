import { ArrayCollection } from './ArrayCollection';
import { SchematicPart } from '../lib/SchematicPart';

export class SchematicPartCollection extends ArrayCollection {
  add (/* one SchematicPart */ data) {
    var part = new SchematicPart(data, this.owner);
    var parentId = data.par;
    if (parentId) {
      var parent = this.find(parentId);
      if (parent) {
        part.parent = parent;
      } else {
        console.warn('ITEM_PARENT_NOT_FOUND', parentId);
      }
    }
    this.push(part);
    this.dictionary.set(part.id, part);
  }
}
