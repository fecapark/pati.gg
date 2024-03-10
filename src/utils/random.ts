export const sample = (arr: any[], n = 1) => {
  const shuffled = arr.sort(() => 0.5 - Math.random())
  const selected = shuffled.slice(0, n)
  return selected
}

export const dummy = null
