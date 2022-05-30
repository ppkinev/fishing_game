class Drawable {
  #element
  #fishArea = document.getElementById('fish-area')

  constructor(x, y, size, className) {
    this.x = x
    this.y = y
    this.width = size
    this.height = size
    this.className = className
  }

  draw() {
    this.#element = document.createElement('div')
    this.#element.classList.add(this.className)
    this.#element.style.left = `${this.x}px`
    this.#element.style.top = `${this.y}px`
    this.#element.style.width = `${this.width}px`
    this.#element.style.height = `${this.height}px`
    this.#fishArea.appendChild(this.#element)
  }

  remove(ms) {
    this.#element.classList.add('fade-out')
    this.#element.style.animationDuration = `${ms - 500}ms`
    setTimeout(() => this.#fishArea.removeChild(this.#element), ms)
  }

  updatePosition(x, y) {
    setTimeout(() => {
      this.x = x
      this.y = y
      this.#element.style.left = `${this.x}px`
      this.#element.style.top = `${this.y}px`
    }, 0)
  }

  get element() {
    return this.#element
  }
}

export default Drawable
