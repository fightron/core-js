// Measurements in cm.
// Directions reference, from character POV:
// - left +x, right -x
// - front +z, back -z

const EIGHT_HEADS = 180 // cm

const ONE_HEAD = EIGHT_HEADS / 8

export const HEAD_HEIGHT = ONE_HEAD
export const HEAD_WIDTH = ONE_HEAD * 0.8
export const HEAD_DEPTH = ONE_HEAD * 0.8

export const NECK_HEIGHT = ONE_HEAD / 2
export const NECK_WIDTH = 12
export const NECK_DEPTH = 12

export const CHEST_HEIGHT = ONE_HEAD / 2
export const CHEST_WIDTH = ONE_HEAD * 1.6
export const CHEST_DEPTH = ONE_HEAD * 0.8

export const STOMACH_HEIGHT = ONE_HEAD / 2
export const STOMACH_WIDTH = ONE_HEAD * 1.5
export const STOMACH_DEPTH = ONE_HEAD * 0.8

export const ABDOMEN_HEIGHT = ONE_HEAD / 2
export const ABDOMEN_WIDTH = ONE_HEAD * 0.8
export const ABDOMEN_DEPTH = ONE_HEAD * 0.8

export const HIP_HEIGHT = ONE_HEAD / 2
export const HIP_WIDTH = ONE_HEAD * 1.4
export const HIP_DEPTH = ONE_HEAD * 0.8

export const SHOULDER_HEIGHT = 3
export const SHOULDER_WIDTH = 3
export const SHOULDER_DEPTH = 3
export const SHOULDER_OFFSET = CHEST_WIDTH / 2

export const ARM_UPPER_HEIGHT = ONE_HEAD
export const ARM_LOWER_HEIGHT = ONE_HEAD

export const PALM_HEIGHT = ONE_HEAD / 1.8

export const FINGER_SEGMENT_HEIGHT = ONE_HEAD / 3.5
export const FINGER_SEGMENT_HEIGHT_90 = FINGER_SEGMENT_HEIGHT * 0.9
export const FINGER_SEGMENT_HEIGHT_80 = FINGER_SEGMENT_HEIGHT * 0.8
export const FINGER_WIDTH = ONE_HEAD / 6
export const FINGER_DEPTH = ONE_HEAD / 6

export const THUMB_WIDTH = FINGER_WIDTH
export const THUMB_OFFSET = 4.5
export const THUMB_SEGMENT_HEIGHT = FINGER_SEGMENT_HEIGHT

export const INDEX_OFFSET = 4.5
export const MIDDLE_OFFSET = 1.4
export const RING_OFFSET = -1.8
export const PINKY_OFFSET = -4.9

export const LEG_UPPER_HEIGHT = ONE_HEAD * 2 // till bottom of knee
export const LEG_UPPER_WIDTH = ONE_HEAD / 1.6
export const LEG_UPPER_DEPTH = ONE_HEAD / 1.4

export const LEG_LOWER_HEIGHT = ONE_HEAD * 1.8
export const LEG_LOWER_WIDTH = ONE_HEAD / 2
export const LEG_LOWER_DEPTH = ONE_HEAD / 1.5

export const LEG_OFFSET = ONE_HEAD / 2.5

export const FOOT_HEIGHT = ONE_HEAD / 2
export const FOOT_WIDTH = ONE_HEAD / 1.5
export const FOOT_DEPTH = ONE_HEAD / 1.5
