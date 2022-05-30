import User from '../classes/User.js'
import GameField from '../classes/GameField.js'

class Game {
  #user = new User() // TODO: can be read from the local storage
  #field = new GameField()
  #round = 1
  #roundElement = document.getElementById('round')
  #maxTries = 5
  #tryElement = document.getElementById('tries')
  #tries = 5

  constructor() {
    this.#field.addHandlers(this.#onRodThrow.bind(this))
    this.#field.makePonds()

    this.#gameRound = 1
    this.#catchTries = this.#maxTries
  }

  #onRodThrow(hit) {
    const pond = this.#field.fishingInPond(hit)
    if (pond) this.#user.catchFish(pond)
    hit.remove(5_000)

    this.#checkRules()
  }

  #checkRules() {
    this.#catchTries = this.#tries - 1

    if (this.#tries === 0) {
      this.#field.removePonds()
      this.#field.makePonds()

      this.#gameRound = this.#round + 1
      this.#catchTries = this.#maxTries
    }
  }

  set #gameRound(round) {
    this.#round = round
    this.#roundElement.innerText = this.#round
  }

  set #catchTries(tries) {
    this.#tries = tries
    this.#tryElement.innerText = Array.from({ length: tries }).map(() => '🪝').join('')
  }
}

export default Game
