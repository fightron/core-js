'use strict';

import { expect } from 'chai';
import { Client } from '../../client';
import { behaves } from '../behaviors';
import { MockInjector } from '../mocks/MockInjector';

describe('client/Client', function () {
  var client = new Client();
  client.initialize();
  client.geometries.injector = MockInjector;

  behaves.like.a.Client(client);

  describe('injection', function () {
    it('sets renderable of collection items when injector is set', function () {
      expect(client.geometries.find('triangle').renderable.injected).to.equal(true);
    });

    it('does not change collection items when injector is not set', function () {
      expect(client.items.find('three-triangles').renderable).to.equal(null);
    });
  });
});
