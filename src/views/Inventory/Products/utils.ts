import { getTypeSpecificVariantFields } from "./Components/VariantSizeSection"

export const validateProductCreateVariants = values => {
  // TODO: Remove mock SKUs
  const skus = ["STIS-PNK-SS-015", "STIS-PNK-SS-015", "STIS-PNK-SS-015"]
  const productType = values?.productType
  const generalFields = ["Weight", "Total count"]
  const typeSpecificVariantFields = getTypeSpecificVariantFields(productType)
  const fields = [...generalFields, ...typeSpecificVariantFields]
  const errors = {}

  skus.forEach(sku => {
    fields.forEach(field => {
      const fieldName = `${sku}_${field.toLowerCase().replace(" ", "")}`
      if (!values?.[fieldName]) {
        errors[fieldName] = "Required"
      } else if (isNaN(parseFloat(values?.[fieldName]))) {
        errors[fieldName] = "Invalid float"
      }
    })
  })

  return errors
}
