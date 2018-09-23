import { SkeletonResource } from '../../resources/SkeletonResource'

// Measurements in cm.
// Directions reference, from character POV:
// - left +x, right -x
// - front +z, back -z

const NECK_HEIGHT = 10
// const SHOULDER_HEIGHT = 3
const SHOULDER_OFFSET = 14
const CHEST_HEIGHT = 16
// const CHEST_WIDTH = 32
const ABDOMEN_HEIGHT = 14
const HIP_HEIGHT = 11
// const HIP_WIDTH = 31
// const HIP_DEPTH = 12

const ARM_UPPER_HEIGHT = 30
const ARM_LOWER_HEIGHT = ARM_UPPER_HEIGHT

const PALM_HEIGHT = 10
const FINGER_SEGMENT_HEIGHT = 5
const FINGER_SEGMENT_HEIGHT_90 = 4
const FINGER_SEGMENT_HEIGHT_80 = 3
const FINGER_WIDTH = 3

const THUMB_WIDTH = FINGER_WIDTH
const THUMB_OFFSET = 4.5
const THUMB_SEGMENT_HEIGHT = FINGER_SEGMENT_HEIGHT

const INDEX_OFFSET = 4.5
const MIDDLE_OFFSET = 1.4
const RING_OFFSET = -1.8
const PINKY_OFFSET = -4.9

const LEG_UPPER_HEIGHT = 50
const LEG_LOWER_HEIGHT = LEG_UPPER_HEIGHT
const LEG_OFFSET = 8

const FOOT_HEIGHT = 10
const FOOT_BASE_DEPTH = 12

const humanSkeletonData = {
  id: 'h',
  n: 'Human',
  b: [
    { id: 'Root' },
    { id: 'Center', par: 'Root', p: { y: HIP_HEIGHT + LEG_UPPER_HEIGHT + LEG_LOWER_HEIGHT + FOOT_HEIGHT } },
    { id: 'Hip', par: 'Center', rO: 'YXZ' },
    { id: 'LegUpperL', par: 'Hip', rO: 'XZY', p: { x: LEG_OFFSET, y: -HIP_HEIGHT } },
    { id: 'LegUpperR', par: 'Hip', rO: 'XZY', p: { x: -LEG_OFFSET, y: -HIP_HEIGHT } },
    { id: 'LegLowerL', par: 'LegUpperL', p: { y: -LEG_UPPER_HEIGHT } },
    { id: 'LegLowerR', par: 'LegUpperR', p: { y: -LEG_UPPER_HEIGHT } },
    { id: 'FootL', par: 'LegLowerL', rO: 'XZY', p: { y: -LEG_LOWER_HEIGHT } },
    { id: 'FootR', par: 'LegLowerR', rO: 'XZY', p: { y: -LEG_LOWER_HEIGHT } },
    { id: 'ToesL', par: 'FootL', p: { y: -FOOT_HEIGHT, z: FOOT_BASE_DEPTH } },
    { id: 'ToesR', par: 'FootR', p: { y: -FOOT_HEIGHT, z: FOOT_BASE_DEPTH } },
    { id: 'Abdomen', par: 'Center' },
    { id: 'Stomach', par: 'Abdomen', p: { y: ABDOMEN_HEIGHT } },
    { id: 'Chest', par: 'Stomach', p: { y: ABDOMEN_HEIGHT } },
    { id: 'Neck', par: 'Chest', p: { y: CHEST_HEIGHT } },
    { id: 'Head', par: 'Neck', p: { y: NECK_HEIGHT } },
    { id: 'ShoulderL', par: 'Chest', rO: 'YXZ', p: { x: SHOULDER_OFFSET, y: CHEST_HEIGHT } },
    { id: 'ShoulderR', par: 'Chest', rO: 'YXZ', p: { x: -SHOULDER_OFFSET, y: CHEST_HEIGHT } },
    { id: 'ArmUpperL', par: 'ShoulderL', p: { x: 10, y: -10 } },
    { id: 'ArmUpperR', par: 'ShoulderR', p: { x: -10, y: -10 } },
    { id: 'ArmLowerL', par: 'ArmUpperL', p: { y: -ARM_UPPER_HEIGHT } },
    { id: 'ArmLowerR', par: 'ArmUpperR', p: { y: -ARM_UPPER_HEIGHT } },
    { id: 'PalmL', par: 'ArmLowerL', p: { y: -ARM_LOWER_HEIGHT } },
    { id: 'PalmR', par: 'ArmLowerR', p: { y: -ARM_LOWER_HEIGHT } },
    { id: 'ThumbBaseL', par: 'PalmL', p: { x: THUMB_OFFSET } },
    { id: 'ThumbMidL', par: 'ThumbBaseL', p: { x: THUMB_WIDTH / 2, y: -THUMB_SEGMENT_HEIGHT } },
    { id: 'ThumbTipL', par: 'ThumbMidL', p: { y: -THUMB_SEGMENT_HEIGHT } },
    { id: 'ThumbBaseR', par: 'PalmR', p: { x: -THUMB_OFFSET } },
    { id: 'ThumbMidR', par: 'ThumbBaseR', p: { x: -THUMB_WIDTH / 2, y: -THUMB_SEGMENT_HEIGHT } },
    { id: 'ThumbTipR', par: 'ThumbMidR', p: { y: -THUMB_SEGMENT_HEIGHT } },
    { id: 'IndexBaseL', par: 'PalmL', p: { x: INDEX_OFFSET, y: -PALM_HEIGHT } },
    { id: 'IndexMidL', par: 'IndexBaseL', p: { y: -FINGER_SEGMENT_HEIGHT } },
    { id: 'IndexTipL', par: 'IndexMidL', p: { y: -FINGER_SEGMENT_HEIGHT_90 } },
    { id: 'IndexBaseR', par: 'PalmR', p: { x: -INDEX_OFFSET, y: -PALM_HEIGHT } },
    { id: 'IndexMidR', par: 'IndexBaseR', p: { y: -FINGER_SEGMENT_HEIGHT } },
    { id: 'IndexTipR', par: 'IndexMidR', p: { y: -FINGER_SEGMENT_HEIGHT_90 } },
    { id: 'MiddleBaseL', par: 'PalmL', p: { x: MIDDLE_OFFSET, y: -PALM_HEIGHT } },
    { id: 'MiddleMidL', par: 'MiddleBaseL', p: { y: -FINGER_SEGMENT_HEIGHT } },
    { id: 'MiddleTipL', par: 'MiddleMidL', p: { y: -FINGER_SEGMENT_HEIGHT } },
    { id: 'MiddleBaseR', par: 'PalmR', p: { x: -MIDDLE_OFFSET, y: -PALM_HEIGHT } },
    { id: 'MiddleMidR', par: 'MiddleBaseR', p: { y: -FINGER_SEGMENT_HEIGHT } },
    { id: 'MiddleTipR', par: 'MiddleMidR', p: { y: -FINGER_SEGMENT_HEIGHT } },
    { id: 'RingBaseL', par: 'PalmL', p: { x: RING_OFFSET, y: -PALM_HEIGHT } },
    { id: 'RingMidL', par: 'RingBaseL', p: { y: -FINGER_SEGMENT_HEIGHT_90 } },
    { id: 'RingTipL', par: 'RingMidL', p: { y: -FINGER_SEGMENT_HEIGHT_90 } },
    { id: 'RingBaseR', par: 'PalmR', p: { x: -RING_OFFSET, y: -PALM_HEIGHT } },
    { id: 'RingMidR', par: 'RingBaseR', p: { y: -FINGER_SEGMENT_HEIGHT_90 } },
    { id: 'RingTipR', par: 'RingMidR', p: { y: -FINGER_SEGMENT_HEIGHT_90 } },
    { id: 'PinkyBaseL', par: 'PalmL', p: { x: PINKY_OFFSET, y: -PALM_HEIGHT } },
    { id: 'PinkyMidL', par: 'PinkyBaseL', p: { y: -FINGER_SEGMENT_HEIGHT_80 } },
    { id: 'PinkyTipL', par: 'PinkyMidL', p: { y: -FINGER_SEGMENT_HEIGHT_80 } },
    { id: 'PinkyBaseR', par: 'PalmR', p: { x: -PINKY_OFFSET, y: -PALM_HEIGHT } },
    { id: 'PinkyMidR', par: 'PinkyBaseR', p: { y: -FINGER_SEGMENT_HEIGHT_80 } },
    { id: 'PinkyTipR', par: 'PinkyMidR', p: { y: -FINGER_SEGMENT_HEIGHT_80 } }
  ]
}

var humanSkeletonResource = new SkeletonResource()
humanSkeletonResource.patch(humanSkeletonData)
humanSkeletonResource.free = function () {
  // this resource is not freeable
}

export { humanSkeletonResource, humanSkeletonData }
