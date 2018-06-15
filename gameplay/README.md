# @fightron/core/gameplay

This namespace holds classes directly related to gameplay.

## Match

A Match assembles two Teams of Characters to fight each other in a number of Rounds.

```javascript
var character1 = new CharacterResource(/* ... */)
var character2 = new CharacterResource(/* ... */)

var match = new Match(character1, character2)

match.rounds.next() // start next round
```

## Team

A Team is a group of Characters.

Teams are used, among other things, for HUDs, and collision detection (no friendly fire for when multiple characters of the same team are active).

Teamplay is not currently implemented, but using "teams of one" as a starting point will make this feature easier to implement when the time comes.
