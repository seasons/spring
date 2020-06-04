export const centsToAmount = cents => {
  const dollars = parseInt(cents) / 100
  return `$ ${dollars.toFixed(2)}`
}

// "ProductUnsatisfactory" -> "Product Unsatisfactory"
export const splitTitleCase = str => {
  let sanitized = ""
  for (const c in str) {
    const letter = str[c]
    if (letter === letter.toUpperCase() && c !== "0") {
      sanitized += " "
    }
    sanitized += letter
  }

  return sanitized
}
