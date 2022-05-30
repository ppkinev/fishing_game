import User from '../classes/User.js'
import GameField from '../classes/GameField.js'

class Game {
  #user = new User() // TODO: can be read from the local storage
  #field = new GameField()
  #tries = 5

  constructor() {
    this.#field.addHandlers(this.#onRodThrow.bind(this))
    this.#field.makePonds()
  }

  #onRodThrow(hit) {
    this.#tries -= 1
    const pond = this.#field.fishingInPond(hit)
    if (pond) this.#user.catchFish(pond)
    hit.remove(5_000)

    this.#checkRules()
  }

  #checkRules() {
    if (this.#tries === 0) {
      this.#field.removePonds()
      this.#tries = 5
      this.#field.makePonds()
    }
  }
}

export default Game
