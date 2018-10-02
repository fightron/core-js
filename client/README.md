# Client

This is the base Client for the __Fightron Engine__.

Client instances handle game output, mostly in the form of graphics rendering.

This specific class doesn't render anything. It is intended to be inherited by other classes, providing them a prestablished structure to follow.

## Example

The following code snippet demonstrates how to render a simple stage and character, and update them.

```js
var client = new Client()
client.color = 'blue' // background color

// Add a white floor
client.command('+', 'g' /* geometry */, {id: 'plane', ...})
client.command('+', 's' /* schematic */, {id: 'floor', p: [{rT: 'g', rI: 'plane', ...}], ...})
client.command('+', 'i' /* item */, {id: 2, sch: 'floor'})

// Attach the camera to the floor item
client.command('cam', 't', 2) // sets Item ID 2 as the camera target
client.command('cam', 'p', null, 200, -200) // move it back and then up

// Add a dim white light source
client.command('+', 's', {id: 'ambient-light', l: 'amb'})
client.command('+', 'i', {id: 1, sch: 'ambient-light', c: 'grey', ...})

// Add a character
client.command('+', 'ch', {
  id: 'character-1',
  t: 'm', // type: m (modular) or s (skinned)
  s: 'h'  // skeleton: h (human)
})

// Character costume part geometries
client.command('+', 'g', {id: 'head', ...})
client.command('+', 'g', {id: 'neck', ...})
client.command('+', 'g', {id: 'chest', ...})
  // ... rest of geometries

// Character costume part schematics
//   s: compatible skeleton (h = human), b: bone slot
client.command('+', 's', {id: 'head', s: 'h', ...})
client.command('+', 's', {id: 'neck', s: 'h', ...})
client.command('+', 's', {id: 'chest', s: 'h', ...})
  // ... rest of items

// Load Items and attach them to created Character
// Since Items have Skeleton (s) and Bone Slot (b) properties,
//   attaching them to Characters will automatically position
//   them at the correct Bone position
client.command('+', 's', {id: 3, sch: 'head', ch: 'character-1'})
client.command('+', 's', {id: 4, sch: 'neck', ch: 'character-1'})
client.command('+', 's', {id: 5, sch: 'chest', ch: 'character-1'})
  // ... rest of items

// Sets character parent as the floor item,
//   so moving the floor also moves the character.
client.command('>', 'ch', 'character-1', 2)

// Add a pose to the client and apply it to character.
client.command('+', 'po', {id: 'stance', ...})
client.command('po', 'character-1', 'stance')

// Finally, makes the floor visible,
//   which will make the character visible as well.
client.command('v', 2, true)

// Begin rendering.
client.rendering = true
```

## Properties

* __`client.color`__ - background color. Can be transparent.
* __`client.camera`__ - a `Camera` instance used to render the scene.
* __`client.hud`__ - a `Hud` instance used to show game information.
* __`client.game`__ - the `GameWorker` instance that connects the client to the server.
* __`client.rendering`__ - set to `true` to enable rendering. Defaults to `false`.

## Collections

A Client instance internally stores collections for different types of objects.

Collection names are minified to match messaging commands.

### Geometries: __`client.geometries`__

Holds a collection of `GeometryResource` instances.

They are widely reusable and should remain in memory while the client is running.

### Schematics: __`client.schematics`__

A `SchematicResource` instance holds the definitions of an Item.

It can be a stage item, a Character costume piece, a light source, etc.

They are widely reusable and should remain in memory while the client is running.

### Items: __`client.items`__

An `ItemResource` is a visible Item on the scene.

Items are generated from a `SchematicResource` instance. Multiple Items from the same Schematic can be rendered, and each Item can be customized individually, with colors, positioning, rotation, and so on.

When an Item "despawns", it gets removed from this collection; however, the `SchematicResource` instance that created it remains in `client.schematics`.

### Characters: __`client.characters`__

This collection holds all active `CharacterResource` instances on the scene.

`CharacterResource` instances can be posed in addition to have position and rotation updated.

### Poses: __`client.poses`__

A `PoseResource` can be applied onto a `CharacterResource` instance to change their pose.

All Poses in this collection remain in memory while the client is running.

### Animations: __`client.animations`__

An `AnimationResource` is a collection of `PoseResource`s that are applied to a `CharacterResource` over a timeline.

They are stored in the client for performance reasons, so that the client can be requested to "play an animation" instead of sending commands to pose the character over time.

### Sounds: __`client.sounds`__

This collection holds `SoundResource` objects that can be played and/or attached to Characters and Items (for 3D sound effects).

During loading, client will receive a file URL and must download the sound file itself -- binary data is not sent over messaging.

## Messaging

Manipulation of Client assets is done via messaging.

The __`client.command()`__ method handles incoming messages from the current `Game` instance.

Message commands are shortened to decrease traffic between client and server (which may be remote).

### `client.command('+', collectionId, data)`

Adds an object to the given collection.

`collectionId` is the shorthand string that represents the collection: `"g"` for geometries, `"s"` for schematics, etc.

`data` object __must__ have an `id` property, otherwise it will be ignored.

If object with the same ID already exists in collection, it will be replaced.

### `client.command('-', collectionId, objectId)`

Removes the object of given ID from a collection.

### `client.command('>', itemId, parentItemId)`

Sets the parent of a Item or Character target.

Pass `null` in `parentItemId` to remove parent. If parent is specified but not found, target parent will be removed.

### `client.command('v', itemId, visible)`

Sets the visibility of a Item, `visible` being `true` or `false`.

When a Item is added to the client, it defaults to being invisible.

Setting the visibility of a Item also affects its children.

### `client.command('po', characterId, poseId, [easing, duration])`

Applies a Pose to a Character.

`easing` should be the name of an _Easing Function_ (e.g., `"linear"`), and `duration` should be the length of the transition in frames. These two parameters also exist in other functions and behave the same way. Refer to the __@fightron/physics__ project (coming soon) for a list of available easing functions.

### `client.command('am', characterId, animationId)`

Animates a Character.

### `client.command('p', itemId, x, y, z, [easing, duration])`

Positions a Item at the given coordinates.

Passing `null` as a value will keep the current value for that coordinate.

If Item has a parent, positioning will be relative to parent.

### `client.command('p+', itemId, x, y, z, [easing, duration])`

Changes the position of a Item incrementally ("change by" amount).

### `client.command('r', itemId, x, y, z, [easing, duration])`

Rotates a Item in Euler angles.

Values are in radians. Passing `null` as a value will keep the current value for that coordinate.

If Item has a parent, rotation will be relative to parent.

### `client.command('r+', itemId, x, y, z, [easing, duration])`

Changes the rotation of a Item incrementally ("change by" amount).

### `client.command('q', itemId, x, y, z, w)`

Rotates a Item using Quaternions.

All values are __required__, and should be normalized (between 0 and 1).

### `client.command('s', itemId, x, y, z, [easing, duration])`

Scales a Item up or down.

Values should be floats, where `1` represents original size, `2` double size, `0.5` half size, etc. Passing `null` as a value will keep the current value for that coordinate.

If the Item has children, all of them will be scaled together.

### `client.command('cam', 't', itemIdOrNull)`

Sets Camera target to the given Item. This makes the Camera "look at" the Item as it moves.

Note: while a Camera has a target, Camera rotation is disabled. Pass `null` to remove the target and re-enable Camera rotation.

### `client.command('cam', 'p', x, y, z, [easing, duration])`

Places the Camera at the given coordinates.

Position will be relative to parent, if any.

Passing `null` as a value will keep the current value for that coordinate.

### `client.command('cam', 'r', x, y, z, [easing, duration])`

Rotates the Camera by the given Euler angles.

Values are in radians. Passing `null` as a value will keep the current value for that coordinate.

Rotation will be relative to parent, if any.

Note: this action has no effect if Camera has a target.

### `client.command('cam', '>', itemIdOrNull)`

Sets the parent Item for the Camera. Pass `null` to remove parent.

### `client.command('f', frameNumber)`

Sets the frame number. Used for synchronization between the client and the GameWorker.

## WIP

This is a work in progress.
