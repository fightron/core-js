import { BaseResource } from './BaseResource';
import { ItemPartCollection } from '../collections/ItemPartCollection';

export class ItemResource extends BaseResource {
  constructor () {
    super();
    this._type = 'Itm';
    this.schematic = null; // SchematicResource
    this.character = null; // CharacterResource
    this.color = null; // default color for all parts
    this.parts = new ItemPartCollection(this);
    this.isItemResource = true;
  }

  patch (data, client) {
    if (!data) return;
    var schematic = client.schematics.find(data.sch);
    if (!schematic) {
      throw new Error('E-IR-SCH', data);
    }
    super.patch(data);
    this.schematic = schematic;
    this.color = data.c;
    for (var part of schematic.parts) {
      this.parts.addSchematicPart(part, data.p);
    }
    // this.colors.load(data.c)
  }

  free () {
    this.parts.free();
    this.parts = null;
    this.color = null;
    super.free();
  }
}
