# @fightron/core/utils

Utility and helper objects.

## Queue

This is an optimized FIFO Queue used by the Client and Server for enqueuing of different things, such as Player Inputs or messages received by the Client or Server.

Methods:

* `enqueue(item)` - adds an arbritary item to the end of the queue.
* `peek()` - returns the first item in the queue without removing it.
* `dequeue()` - removes and returns the first item in the queue.

Inspired by [tiny-queue](https://github.com/nolanlawson/tiny-queue).
