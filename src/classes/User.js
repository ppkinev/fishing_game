import { randomNumber } from '../utils/random.js'

import rods from '../items/rods.js'
import fishes from '../items/fish.js'

class User {
  #level = 1
  #rod = rods.basic
  #caughtFish = []

  #cashElement = document.getElementById('cash')
  #fishListElement = document.getElementById('fish-list')

  #updateInfo() {
    this.#cashElement.innerText = this.cash.toFixed(2)
    this.#fishListElement.innerHTML = this.#caughtFish
      .map(fish => `<li>${fish.name}: $${fish.price.toFixed(2)}</li>`).join('')
  }

  get cash() {
    // TODO: add expenses later and deduct from the cash
    return this.#caughtFish.reduce((acc, fish) => acc + fish.price, 0)
  }

  get info() {
    return {
      level: this.#level,
      cash: this.cash,
      rod: this.#rod,
      fish: this.#caughtFish.map(fish => fish.name),
    }
  }

  catchFish() {
    const odds = randomNumber(0, this.#rod.maxRarity)
    for (let fish of fishes) {
      if (odds >= fish.rarity) {
        this.#caughtFish.push(fish)
        this.#updateInfo()
        break
      }
    }
  }
}

export default User
