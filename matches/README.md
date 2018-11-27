# Match Systems

```js
// Online Match example - server code

var connection1 = new ClientConnection(...)
var connection2 = new ClientConnection(...)

var fighter1 = new OnlineFighter(..., connection1)
var fighter2 = new OnlineFighter(..., connection2)

var match = new Match()

// defaults
match.rounds = 3
match.time = 99

var team1 = match.teams.create()
var team2 = match.teams.create()

team1.add(fighter1)
team2.add(fighter2)

match.start()
```

## Class: `Match`

### `match.id`

Database match ID.

### `match.type`

* `royale` - all fighters active on screen at once. This is the default mode.
* `tag` - one fighter from a team active at once. Switching available during the match.
* `turn` - one fighter from a team active at once. Switching not available.

### `match.command(fighterId, event)`

Propagates the given input to the fighter instance.

Concerns: method should not be exposed in local matches, otherwise commands could be injected on a CPU character.

### `match.events`

Array of events that have been sent to the client.

Only includes asset loading events. Gameplay events are handled by `round.events`.

### `match.fighters`

Map of `Fighter` instances participating in the match.

### `match.teams`

Array of `Team` instances participating in the match.

* `match.teams.create()` - create a team for the match.

### `match.rounds`

Array of `Round` instances, current and past.

### `match.round`

Current round. Will be `null` if match is over or not active.

### `match.training`

`true` if this is a training match. Training matches behave differently from normal matches.

## Class: `Round`

### `round.match`

`Match` instance the round belongs to.

### `round.id`

Rounds are saved in a separate database collection.

### `round.counter`

Frame counter for the round.

### `round.events`

Array of events that have been sent to the client.

### `round.time`

Current time of the round, or the time the round ended.

### `round.ended`

`true` if round is over.

### `round.winner`

`Team` instance that won the round.

## Class: `Team`

### `team.match`

Current match the team belongs to.

### `team.side`

`L` for left or `R` for right.

### `team.color`

Team color.

### `team.fighters`

Map of `Fighter` instances that belong to the team.

### `team.victories`

Amount of rounds the team has won in the match.

## Class: `Fighter`

### `fighter.profile`

`ProfileResource` this fighter belongs to.

### `fighter.rig`

`RigResource` instance that renders the fighter on the client.

### `fighter.team`

`Team` instance the fighter belongs to.

### `fighter.match`

`Match` instance the fighter is currently participating.

### `fighter.meters`

A map of `Meter` instances with ongoing values.

### `fighter.slots`

Map of `InputSequence` objects that are associated to skills.

### `fighter.skills`

Map of `FighterSkill` objects.
