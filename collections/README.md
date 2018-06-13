# @fightron/core/collections

Collections are just extended `Map`s which have an owner (which can be any arbritrary object).

It's used in many different places where string lookup is needed within a collection (search by key). Some examples:

* Character meters
* Character attributes
* Character skills

Maps are used instead of object properties because keys can have characters that are not compatible with property names (such as hyphen).

Methods:

* `add(object)` - adds an object to the collection, with `object.id` being used as key.
