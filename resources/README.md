# Resources

A Resource is a data entity that has an ID and belongs to a type.

Examples of Resources:

* Characters,
* Matches (e.g., saved Replays),
* Items,
* Costumes,
* Poses,
* Animations,
* A.I. Builds,
* etc.

Resource data is usually stored somewhere (like a remote storage) and is often used in APIs.

Both Client and Server code can use and extend Resources.

Properties of all Resources (from `BaseResource`):

* `id` - the remote ID of the Resource. E.g., `"123"`.
* `type` - the Resource type. Usually in plural form. E.g, `"characters"`
* `path` (read-only) - returns the Resource path, in the format `type/ID`. E.g., `"characters/123"`. Returns `null` if either the type or ID is null.
* `filename` (read-only) - returns the full path of the storage file, which is different from the Resource path.

Methods:

* `patch(data)` - fills the instance attributes with data.
* `fingerprint()` - returns a SHA-256 hash comprised of the Resource's `identity()`. Used for cache and versioning.
* `identity()` - returns a string with all values required for fingerprinting.

Specialized Resources are listed below in alphabetical order.

## AiResource

This Resource holds the complete A.I. data needed for the CPU to control a character.

Properties:

* `characterId` - ID of the Character that this build belongs to.
* `name` - name of the build.
* `level` - level of this build.
* `xp` - A.I. experience earned on the current level. Works the same as the Character's `xp` property.
* `memory` - list of `AiMemory` objects containing memorized Skills and their timeouts.
* `actions` - list of `AiAction` objects containing the flow of the A.I. build.

## AiAction

This Resource holds a single A.I. Action for a Character.

Properties:

* `aiId` - ID of the A.I. this action belongs to.
* `priority` - an arbitrary integer. Higher value means higher precedence. If two actions have the same priority, the one created first will take precedence. Defaults to zero.
* `idle` - when `true`, this action is cancellable into reactions (actions with `skillId`). Mutually exclusive with `skillId`.
* `chance` - chance of activation as a float between 0 and 1, where 1 means 100% chance.
* `minDistance` - minimum distance for the action to activate, in centimeters. Defaults to zero.
* `maxDistance` - maximum distance for the action to activate, in centimeters. Defaults to full screen distance (value TBD).
* `airborne` - set to `true` to make this action only executable while the Character is in the air.
* `skillId` - (optional) ID of the Skill the enemy will execute that triggers this action. When present, the action will be flagged as "reaction". The Skill must be in the robot's "Memory" (see next Resource) for this reaction to be executable.
* `inputSequenceId` - input sequence to enter if action rolls successfully. Can be a single button/directional press or a complete sequence. The accuracy and speed of the entered sequence depends on the __Execution__ A.I. Attribute.
* `nextActionId` - instead of entering an input sequence, the successful activation of this action can trigger another action. Mutually exclusive with `inputSequenceId`.

## AiMemory

This Resource holds a single memorized Skill that was used against a Character.

Properties:

* `aiId` - ID of the A.I. build this Memory belongs to.
* `skillId` - ID of the memorized Skill.
* `date` - the date the Memory has been last updated.
* `days` - an integer that represents how many days it will take to forget the Skill.
* `practice` - an integer that represents how many times the Skill has been used against the Character within `date`.

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

## AnimationResource

An Animation contains a list of Poses that are applied to a Character's Skeleton within a timeframe.

Properties:

* `name`
* `skeleton` - Skeleton ID the Animation is compatible with.
* `keyframes` - a collection of `AnimationKeyframe` objects, which contain references to Poses.

## CostumeResource

A Costume is a collection of Items that are placed onto a Character's Skeleton.

Properties:

* `characterId` - ID of the Character that owns this Costume.
* `name` - a friendly name defined by the Player.
* `skeleton` - Skeleton ID the Costume is compatible with.
* `items` - a collection of `CostumeItem` objects.

## CharacterResource

A `CharacterResource` can be either a Character created by a Player, or a NPC (Non-Player Character).

This resource only holds information about a Character in regards of gameplay. Character profile data is held by `ProfileResource`.

Properties:

* `playerId` - ID of the Player who created the Character. For NPCs, this property is equal to `"npc"`.
* `skeleton` - Character's Skeleton ID (e.g., `"human"`)
* `level` - Character's current Level.
* `xp` - experience earned on the current Level. When the amount required to level up is reached, the `level` property goes up by 1, and this property resets to zero, then incremented by any leftover from the previous calculation.
* `inventory` - a collection of `CharacterItem` objects in possession of the Character.
* `costumes` - a collection of `CostumeResource`s that belong to the Character.
* `palletes` - a collection of `PalleteResource`s that belong to the Character.
* `attributes` - a collection of `Attribute` objects, including Active, Passive, and A.I. attributes.
* `meters` - a collection of `Meter` objects.
* `skills` - a collection of `CharacterSkillResource`s referencing Skills that the Character has learned, along with their Levels and Enhancements.
* `mechanics` - a collection of `CharacterMechanicResource`s that the Character has activated.
* `enhancements` - a collection of `EnhancementResource`s that the Character has acquired.
* `currencies` - a collection of `Currency` objects that the Character currently possesses.
* `version` - Character's current version fingerprint, which is generated based on the Character's equipped Items, Skills, Mechanics, etc.

## CharacterItemResource

This Resource holds a single Item in possession of a Character.

It also defines the Item's customization, such as colors, etc.

Properties:

* `characterId`
* `itemId`
* `costumeId` - ID of the Costume this Item is currently placed on to.
* `colors` - an array of Pallete properties (`color0` to `color9`, `eye0`, `eye1`, `light0` and `light1`) that are used to apply colors to the Item's regions. The final color is decided by the Palette picked by the Player during Fighter Select.

## CharacterMechanicResource

This Resource holds a single Mechanic that a Character has unlocked.

Properties:

* `characterId`
* `mechanicId`
* `locked` - Mechanic will be locked if the Player changes the Skill's level required for this Mechanic to unlock.
* `active` - unlocked Mechanics can be active or inactive per Player's choice.

## CharacterSkillResource

This Resource holds a single Skill that a Character has earned.

Properties:

* `characterId`
* `skillId`
* `level`
* `enhancements` - an array of Enhancement IDs that are slotted into this Skill.
* `flags` - an array of Skill Flags currently active for this Skill.

## CharacterFightingStyleResource

This Resource holds a single Fighting Style that a Character has unlocked.

Properties:

* `characterId`
* `fightingStyleId`

## FightingStyleResource

This Resource contains information about Fighting Styles.

Properties:

* `name`
* `country` - code of country of origin.
* `bonuses` - a collection of Attribute bonuses applied to Characters that choose this Fighting Style.

## ItemResource

This Resource holds information about an Item, which is a combination of Geometries.

Properties:

* `name`
* `geometries` - a collection of `ItemGeometry` objects.
* `regions` - a collection of `ItemRegion` objects.

## MechanicResource

This Resource refers to a single fighting game Mechanic, which can be unlocked by leveling up Core Skills.

Properties:

* `name`
* `description`
* `skillId` - ID of the Core Skill that unlocks the Mechanic.
* `level` - Skill Level required to unlock the Mechanic.

## PaletteResource

A Palette is a list of Colors that the Player can use to assign colors to certain Character details, and also color Items in their inventory.

Properties:

* `characterId` - ID of the Character the Palette belongs to.
* `name` - Palette name, editable by the Player.
* `color0` to `color9` - up to ten colors in HEX format.
* `eye0` and `eye1` - color for the Character's eyes.
* `light0` and `light1` - colors for Character's lights, for Costume pieces that have lighting effects.

Eyes and lighting effects can be changed by Skills. It works like this: if a Skill changes a character's eye colors (or lighting on their costumes), it will switch from `eye0` to `eye1`, and `light0` to `light1` So if you don't want the color to change, set the same color to both.

## PlayerResource

This Resource represents a human Player. Commonly called "user".

Properties:

* `handle` - Player's username. It can only accept lowercase letters, numbers, and hifen (only in the middle of the string). Cannot start with a number.
* `characters` - a collection of `CharacterResource`s that the Player has created.
* `items` - a collection of `ItemResource`s that are not stored in any of the Player's Characters. Works like an account storage.
* `currencies` - a collection of `Currency` objects that are not stored in any of the Player's Characters.

## PoseResource

This Resource holds the bone rotations of a Skeleton.

Properties:

* `name` - name of the Pose.
* `skeleton` - Skeleton ID the Pose is compatible with (e.g., `"human"`).
* `rotations` - a collection of `BoneRotation` objects.

## ProfileResource

A Profile holds personal information about a Character that is not related to gameplay.

A Character can have more than one Profile.

Properties:

* `characterId`
* `permalink` - a unique handle that is shown in URLs when viewing character information. Only applicable to NPCs.
* `shortName` - Character's nickname. This is the name that appears on the HUD (Health bar).
* `firstName` - Character's first name.
* `middleNames` - Character's middle names.
* `lastName` - Character's last name.
* `gender` - `"m"` (male), `"f"` (female), or `"u"` (unknown)
* `age` - Character's age.
* `country` - code of the Character'country of origin.
* `description` - long text with brief character story.


## SkillResource

A Skill represents a fighting game move or technique.

Properties:

* `name` - name of the Skill.
* `parent` - ID of the parent Skill.
* `animationId` - ID of the animation used to present this Skill.
* `animationIdOnHit` - ID of the animation to execute when the Skill successfully hits. Optional.
* `animationIdOnBlock` - ID of the animation to execute when the Skill is blocked. Optional.
* `fightingStyleIds` - an array of Fighting Style IDs that Characters need to have to be able to use this Skill.
* `keyframes` - a collection of `SkillKeyframe` objects with information about hitboxes, positioning, and other details.
* `flags` - an array of allowed Skill Flags and their penalties.
