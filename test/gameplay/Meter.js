import { expect } from 'chai';
import { Meter } from '../../gameplay/Meter';

describe('gameplay/Meter', function () {
  it('initializes with correct defaults', function () {
    var meter = new Meter();
    expect(meter.minimum).to.equal(0);
    expect(meter.maximum).to.equal(1);
    expect(meter.current).to.equal(0);
  });

  it('initializes with given values', function () {
    var meter = new Meter(10, 500, 250);
    expect(meter.minimum).to.equal(10);
    expect(meter.maximum).to.equal(500);
    expect(meter.current).to.equal(250);
  });

  describe('#change', function () {
    it('changes the current amount by the given value', function () {
      var meter = new Meter(0, 100);
      meter.change(20);
      expect(meter.current).to.equal(20);
      meter.change(10);
      expect(meter.current).to.equal(30);
      meter.change(-15);
      expect(meter.current).to.equal(15);
      meter.change(0);
      expect(meter.current).to.equal(15);
      meter.change();
      expect(meter.current).to.equal(15);
    });

    it('does not change beyond minimum and maximum values', function () {
      var meter = new Meter(1, 10);
      meter.change(-1);
      expect(meter.current).to.equal(1);
      meter.change(15);
      expect(meter.current).to.equal(10);
    });

    it('fires callback upon depletion', function (done) {
      var meter = new Meter(0, 10, 5);
      meter.onDepletion = done;
      meter.change(-5);
    });

    it('fires callback upon completion', function (done) {
      var meter = new Meter(0, 10, 5);
      meter.onCompletion = done;
      meter.change(5);
    });

    it('does not fire callback if meter is already depleted', function () {
      var meter = new Meter(0, 10);
      meter.onDepletion = () => { throw new Error(); };
      meter.change(-5);
    });

    it('does not fire callback if meter is already completed', function () {
      var meter = new Meter(0, 10, 10);
      meter.onCompletion = () => { throw new Error(); };
      meter.change(5);
    });
  });

  describe('#free', function () {
    it('resets callbacks to no-ops', function () {
      var meter = new Meter(0, 10, 5);
      meter.onDepletion = () => { throw new Error(); };
      meter.onCompletion = () => { throw new Error(); };
      meter.free();
      meter.change(-5);
      meter.change(10);
    });
  });
});
