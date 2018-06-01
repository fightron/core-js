# @fightron/core

__Fightron Engine__ Core Objects that can be used by both Client and Server components.

## Meter

Represents one of the Character's Meters (Health, Special, Shield, Focus, or Revenge).

Properties:

* `minimum` - the minimum amount of meter.
* `maximum` - the maximum amount of meter.
* `current` - the current amount of meter.
* `onDepletion` - a callback for when the meter fully depletes.
* `onCompletion` - a callback for when the meter becomes full.

Methods:

* `change(amount)` - change the meter amount. Pass negative values to decrease the amount. Automatically calls callbacks if minimum/maximum amounts are reached.
