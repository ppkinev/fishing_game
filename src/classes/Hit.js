import Drawable from '../classes/Drawable.js'
import { hasCollision } from '../utils/hasCollision.js'

class Hit extends Drawable {
  constructor() {
    const { x, y, width } = document.getElementById('rod-power-btn').getBoundingClientRect()
    const leftOffset = document.getElementById('user').clientWidth
    super(x - leftOffset + (width / 2), y, 15, 'hit')
    this.draw()
    // this.remove(5_000)
  }

  hasCollisionWith(drawable) {
    return hasCollision(this, drawable)
  }
}

export default Hit
