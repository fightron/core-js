# Resources

A Resource is a data entity that has an ID and belongs to a type.

Resource data is usually stored somewhere (like a remote storage or database) and is often used in APIs.

Both Client and Server code can use and extend Resources.

Properties of all Resources (from `BaseResource`):

* `id` - the remote ID of the Resource. E.g., `"123"`.
* `type` - the Resource type. It's a shortened version of the "table" name (see next section).
* `path` (read-only) - returns the Resource path, in the format `type/ID`. E.g., `"ch/123"`. Returns `null` if either the type or ID is null.
* `filename` (read-only) - returns the full path of the storage file, which is different from the Resource path.

Methods:

* `patch(data)` - fills the instance attributes with data (see next section about property names).
* `fingerprint()` - returns a SHA-256 hash comprised of the Resource's `identity()`. Used for cache and versioning.
* `identity()` - returns a string with all values required for fingerprinting.

### Shortened Names

Resources can be understood as "database models".

All Resources use shortened names for their "tables" and "columns". It only affects data that is saved in some sort of storage. It helps reducing data storage and transfer usage.

The `patch(data)` method only accepts object literals with shortened column names. Property names inside Resource objects themselves use their normal, long versions.

In the list of Resources that follows below, shortened names are shown inside brackets after the Resource name (e.g., `ch` would be the "table name" for `CharacterResource`) and properties (e.g., `ch` would represent the "column name" for a `characterId` property in different Resources).

## AiResource (`Ai`)

This Resource holds a complete A.I. build needed for the CPU to control a Character.

Properties:

* `profileId` (`pf`) - ID of the Profile this build belongs to.
* `name` (`n`) - name of the build.
* `memory` (`m`) - list of `AiMemoryResource` objects containing memorized Skills and their timeouts.
* `actions` (`a`) - list of `AiActionResource` objects containing the flow of the A.I. build.
* `attributes` (`att`) - list of `AiAttribute` objects with the A.I. Attribute values for this build:
  * `memory` (`m`)
  * `execution` (`e`)
  * `reaction` (`r`)
  * `confirms` (`c`)
  * `mindfulness` (`p`)

## AiActionResource (`AiA`)

This Resource holds a single A.I. Action for a Character.

Properties:

* `aiId` (`ai`) - ID of the A.I. this action belongs to.
* `priority` (`p`) - an arbitrary integer. Higher value means higher precedence. If two actions have the same priority, the one created first will take precedence. Defaults to zero.
* `idle` (`i`) - when `true`, this action is cancellable into reactions (other actions with `skillId`). Mutually exclusive with `skillId`.
* `chance` (`c`) - chance of activation as a float between 0 and 1, where 1 means 100% chance.
* `minDistance` (`miD`) - minimum enemy distance for the action to activate, in centimeters. Defaults to zero.
* `maxDistance` (`maD`) - maximum enemy distance for the action to activate, in centimeters. Defaults to full screen distance (value TBD).
* `airborne` (`air`) - set to `true` to make this action only executable while the Character is in the air.
* `aiMemoryId` (`aim`) - (optional) ID of the Memory with the Skill the enemy will execute that triggers this action. When present, the action will be flagged as "reaction". The Memory must be valid (not forgotten) for this reaction to be executable.
* `inputSequenceId` (`in`) - input sequence to enter if action rolls successfully. Can be a single button/directional press or a complete sequence. The accuracy and speed of the entered sequence depends on the __Execution__ A.I. Attribute.
* `nextActionId` (`n`) - instead of entering an input sequence, the successful activation of this action can reroute to another action. Mutually exclusive with `inputSequenceId`.

## AiMemoryResource (`AiM`)

This Resource holds a single memorized Skill that was used against a Character.

Properties:

* `aiId` (`ai`) - ID of the A.I. build this Memory belongs to.
* `skillId` (`sk`) - ID of the memorized Skill.
* `date` (`dt`) - the date the Memory has been last updated.
* `days` (`d`) - an integer that represents how many days it will take to forget the Skill.
* `practice` (`p`) - an integer that represents how many times the Skill has been used against the Character within `date`.

To determine if a skill has been forgotten, the `days` and `practice` properties must both be zero.

A "Memory Refresh" occurs before the memory is used in a match, where the following operations take place:

* calculates `delta`, which is the difference in days between the value of `date` property and the current date;
  * if `delta` is zero, steps below won't execute.
* `date` property is set to the current date;
* `days` property is decreased by `delta`, and cannot go below zero;
* `days` property is incremented by the value of `practice` property; and
* `practice` property is then set to zero.

The maximum allowed value of the `practice` property depends on the __Memory__ A.I. Attribute, as follows (tentative values and formulae):

* It has a base value of 2.
* It's then incremented by the integer result of: `MemoryAttribute / 5`.
* It means the maximum value of this property is 12 (at __50 Memory__: `2 + (50/5)`).

So, the higher the __Memory__ Attribute, the more days it can take for the Skill to be forgotten.

## AnimationResource (`Ani`)

An Animation contains a list of Poses that are applied to a Character's Skeleton within a timeframe.

Properties:

* `name` (`n`)
* `skeleton` (`s`) - Skeleton ID the Animation is compatible with.
* `keyframes` (`k`) - a collection of `AnimationKeyframe` objects, which contain references to Poses.
* `onHitId` (`h`) - (optional) ID of the Animation to play when this Animation is associated with an Active Skill, and that Skill hits the enemy.
* `onBlockId` (`b`) - (optional) ID of the Animation to play when this Animation is associated with an Active Skill, and that Skill is blocked by the enemy.
* `skillId` (`sk`) - (optional) Parent Skill ID this Animation is compatible with. This is what determines which "Skill Skins" are available to different Skills.

## CharacterResource (`Ch`)

A `CharacterResource` can be either a Character created by a Player, or a NPC (Non-Player Character).

This resource only holds information about a Character in regards of gameplay. Character profile data is held by `ProfileResource`.

Properties:

* `playerId` (`pl`) - ID of the Player who created the Character. For NPCs, this property is equal to `"npc"`.
* `skeleton` (`s`) - Character's Skeleton ID (e.g., `"human"`)
* `profileId` (`pf`) - default Profile ID. See `ProfileResource` for details.

Runtime Properties:

* `enemies` - used during a match. It's an array of `CharacterResource`'s that are enemies.

Methods:

* `compute()` - update `CharacterSkillResource` with their computed values based on Attributes and Enhancements currently active on the Character.

## PlayerEnhancementResource (`ChE`)

This Resource holds one Enhancement in possession of the Character.

Properties:

* `playerId` (`pl`)
* `enhancementId` (`en`)
* `characterId` (`ch`) - will be present if Enhancement is bound to a specific character (cannot be used on a different character). Some character-oriented rewards (story missions, A.I. leagues, etc) will have this property set.
* `bound` (`b`) - `true` if bound to player (cannot be traded). Some player-oriented rewards will have this property set.

## CharacterGameResource (`ChG`)

This Resource holds the progression of a Character in different games.

It allows one Character to be used in multiple Games. See the `GameResource` for more details about the different Games being offered and future possibilities.

Properties:

* `characterId` (`ch`)
* `gameId` (`g`) - the Game ID the Character belongs to.
* `level` (`l`) - current level. Defaults to 1.

## CharacterFightingStyleResource (`ChF`)

This Resource holds a single Fighting Style that a Character has unlocked.

Properties:

* `characterId` (`ch`)
* `fightingStyleId` (`fs`)

## CharacterSkillResource (`ChS`)

This Resource holds a single Skill that a Character has earned.

Properties:

* `characterId` (`ch`)
* `skillId` (`sk`)
* `level` (`l`)
* `animationId` (`ani`) - Animation to override default, a.k.a. Skill "Skin".
* `enhancements` (`en`) - an array of Character Enhancement IDs that are slotted into this Skill.
* `flags` (`fl`) - an array of Skill Flags currently active for this Skill.

## CinematicResource (`Cnm`)

A Cinematic is a fixed sequence of Animations involving two Characters, camera angles, and additional effects.

Properties:

* (TBD)

## CostumeResource (`Cm`)

A Costume is a collection of Items that are placed onto a Character's Skeleton.

Properties:

* `characterId` (`ch`) - ID of the Character that owns this Costume.
* `name` (`n`) - a friendly name defined by the Player.
* `skeleton` (`s`) - Skeleton ID the Costume is compatible with.
* `poseId` (`po`) - Pose ID for the Character to be used in Fighter Select.
* `paletteId` (`pal`) - default Palette ID to be used in Fighter Select.
* `items` (`im`) - a collection of `CostumeItem` objects.

## CurrencyResource (`Cr`)

This Resource holds information about a Currency.

Properties:

* `name` (`n`)

## EnhancementResource (`En`)

Enhancements are items that can be slotted into Skills to improve them.

Properties:

* `name` (`n`)
* `bonuses` (`b`) - array of bonuses applied by the Enhancement:
  * `target` (`t`) - `"a"` for Attribute (Active or Passive)
  * `id` (`i`) - ID of the target (e.g., `"STR"` for enhancing the Strength Attribute).
  * `amount` (`v`) - bonus amount.

## FightingStyleResource (`Fs`)

This Resource contains information about Fighting Styles.

Properties:

* `name` (`n`)
* `country` (`c`) - code of country of origin.
* `bonuses` (`b`) - a collection of Attribute bonuses applied to Characters that choose this Fighting Style.

## GameResource (`Game`)

A "Game" is used to isolate certain aspects of gameplay (like progression) in their own "universes".

Properties:

* `name` (`n`) - Game name.
* `description` (`d`) - a long description of the game.
* `currencyId` (`cr`) - ID of the Currency that represents experience to reach next level in this game.
* `progression` (`tb`) - progression table. It's an array of levels and their requirements:
  * `level` (`l`) - Level number.
  * `amount` (`v`) - amount of XP required to reach this Level.

There will be two "Games" in the first release of this project:

* `fg` - the fighting game, except A.I. mode.
* `fgA` - the fighting game, A.I. mode only.

This Resource will be used when a new "Game" is released under this project (e.g., a dancing game, a racing game, etc). One Character will be able to be used in multiple games, keeping their cosmetic details, but having independent progression. See the `CharacterGameResource` for more details.

## GeometryResource (`Geo`)

A Geometry holds vertices, faces, and other 3D information that are necessary to render a 3D object on the screen.

Geometries are used to render mostly everything, such as Items, Character Costume parts, Effects, terrain, sky boxes, etc.

Properties:

* `parent` - ID of parent Geometry. Parent will be loaded and merged into this resource before other attributes are applied.
* `vertices` (`v`) - an array of `Vertex` objects.
* `faces` (`f`) - an array of `Face` objects.
* `regions` (`r`) - an array of `Region` objects.
* `morphs` (`m`) - an array of `Morph` objects.

## InventoryResource (`Inv`)

This Resource holds a single Item in possession of a Player.

It also defines the Item's customization, such as colors, etc.

Properties:

* `playerId` (`pl`)
* `itemId` (`im`)
* `costumeId` (`cm`) - ID of the Costume this Item is currently placed on to.
* `colors` (`cl`) - an array of Palette properties (`color0` to `color9`, `eye0`, `eye1`, `light0` and `light1`) that are used to apply colors to the Item's regions. The final color is decided by the Palette picked by the Player during Fighter Select.

## ItemResource (`Im`)

This Resource holds information about an Item, which is a combination of one or more Geometries.

Properties:

* `name` (`n`)
* `parts` (`p`) - a collection of `ItemPart` objects:
  * `id` - part ID.
  * `resourceType` (`rT`) - possible values: `"g"` (geometry), `"p"` (point - a blank Object3D), `"l"` (light)
  * `resourceId` (`rI`) - part type ID. Example: when `type` is a geometry, this property holds the geometry ID.
  * `parent` (`par`) - parent part ID. First object is always "root". All other objects must have a parent.
  * `position` (`p`) - contains a `Vector3` object.
  * `rotation` (`r`) - contains a `Vector3` object.
  * `quaternion` (`q`) - contains a `Quaternion` object.
  * `scale` (`s`) - contains a `Vector3` object.
  * `lightType` (`l`) - only for light parts. Possible values: `"a"` (ambient light), `"s"` (spotlight), `"d"` (directional light).
  * `castShadow` (`cs`) - determines if rendered geometry casts shadows, or if light casts shadows. Not applicable to points.
  * `receiveShadow` (`rs`) - determines if rendered geometry receives shadows. Not applicable to points.
  * `outline` (`o`) - `true` if rendered geometry should have an outline effect. Not applicable to points and lights.
  * `slot` (`sl`) - slot name. Only applicable to points. Allows other spawns to be attached to this slot.
* `regions` (`r`) - a collection of paintable `ItemRegion` objects:
  * `id` - region ID.
  * `partId` (`p`) - must be a geometry part.
  * `regions` (`r`) - array of region IDs of the geometry that should be painted with a single color.
  * `color` (`c`) - default color of this region.
* `slots` (`sl`) - array of `ItemSlot` objects (only required for costume pieces):
  * `skeleton` (`s`) - Skeleton ID this Item is compatible with.
  * `bone` (`b`) - Bone ID this Item will be attached to.
  * `slot` (`sl`) - if present, attachment will happen at the Item currently attached to the Bone instead of the Bone itself. Used for accessories.
  * `partId` (`p`) - part that should be attached to the Bone or Slot. If `null`, the root part will be attached.
    * If part has a parent, it will be removed, as hierarchy will be handled by the Skeleton in this case.

## SpawnResource (`Spw`)

A Spawn is an Item in the possession of a Character or placed into a Stage. One Item can have multiple Spawns, and each Spawn can be customized with different colors and modifiers.

Properties:

* `id` - Spawn ID.
* `item` (`itm`) - Item ID.
* `character` (`ch`) - Character ID this Spawn belongs to. `null` if Spawn is a Stage Item.
* `properties` (`p`) - a collection of `SpawnProperty` objects:
  * `type` (`t`) - property type. Possible values: `"p"` (Part) or `"r"` (Region).
  * `id` - ID of the Part of Region, depending on the type value.
  * `offset` (`p`) - position adjustment (incremental). A `Vector3` object.
  * `color` (`c`) - region or part color. Also sets light color.
  * `intensity` (`i`) - light intensity. Not applicable to geometries or points.

## MatchResource (`Mt`)

This Resource holds informations about a match between Characters.

Initially, Matches will only support two single Characters, but this Resource is being built with Teams in mind for future support.

Properties:

* `teams` (`tm`) - an array of Teams:
  * `id` - Team ID. Usually starts from `1` up to how many Teams are currently playing.
  * `side` (`s`) - screen side this Team will be placed. `"l"` for left, `"r"` for right.
  * `color` (`c`) - team color, in HEX format. Defaults to blue/green for left teams, red/orange for right teams.
  * `characterIds` (`ch`) - array of Character IDs that belong to this team. Attacks will not collide with Characters of the same Team, and they can pass through each other.
  * `weight` (`w`) - Health Points multiplier for each Character in this team. Used when the number of Characters between teams are different. Teams with less Characters have more HP. Defaults to 1.
* `ft` (`f`) - first Team to reach this number of rounds won wins the match. Defaults to 2. In Team matches, defaults to 1.
* `time` (`t`) - time limit per round in seconds. Defaults to 99.
* `rounds` (`r`) - an array of rounds:
  * `number` (`n`) - the round number.
  * `characterIds` (`ch`) - array of two Character IDs that started the round.
  * `loser` (`l`) - Character ID that lost the round.
  * `time` (`t`) - remaining time in seconds after the end of the round.
* `winner` (`w`) - Team ID that won the match.
* `ragequit` (`q`) - array of Character indexes that rage-quit'd the match. If all Characters in a Team ragequit or disconnect, the opposing Team is declared the winner.
* `saved` (`s`) - `true` if replay information has been saved for this match and uploaded to the cloud.
* `rewards` (`cr`) - an array of rewards given to each Character, including losers, after each round ends:
  * `round` (`r`) - Round number. Will be `null` for Match-wide rewards.
  * `characterId` (`ch`)
  * `currencyId` (`cr`)
  * `amount` (`v`) - amount can be negative (damage costs, etc).

Runtime Properties:

* `replay` - a large array of messages sent to the client over the course of the match. This data is used to save replay files in the cloud.

## MechanicResource (`Mc`)

This Resource refers to a single fighting game Mechanic, which can be unlocked by leveling up Core Skills.

Properties:

* `name` (`n`)
* `description` (`d`)
* `skillId` (`sk`) - ID of the Core Skill that unlocks the Mechanic.
* `level` (`l`) - Skill Level required to unlock the Mechanic.

## PaletteResource (`Pal`)

A Palette is a list of Colors that the Player can use to assign colors to certain Character details, and also color Items in their inventory.

Properties:

* `characterId` (`ch`) - ID of the Character the Palette belongs to.
* `name` (`n`) - Palette name, editable by the Player.
* `color0` to `color9` (`c0` to `c9`) - up to ten colors in HEX format.
* `eye0` and `eye1` (`e0`, `e1`) - color for the Character's eyes.
* `light0` and `light1` (`l0`, `l1`) - colors for Character's lights, for Costume pieces that have lighting effects.

Eyes and lighting effects can be changed by Skills. It works like this: if a Skill changes a character's eye colors (or lighting on their costumes), it will switch from `eye0` to `eye1`, and `light0` to `light1` So if you don't want the color to change, set the same color to both.

## PlayerResource (`Pl`)

This Resource represents a human Player. Commonly called "user".

Properties:

* `handle` (`h`) - Player's username. It can only accept lowercase letters, numbers, and hyphen (only in the middle of the string). Cannot start with a number.
* `characters` (`ch`) - a collection of `CharacterResource`s that belong to the Player.
* `currencies` (`cr`) - a collection of `PlayerCurrencyResource` objects.
* `inventory` (`inv`) - a collection of `PlayerItemResource` objects.

## PoseResource (`Po`)

This Resource holds the bone rotations of a given Skeleton.

Properties:

* `name` (`n`) - name of the Pose.
* `skeleton` (`s`) - Skeleton ID the Pose is compatible with (e.g., `"human"`).
* `rotations` (`r`) - a collection of `BoneRotation` objects.

## ProfileResource (`Pf`)

A Profile holds personal information about a Character in a given time and universe.

A Character can have more than one Profile (alternate personas, younger versions, etc).

Everything that's related to gameplay is tied to a Profile rather than a Character, so that different Profiles can have completely different gameplay styles.

Properties:

* `characterId` (`ch`)
* `shortName` (`sN`) - Character's nickname. This is the name that appears on the HUD (Health bar).
* `fightingStyleId` (`fs`) - the Fighting Style chosen upon Character creation.
* `permalink` (`p`) - a unique handle that is shown in URLs when viewing character information. Only applicable to NPCs.
* `firstName` (`fN`) - Character's first name.
* `middleNames` (`mN`) - Character's middle names.
* `lastName` (`lN`) - Character's last name.
* `gender` (`g`) - `"m"` (male), `"f"` (female), or `"u"` (unknown)
* `age` (`a`) - Character's age.
* `country` (`c`) - code of the Character'country of origin.
* `description` (`d`) - long text with brief character story.
* `costumeId` (`cm`) - default Costume ID for the Character.
* `paletteId` (`pal`) - default Palette ID for the Character.
* `version` (`v`) - Character's current version fingerprint, which is generated based on the Character's equipped Items, Skills, Mechanics, etc.

## SkillResource (`Sk`)

A Skill represents a fighting game move or technique.

Properties:

* `alias` (`as`) - normalized ID of the Skill. Used in Daily Practice, A.I., and other mechanics.
* `name` (`n`) - name of the Skill.
* `parent` (`p`) - ID of the parent Skill.
* `minimumLevel` (`min`) - minimum level this Skill is usable. Usually 1 for Active Skills and 0 for Core Skills.
* `maximumLevel` (`max`) - maximum level of the Skill. Defaults to 10.
* `performance` (`p`) - performance bonus per Level. Usually 1 for Active Skills and 0 for Core Skills.
* `animationId` (`ani`) - ID of the default animation of this Skill.
* `fightingStyleIds` (`fs`) - an array of Fighting Style IDs that Characters need to belong to, to be able to use this Skill.
* `keyframes` (`k`) - a collection of `SkillKeyframe` objects with information about hitboxes, positioning, and other details.
* `flags` (`fl`) - an array of allowed Skill Flags and their penalties for this particular Skill.
