# @fightron/core

__Fightron Engine__ Core Objects that can be used by both Client and Server components.

This project is divided in namespaces, as follows:

* [__Collections__](./collections/README.md): arrays of items that belong to an object.
* [__Gameplay__](./gameplay/README.md): classes directly related to gameplay.
* [__Resources__](./resources/README.md): data entities.
* [__Lib__](./lib/README.md): classes that don't fall into any of the categories above.

Each namespace has its own README. Click the links above to read them.

## Development

This package uses ECMAScript modules (`import`/`export` instead of `require`). Other packages that require this one need to either transpile the final code, or include and require [`esm`](https://github.com/standard-things/esm) in their dependencies.
