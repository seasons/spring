export const getSizes = ({ productType, bottomSizes }: { productType: string; bottomSizes: any[] }) => {
  const sizes = {
    Letter: ["XS", "S", "M", "L", "XL", "XXL"],
  }
  if (productType === "Bottom") {
    bottomSizes.forEach(({ type: bottomType, value }) => {
      if (bottomType !== "Letter") {
        const sizeValue = `${bottomType} ${value}`
        bottomType in sizes ? sizes[bottomType].push(sizeValue) : (sizes[bottomType] = [sizeValue])
      }
    })
  }
  const sortedKeys = Object.keys(sizes).sort()
  return sortedKeys.map(key => ({
    sizeType: key,
    values: key === "Letter" ? sizes[key] : Array.from(new Set(sizes[key])).sort(),
  }))
}

export const getModelSizeDisplay = (productType: string, modelSizeName: string, bottomSizeType: string) => {
  // Get the modelSizeDisplay which is usually just the modelSizeName except
  // for when it is a bottom whose type is not Letter.
  let modelSizeDisplay
  switch (productType) {
    case "Top":
      modelSizeDisplay = modelSizeName
      break
    case "Bottom":
      modelSizeDisplay = bottomSizeType === "Letter" ? modelSizeName : `${bottomSizeType || "WxL"} ${modelSizeName}`
  }
  return modelSizeDisplay
}

export const getTypeSpecificVariantFields = productType => {
  let fields: string[] = []
  switch (productType) {
    case "Top":
      fields = ["Shoulder", "Chest", "Length", "Sleeve", "Neck"]
      break
    case "Bottom":
      fields = ["Waist", "Rise", "Hem", "Inseam"]
      break
  }
  return fields
}

const getManufacturerSizeNames = (values, size) => {
  const manufacturerSizeNames: any[] = []

  Object.keys(values).forEach(key => {
    // We use a single input for each manufacturer size type
    // so here we consolidate them all into one array
    if (key.includes("_manufacturerSize_")) {
      const keySize = key.split("_")[0]
      if (keySize === size) {
        manufacturerSizeNames.push(values[key])
      }
    }
  })
  return manufacturerSizeNames
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
  const sizeData = {} as any
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

  const manufacturerSizeNames = getManufacturerSizeNames(values, size)

  if (manufacturerSizeNames.length) {
    sizeData.manufacturerSizeNames = manufacturerSizeNames
  }

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
    brand: brandID,
    buyNewEnabled,
    bottomSizeTypes: bottomSizeType,
    category: categoryName,
    color: colorCode,
    description,
    functions,
    innerMaterials,
    materialCategory: materialCategorySlug,
    model: modelID,
    modelSize: modelSizeName,
    name,
    outerMaterials,
    productFit,
    productType,
    photographyStatus,
    retailPrice,
    secondaryColor: secondaryColorCode,
    status,
    tags,
    wearableSeasons,
    internalSeasonSeasonCode,
    internalSeasonYear,
    vendorSeasonSeasonCode,
    vendorSeasonYear,
  } = values

  // Get the image files which are stored as image_0, image_1, etc.
  const numImages = 4
  const images = [...Array(numImages).keys()].map(index => values[`image_${index}`]).filter(Boolean)

  let modelSizeDisplay
  if (modelSizeName) {
    modelSizeDisplay = getModelSizeDisplay(productType, modelSizeName, bottomSizeType)
  }

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
    "priceBuyUsedPrice",
    "priceBuyUsedEnabled",
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
      } else if (["unitCost", "priceBuyUsedPrice"].includes(fieldKey)) {
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
          const {
            inventoryStatus,
            physicalProductStatus,
            dateOrdered,
            dateReceived,
            unitCost,
            priceBuyUsedEnabled,
            priceBuyUsedPrice,
          } = seasonsUIDToData[seasonsUID]
          return {
            dateOrdered,
            dateReceived,
            inventoryStatus,
            productStatus: physicalProductStatus,
            seasonsUID,
            unitCost,
            price: {
              buyUsedEnabled: priceBuyUsedEnabled || false,
              buyUsedPrice: priceBuyUsedPrice,
            },
          }
        } else {
          return null
        }
      })
      .filter(Boolean)

    variantData["physicalProducts"] = physicalProductsData

    // Get the relevant size values for the productType, i.e. shoulder, chest, etc. for Top
    const variantSizeData = extractVariantSizeFields({ values, productType, size, isEdit: false })
    const shopifyProductVariantData = values[`${size}_shopifyProductVariantExternalId`]
      ? { shopifyProductVariant: { externalId: values[`${size}_shopifyProductVariantExternalId`] } }
      : {}

    return {
      ...variantSizeData,
      ...shopifyProductVariantData,
      ...variantData,
    }
  })

  let season
  if (wearableSeasons || internalSeasonSeasonCode || internalSeasonYear || vendorSeasonSeasonCode || vendorSeasonYear) {
    season = {
      wearableSeasons,
      internalSeasonSeasonCode,
      internalSeasonYear,
      vendorSeasonSeasonCode,
      vendorSeasonYear: Number(vendorSeasonYear),
    }
  }

  // Piece all the data together
  const productsData = {
    architecture: architecture,
    bottomSizeType: bottomSizeType ?? "WxL",
    brandID,
    buyNewEnabled,
    categoryName,
    colorCode,
    description,
    functions: functions || [],
    images,
    innerMaterials: innerMaterials || [],
    materialCategorySlug,
    modelID,
    modelSizeDisplay,
    modelSizeName,
    name,
    outerMaterials: outerMaterials || [],
    productFit,
    photographyStatus,
    retailPrice: parseInt(retailPrice),
    secondaryColorCode,
    status,
    tags: tags || [],
    type: productType,
    variants: variantsData,
    season,
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
    buyNewEnabled,
    category: categoryName,
    color: colorCode,
    description,
    externalURL,
    functions,
    innerMaterials,
    materialCategory: materialCategorySlug,
    model: modelID,
    modelSize: modelSizeName,
    name,
    outerMaterials,
    photographyStatus,
    productFit,
    productType,
    retailPrice,
    secondaryColor: secondaryColorCode,
    status,
    tags,
    wearableSeasons,
    internalSeasonSeasonCode,
    internalSeasonYear,
    vendorSeasonSeasonCode,
    vendorSeasonYear,
  } = values

  const modelSizeDisplay = modelSizeName ? getModelSizeDisplay(productType, modelSizeName, bottomSizeType) : null
  const numImages = 4
  const images = [...Array(numImages).keys()]
    .map(index => {
      return values[`image_${index}`]
    })
    .filter(Boolean)

  let season
  if (wearableSeasons || internalSeasonSeasonCode || internalSeasonYear || vendorSeasonSeasonCode || vendorSeasonYear) {
    season = {
      wearableSeasons,
      internalSeasonSeasonCode,
      internalSeasonYear,
      vendorSeasonSeasonCode,
      vendorSeasonYear: Number(vendorSeasonYear),
    }
  }

  const updateProductData = {
    architecture,
    bottomSizeType: bottomSizeType ?? "WxL",
    brand: { connect: { id: brandID } },
    buyNewEnabled,
    category: { connect: { name: categoryName } },
    color: { connect: { colorCode } },
    description,
    externalURL,
    functions,
    images,
    innerMaterials: { set: innerMaterials },
    materialCategory: materialCategorySlug && { connect: { slug: materialCategorySlug } },
    model: modelID && { connect: { id: modelID } },
    modelSizeDisplay,
    modelSizeName,
    name,
    outerMaterials: { set: outerMaterials },
    photographyStatus,
    productFit,
    retailPrice: parseInt(retailPrice),
    secondaryColor: secondaryColorCode && { connect: { colorCode: secondaryColorCode } },
    status,
    tags,
    type: productType,
    season,
  }

  return updateProductData
}

/**
 * Uses [values] to form the data used in the variantsUpsert mutation
 * inside the New variants flow.
 * @param values: set of values retrieved from the New variants form
 */
export const getProductVariantUpsertData = ({ values, productType }) => {
  let maxVariantIndex = -1
  Object.keys(values).forEach(key => {
    if (key.includes("_sku")) {
      const variantIndex = Number(key.split("_")[0])
      maxVariantIndex = Math.max(maxVariantIndex, variantIndex)
    }
  })
  const numVariants = maxVariantIndex + 1

  const typeSpecificVariantFieldKeys = getTypeSpecificVariantFields(productType).map(key => key.toLowerCase())
  const variantMeasurementFieldKeys = ["weight", "totalcount", ...typeSpecificVariantFieldKeys]
  const physicalProductFieldKeys = [
    "dateOrdered",
    "dateReceived",
    "inventoryStatus",
    "physicalProductStatus",
    "unitCost",
    "priceBuyUsedEnabled",
    "priceBuyUsedPrice",
  ]
  const data = Array.from(Array(numVariants).keys()).map(index => {
    // Get internal size
    let internalSizeName = ""
    let bottomSizeType
    switch (productType) {
      case "Top":
        internalSizeName = values[`${index}_lettersize`].value
        break
      case "Bottom":
        const waist = Math.floor(Number(values[`${index}_waist`]))
        const inseam = Math.floor(Number(values[`${index}_inseam`]))
        internalSizeName = `${waist}x${inseam}`
        bottomSizeType = "WxL"
        break
    }

    // Get measurement values
    const measurementData = {}
    variantMeasurementFieldKeys.forEach(key => {
      const measurement = values[`${index}_${key}`]
      if (measurement) {
        const dataKey = key === "totalcount" ? "total" : key
        measurementData[dataKey] = Number(measurement)
      }
    })

    const shopifyProductVariantExternalId = values[`${index}_shopifyProductVariantExternalId`]
      ? { shopifyProductVariant: { externalId: values[`${index}_shopifyProductVariantExternalId`] } }
      : {}

    // Get physical products data
    const seasonsUIDs = values[`${index}_seasonsUIDs`]
    const physicalProducts = seasonsUIDs.map(seasonsUID => {
      const physicalProductData = { seasonsUID }
      physicalProductFieldKeys.forEach(key => {
        let physicalProductValue = values[`${seasonsUID}_${key}`]
        if (physicalProductValue) {
          if (["dateOrdered", "dateReceived"].includes(key)) {
            // Convert date to ISO string format
            physicalProductValue = getDateISOString(physicalProductValue)
          } else if (["unitCost", "priceBuyUsedPrice"].includes(key)) {
            // Convert to float
            physicalProductValue = parseFloat(physicalProductValue) || null
          }
          const dataKey = key === "physicalProductStatus" ? "productStatus" : key
          physicalProductData[dataKey] = physicalProductValue
        }
      })
      return physicalProductData
    })

    return {
      sku: values[`${index}_sku`],
      internalSizeName,
      bottomSizeType: bottomSizeType ?? "WxL",
      physicalProducts,
      ...measurementData,
      ...shopifyProductVariantExternalId,
    }
  })

  return data
}
