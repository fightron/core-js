# @fightron/core/collections

Collections are just extended `Map`s or `Array`s which have an owner (which can be any arbitrary object).

It's used in many different places where string lookup is needed within a collection. Some examples:

* Character meters
* Character attributes
* Character skills
* Etc.

There are two "base" collections:

* `ArrayCollection` - extends from `Array`.
* `MapCollection` - extends from `Map`.
