export const centsToAmount = cents => {
  const dollars = parseInt(cents) / 100
  return `$ ${dollars.toFixed(2)}`
}
