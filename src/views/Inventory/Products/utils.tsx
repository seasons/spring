export const getModelSizeDisplay = (productType: string, modelSizeName: string, bottomSizeType: string) => {
  // Get the modelSizeDisplay which is usually just the modelSizeName except
  // for when it is a bottom whose type is not Letter.
  let modelSizeDisplay
  switch (productType) {
    case "Top":
      modelSizeDisplay = modelSizeName
      break
    case "Bottom":
      modelSizeDisplay = bottomSizeType === "Letter" ? modelSizeName : `${bottomSizeType} ${modelSizeName}`
  }
  return modelSizeDisplay
}

export const extractVariantSizeFields = ({
  isEdit,
  productType,
  size,
  values,
}: {
  isEdit: boolean
  productType: string
  size: string
  values: any
}) => {
  const sizeData = {}
  // We don't include the total count when editing a variant
  const genericMeasurementKeys = isEdit ? ["weight"] : ["weight", "totalcount"]
  let measurementKeys
  switch (productType) {
    case "Top":
      measurementKeys = ["sleeve", "shoulder", "chest", "neck", "length", ...genericMeasurementKeys]
      break
    case "Bottom":
      measurementKeys = ["waist", "rise", "hem", "inseam", ...genericMeasurementKeys]
      break
  }
  measurementKeys.forEach(measurementKey => {
    const key = measurementKey === "totalcount" ? "total" : measurementKey
    sizeData[key] = parseFloat(values[`${size}_${measurementKey}`]) || undefined
  })
  return sizeData
}

export const getDateISOString = (date?: string) => {
  return date && new Date(date).toISOString()
}

export const getLocaleDateString = (date?: string) => {
  return date && new Date(date).toLocaleDateString("en-US")
}

/**
 * Uses [values] to form the data used in the productUpsert mutation
 * inside the New product flow.
 * @param values: set of values retrieved from the Product Create form
 */
export const getProductUpsertData = (values: any) => {
  const {
    architecture,
    bottomSizeType,
    brand: brandID,
    category: categoryID,
    color: colorCode,
    description,
    functions,
    innerMaterials,
    model: modelID,
    modelSize: modelSizeName,
    name,
    outerMaterials,
    productType,
    retailPrice,
    season,
    secondaryColor: secondaryColorCode,
    status,
    tags,
  } = values

  // Get the image files which are stored as image_0, image_1, etc.
  const numImages = 4
  const images = [...Array(numImages).keys()].map(index => {
    return values[`image_${index}`]
  })

  const modelSizeDisplay = getModelSizeDisplay(productType, modelSizeName, bottomSizeType)

  // Get dictionary of product variant SKUs to their sizes
  const skusToSizes = {}
  Object.entries(values).forEach(entry => {
    const key = entry[0]
    const value = entry[1] as string
    if (key.includes("_sku")) {
      const sku = value
      const size = key.split("_")[0]
      skusToSizes[sku] = size
    }
  })

  // Get physical products data by using their seasonsUID as the key
  const physicalProductFieldKeys = [
    "dateOrdered",
    "dateReceived",
    "inventoryStatus",
    "physicalProductStatus",
    "unitCost",
  ]
  const seasonsUIDToData = {}
  Object.keys(values).forEach(key => {
    const value = values[key]
    if (physicalProductFieldKeys.some(fieldKey => key.includes(fieldKey))) {
      // Key is of the form <seasonsUID>_<fieldKey>, i.e. ALMC-BLU-SS-001-01_dateOrdered
      const [seasonsUID, fieldKey] = key.split("_")
      let fieldValue
      if (["dateOrdered", "dateReceived"].includes(fieldKey)) {
        // Convert date to ISO string format
        fieldValue = getDateISOString(value)
      } else if (fieldKey === "unitCost") {
        // Convert to float
        fieldValue = parseFloat(value) || null
      } else {
        fieldValue = value
      }
      if (seasonsUIDToData[seasonsUID]) {
        seasonsUIDToData[seasonsUID][fieldKey] = fieldValue
      } else {
        seasonsUIDToData[seasonsUID] = { [fieldKey]: fieldValue }
      }
    }
  })

  // Get variants data by looping through the SKUs
  const variantsData = Object.keys(skusToSizes).map(sku => {
    const size = skusToSizes[sku]
    const variantData = {
      sku,
      internalSizeName: size,
      bottomSizeType,
    }
    // Loop through the seasonsUIDs and extract the data for the physical products
    // that belong to this variant.
    // The seasonsUID of the relevant appropriate physical product is in the format
    // {Product Variant SKU}-{index}
    const physicalProductsData = Object.keys(seasonsUIDToData)
      .map(seasonsUID => {
        if (seasonsUID.includes(sku)) {
          const { inventoryStatus, physicalProductStatus, dateOrdered, dateReceived, unitCost } = seasonsUIDToData[
            seasonsUID
          ]
          return {
            dateOrdered,
            dateReceived,
            inventoryStatus,
            productStatus: physicalProductStatus,
            seasonsUID,
            unitCost,
          }
        } else {
          return null
        }
      })
      .filter(Boolean)

    variantData["physicalProducts"] = physicalProductsData

    // Get the relevant size values for the productType, i.e. shoulder, chest, etc. for Top
    const variantSizeData = extractVariantSizeFields({ values, productType, size, isEdit: false })

    return {
      ...variantSizeData,
      ...variantData,
    }
  })

  // Piece all the data together
  const productsData = {
    architecture: architecture,
    bottomSizeType,
    brandID,
    categoryID,
    colorCode,
    description,
    functions: functions || [],
    images,
    innerMaterials: innerMaterials || [],
    modelID,
    modelSizeDisplay,
    modelSizeName,
    name,
    outerMaterials: outerMaterials || [],
    retailPrice: parseInt(retailPrice),
    season,
    secondaryColorCode,
    status,
    tags: tags || [],
    type: productType,
    variants: variantsData,
  }
  return productsData
}

/**
 * Uses [values] to form the data used in the updateProduct mutation
 * inside the Edit product flow.
 * @param values: set of values retrieved from the Edit product form
 */
export const getProductUpdateData = (values: any) => {
  const {
    architecture,
    bottomSizeType,
    brand: brandID,
    category: categoryID,
    color: colorCode,
    description,
    functions,
    innerMaterials,
    model: modelID,
    modelSize: modelSizeName,
    name,
    outerMaterials,
    productType,
    retailPrice,
    season,
    secondaryColor: secondaryColorCode,
    status,
    tags,
  } = values

  const modelSizeDisplay = modelSizeName ? getModelSizeDisplay(productType, modelSizeName, bottomSizeType) : null
  const numImages = 4
  const images = [...Array(numImages).keys()]
    .map(index => {
      return values[`image_${index}`]
    })
    .filter(Boolean)

  const updateProductData = {
    architecture,
    bottomSizeType,
    brand: { connect: { id: brandID } },
    category: { connect: { id: categoryID } },
    color: { connect: { colorCode } },
    description,
    functions,
    images,
    innerMaterials: { set: innerMaterials },
    model: modelID && { connect: { id: modelID } },
    modelSizeDisplay,
    modelSizeName,
    name,
    outerMaterials: { set: outerMaterials },
    retailPrice,
    season,
    secondaryColor: secondaryColorCode && { connect: { colorCode: secondaryColorCode } },
    status,
    tags,
    type: productType,
  }
  return updateProductData
}
