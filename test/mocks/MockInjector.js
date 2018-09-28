export class MockInjector {
  static inject (resource) {
    resource.renderable = { injected: true }
  }
}
