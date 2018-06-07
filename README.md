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

## Queue

This is an optimized FIFO Queue used by the Client and Server for enqueuing of different things, such as Player Inputs or messages received by the Client or Server.

Methods:

* `enqueue(item)` - adds an arbritary item to the end of the queue.
* `peek()` - returns the first item in the queue without removing it.
* `dequeue()` - removes and returns the first item in the queue.

Inspired by [tiny-queue](https://github.com/nolanlawson/tiny-queue).

## Resource

A Resource is an entity that has an ID and belongs to a type.

Examples of Resources:

* Characters,
* Matches (e.g., saved Replays),
* Items,
* Costumes,
* Poses,
* Animations,
* etc.

It usually is stored somewhere (like a remote storage) and also is often used in APIs.

Both Client and Server code can use Resources.

Properties:

* `id` - the remote ID of the Resource. E.g., `"123"`.
* `type` - the Resource type. Usually in plural form. E.g, `"characters"`
* `path` (read-only) - returns the Resource path, in the format `type/ID`. E.g., `"characters/123"`. Returns `null` if either the type or ID is null.

Methods:

* `fill(data)` - fills the instance with data.

## Team

A Team is a group of Characters.

Teams are used, among other things, for HUDs, and collision detection (no friendly fire for when multiple characters of the same team are active).

Teamplay is not currently implemented, but using "teams of one" as a starting point will make this feature easier to implement when the time comes.
