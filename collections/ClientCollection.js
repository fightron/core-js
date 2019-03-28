import { MapCollection } from './MapCollection';

export class ClientCollection extends MapCollection {
  constructor (client, identifier, resourceClass) {
    super(client);
    // Install additional non-minifiable reference
    //   on client for faster access on client.receive()
    client[identifier] = this;
    this.injector = null;
    this.resourceClass = resourceClass;
  }

  add (object, id) {
    var Resource = this.resourceClass;
    if (!Resource) {
      return super.add(object, id);
    }
    var resource = new Resource();
    resource.patch(object, this.owner);
    super.add(resource, id);
    if (this.injector) {
      this.injector.inject(resource);
    }
  }
}
