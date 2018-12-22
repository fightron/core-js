import { BaseResource } from './BaseResource'
import { ArrayCollection } from '../collections/ArrayCollection'
import { RigItem } from '../lib/RigItem'

export class RigResource extends BaseResource {
  constructor () {
    super()
    this._type = 'Rig'
    this.build = null
    this.characterBuildId = null
    this.isRigResource = true // internal optimization
    this.skeleton = null
    this.items = new ArrayCollection(this)
    this.bones = new Map() // renderable bones, mapped by ID
    this.animation = null // current animation
    this.animationStart = null // animation start frame (allows one animation to be reused by multiple rigs)
  }

  patch (data, client) {
    if (!data) return
    super.patch(data)
    this.characterBuildId = data.bd
    var skeletonId = data.sl
    if (skeletonId) {
      this.skeleton = client.skeletons.find(skeletonId)
    }
    var items = data.i
    if (items) {
      var itemData, rigItem
      for (itemData of items) {
        rigItem = new RigItem()
        rigItem.rig = this
        rigItem.item = client.items.find(itemData.id)
        rigItem.slot = itemData.s
        this.items.add(rigItem)
      }
    }
  }

  free () {
    this.build = null
    this.skeleton = null
    this.items.free()
    this.items = null
    this.bones = null
    super.free()
  }
}
