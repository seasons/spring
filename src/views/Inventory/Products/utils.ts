import { getTypeSpecificVariantFields } from "./ProductCreateComponents/ProductCreateVariantSizeSection"

const INVALID_FLOAT = "Invalid float"
const REQUIRED = "*Required"

export const validateProductCreateDetails = values => {
  const errors: any = {}
  if (!values?.brand) {
    errors.brand = REQUIRED
  }
  if (!values?.name) {
    errors.name = REQUIRED
  }
  if (values?.name?.length > 50) {
    errors.name = "Max 50 characters"
  }
  if (!values?.description) {
    errors.description = REQUIRED
  }
  if (values?.description?.length > 140) {
    errors.description = "Max 140 characters"
  }
  if (!values?.sizes || values?.sizes?.length === 0) {
    errors.sizes = REQUIRED
  }
  if (!values?.status) {
    errors.status = REQUIRED
  }
  if (!values?.model) {
    errors.model = REQUIRED
  }
  if (!values?.modelSize) {
    errors.modelSize = REQUIRED
  }
  if (!values?.productType) {
    errors.productType = REQUIRED
  }
  if (!values?.season) {
    errors.season = REQUIRED
  }
  if (!values?.retailPrice) {
    errors.retailPrice = REQUIRED
  } else if (isNaN(parseFloat(values?.retailPrice))) {
    errors.retailPrice = INVALID_FLOAT
  }
  if (!values?.architecture) {
    errors.architecture = REQUIRED
  }
  if (!values?.category) {
    errors.category = REQUIRED
  }
  if (!values?.subCategory) {
    errors.subCategory = REQUIRED
  }
  if (!values?.color) {
    errors.color = REQUIRED
  }
  if (!values?.secondaryColor) {
    errors.secondaryColor = REQUIRED
  }
  if (!values?.functions || values?.functions?.length === 0) {
    errors.functions = REQUIRED
  }
  if (!values?.outerMaterials || values?.outerMaterials?.length === 0) {
    errors.outerMaterials = REQUIRED
  }
  if (!values?.innerMaterials || values?.innerMaterials?.length === 0) {
    errors.innerMaterials = REQUIRED
  }
  if (!values?.tags || values?.tags?.length === 0) {
    errors.tags = REQUIRED
  }
  return errors
}

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
      console.log("FIELD NAME:")
      if (!values?.[fieldName]) {
        errors[fieldName] = REQUIRED
      } else if (isNaN(parseFloat(values?.[fieldName]))) {
        errors[fieldName] = INVALID_FLOAT
      }
    })
  })

  return errors
}
