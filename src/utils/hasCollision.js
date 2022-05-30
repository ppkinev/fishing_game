export const hasCollision = (a, b) => {
  // Adding half size offsets due to using transform: translate(-50%, -50%) in CSS
  const aX = a.x - (a.width / 2)
  const aY = a.y - (a.height / 2)
  const bX = b.x - (b.width / 2)
  const bY = b.y - (b.height / 2)

  const hasLeftTopCollided = aX >= bX && aX <= bX + b.width && aY >= bY && aY <= bY + b.height
  const hasRightTopCollided = aX + a.width >= bX && aX + a.width <= bX + b.width && aY >= bY && aY <= bY + b.height
  const hasLeftBottomCollided = aX >= bX && aX <= bX + b.width && aY + a.height >= bY && aY + a.height <= bY + b.height
  const hasRightBottomCollided = aX + a.width >= bX && aX + a.width <= bX + b.width && aY + a.height >= bY && aY + a.height <= bY + b.height

  return hasLeftTopCollided || hasRightTopCollided || hasLeftBottomCollided || hasRightBottomCollided
}
