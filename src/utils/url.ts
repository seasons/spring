export const formatChargebeeInvoiceURL = id => {
  const domain = process.env.NODE_ENV === "production" ? "seasons" : "seasons-test"
  return `https://${domain}.chargebee.com/d/invoices/${id}`
}
