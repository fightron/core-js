# @fightron/core/meters

A Meter represents one of the Character's Meters (Health, Special, Shield, Focus, or Revenge).

Properties:

* `minimum` - the minimum amount of meter. Defaults to zero.
* `maximum` - the maximum amount of meter. Defaults to 1.
* `current` - the current amount of meter. Defaults to `minimum`.
* `onDepletion` - a callback for when the meter fully depletes. Defaults to an empty function.
* `onCompletion` - a callback for when the meter becomes full. Defaults to an empty function.

Methods:

* `change(amount)` - change the meter amount. Pass negative values to decrease the amount. Automatically calls callbacks if minimum/maximum amounts are reached.
