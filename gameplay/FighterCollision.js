import AARectangle from 'aa-rectangle-javascript';

export class FighterCollision extends Map {
  constructor (fighter) {
    super();

    // The root box holds every other box inside.
    // It's also used to check collision against enemies' reachboxes.
    // Size is fixed (50cm wide, 2m tall).
    this.root = new AARectangle(0.5, 2, 0, 0);
    this.set('r', this.root);

    // Space boxes push enemies away.
    this.spacebox = new AARectangle();
    this.root.add(this.spacebox);
    this.set('s', this.spacebox);

    // Reach boxes make enemies block if they're holding back.
    this.reachbox = new AARectangle();
    this.root.add(this.reachbox);
    this.set('rc', this.reachbox);

    // Hitboxes (maximum of two). Short-ID'ed as "outgoing"
    this.hitboxes = [
      new AARectangle(),
      new AARectangle()
    ];
    for (var b of this.hitboxes) {
      this.root.add(b);
    }
    this.set('o1', this.hitboxes[0]);
    this.set('o2', this.hitboxes[1]);

    // Hurtboxes (maximum of three). Short-ID'ed as "incoming".
    // One of them must be flagged as "throw"
    //   otherwise character cannot be thrown.
    this.hurtboxes = [
      new AARectangle(),
      new AARectangle(),
      new AARectangle()
    ];
    for (b of this.hurtboxes) {
      this.root.add(b);
    }
    this.set('i1', this.hurtboxes[0]);
    this.set('i2', this.hurtboxes[1]);
    this.set('i3', this.hurtboxes[2]);
  }
}
