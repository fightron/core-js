# @fightron/core/gameplay

This namespace holds classes directly related to gameplay.

## Fighter

`Fighter` is a runtime class for a `CharacterBuildResource`. It compiles meter and attribute values based on other attributes and enhancements.

When a match is running, one `Fighter` instance is used for each participating character.

## Round

(TODO)

## Team

(TODO)

## Meter

Meters are used for different things:

* Character meters (Health, Shields, Focus, Special, Revenge)
* Attributes, as they behave like meters

Properties:

* `minimum` - the minimum amount of meter. Defaults to zero.
* `maximum` - the maximum amount of meter. Defaults to 1.
* `current` - the current amount of meter. Defaults to `minimum`.
* `onChange` - a callback for when the meter changes its value. Defaults to an empty function.
* `onDepletion` - a callback for when the meter fully depletes. Defaults to an empty function.
* `onCompletion` - a callback for when the meter becomes full. Defaults to an empty function.

Methods:

* `set(amount, skipCallbacks)` - sets the meter to a fixed amount. Automatically calls callbacks unless `skipCallbacks` parameter equals `true`.
* `change(amount, skipCallbacks)` - change the meter amount incrementally. Pass negative values to decrease the amount. Automatically calls callbacks unless `skipCallbacks` parameter equals `true`.
