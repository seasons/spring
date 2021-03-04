export const formatPrice = price =>
  (price / 100 || 0).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  })
