import { Base } from '@fightron/utils/Base';
import { Vector3 } from './Vector3';

export class Face3 extends Base {
  constructor (a, b, c, normals) {
    if (!a || !a.isVertex || !b || !b.isVertex || !c || !c.isVertex) {
      throw new Error('FACE3_INVALID_VERTICES');
    }
    super();
    this.id = null;
    this.a = a;
    this.b = b;
    this.c = c;
    this.setNormals(normals);
    this.mirror = null; // another Face3
    this.mirrored = false; // true if this Face was generated from mirrorize()
    this.materialIndex = 0; // will be adjusted when adding regions to Geometry
    this.index = null; // will be set by collection
    this.isFace3 = true; // optimization
  }

  setNormals (data) {
    this.normals = null;
    var normals = {};
    // Assign defaults from vertices
    if (this.a.normal) { normals.a = this.a.normal; }
    if (this.b.normal) { normals.b = this.b.normal; }
    if (this.c.normal) { normals.c = this.c.normal; }
    // Data overrides
    if (data) {
      var dA = data.a;
      var dB = data.b;
      var dC = data.c;
      if (dA) { normals.a = new Vector3(dA.x, dA.y, dA.z); }
      if (dB) { normals.b = new Vector3(dB.x, dB.y, dB.z); }
      if (dC) { normals.c = new Vector3(dC.x, dC.y, dC.z); }
    }
    if (normals.a && normals.b && normals.c) {
      this.normals = normals;
    }
  }

  free () {
    this.a =
    this.b =
    this.c =
    this.normals =
    this.mirror = null;
    super.free();
  }
}
