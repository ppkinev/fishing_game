import Hit from '../classes/Hit.js'
import Pond from '../classes/Pond.js'

import { randomNumber } from '../utils/random.js'

class GameField {
  #rodAngle = 180 // 100 -> 260
  #rodPower = 0 // 0 -> 1

  #fishArea = document.getElementById('fish-area')
  #rodElement = document.getElementById('rod')
  #rodAngleElement = document.getElementById('rod-angle')
  #rodPowerElement = document.getElementById('power-range-progress')
  #rodPowerButton = document.getElementById('rod-power-btn')

  #width = this.#fishArea.clientWidth
  #height = this.#fishArea.clientHeight
  #offset = document.getElementById('island').clientHeight * 0.85
  #ponds = []

  constructor() {
    this.#rodElement.style.transform = `rotateZ(${this.#rodAngle}deg)`
  }

  addHandlers(onRodThrow) {
    this.#rodAngleElement.addEventListener('input', ({ target: { value } }) => {
      this.#rodAngle = value
      this.#rodElement.style.transform = `rotateZ(${this.#rodAngle}deg)`
    })

    const POWER_STATES = ['INCREASE', 'DECREASE']
    let progressInterval
    this.#rodPowerButton.addEventListener('mousedown', () => {
      let state = POWER_STATES[0]
      this.#rodPower = 0
      progressInterval = setInterval(() => {
        if (this.#rodPower <= 0) state = POWER_STATES[0]
        if (this.#rodPower >= 1) state = POWER_STATES[1]
        this.#rodPower = state === POWER_STATES[0] ? this.#rodPower + 0.01 : this.#rodPower - 0.01

        this.#rodPowerElement.style.width = `${this.#rodPower * 100}%`
      }, 10)
    })
    this.#rodPowerButton.addEventListener('mouseup', () => {
      clearInterval(progressInterval)
      this.#rodThrow(onRodThrow)
    })

    window.addEventListener('resize', () => this.#resetDimensions())
  }

  #rodThrow(onRodThrow) {
    const rodX = this.#width / 2
    const rodY = this.#height + this.#offset
    const isRightDirection = this.#rodAngle > 180
    const angle = isRightDirection ? 270 - this.#rodAngle : this.#rodAngle - 90
    const radian = angle * Math.PI / 180
    const fullHypotenuse = Math.min(rodX / Math.cos(radian), rodY / Math.sin(radian)) - this.#offset

    const hypotenuse = fullHypotenuse * this.#rodPower + this.#offset
    const verticalCathetus = hypotenuse * Math.sin(radian)
    const horizontalCathetus = hypotenuse * Math.cos(radian)

    const hitX = (isRightDirection ? rodX + horizontalCathetus : rodX - horizontalCathetus)
    const hitY = rodY - verticalCathetus

    const hit = new Hit()
    hit.updatePosition(hitX, hitY)
    setTimeout(() => onRodThrow(hit), 1_200)
  }

  #resetDimensions(){
    this.#width = this.#fishArea.clientWidth
    this.#height = this.#fishArea.clientHeight
    this.#offset = document.getElementById('island').clientHeight * 0.85
  }

  fishingInPond(hit) {
    const pond = this.#ponds.find(pond => hit.hasCollisionWith(pond))
    if (pond) {
      pond.remove(3_000)
      this.#ponds = this.#ponds.filter(p => p.x !== pond.x && p.y !== pond.y)
    }
    return pond
  }

  makePonds(maxPonds = 5) {
    this.#ponds = Array.from({ length: maxPonds }).map(() => {
      const size = randomNumber(40, 70)
      const x = randomNumber(size, this.#width - size)
      const y = randomNumber(size, this.#height - size)
      const pond = new Pond(x, y, size)
      pond.draw()
      return pond
    })
    return this
  }

  get ponds () {
    return this.#ponds
  }

  removePonds() {
    this.#ponds.forEach(pond => pond.remove())
    this.#ponds = []
  }
}

export default GameField
