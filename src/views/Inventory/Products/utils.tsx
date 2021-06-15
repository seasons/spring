export const getTypeSpecificVariantFields = productType => {
  let fields: string[] = []
  switch (productType) {
    case "Top":
      fields = ["Shoulder", "Chest", "Length", "Sleeve", "Neck"]
      break
    case "Bottom":
      fields = ["Waist", "Rise", "Hem", "Inseam"]
      break
    case "Accessory":
      fields = ["Bridge", "Length", "Width"]
      break
  }
  return ["Weight", ...fields]
}

const extractValuesForKey = (values, searchKey, size) => {
  const returnValues: string[] = []

  Object.keys(values).forEach(key => {
    // We use a single input for each manufacturer size type
    // so here we consolidate them all into one array
    if (key.endsWith(searchKey)) {
      const keySize = key.split("_")[0]
      if (keySize === size) {
        returnValues.push(values[key])
      }
    }
  })
  return returnValues
}

const getManufacturerSizeNames = (values, size) => {
  return extractValuesForKey(values, "_manufacturerSize", size)
}

const getManufacturerSizeType = (values, size) => {
  return extractValuesForKey(values, "_manufacturerSizeType", size)?.[0]
}

export const extractVariantSizeFields = ({
  productType,
  size,
  values,
  sizeType,
}: {
  productType: string
  size: string
  sizeType: string
  values: any
}) => {
  const sizeData = {} as any
  // We don't include the total count when editing a variant
  const genericMeasurementKeys = ["weight", "totalcount"]
  let measurementKeys
  let internalSizeType
  switch (productType) {
    case "Top":
      measurementKeys = ["sleeve", "shoulder", "chest", "neck", "length", ...genericMeasurementKeys]
      internalSizeType = "Letter"
      break
    case "Bottom":
      internalSizeType = "WxL"
      measurementKeys = ["waist", "rise", "hem", "inseam", ...genericMeasurementKeys]
      break
    case "Accessory":
      internalSizeType = sizeType
      measurementKeys = ["bridge", "length", "width", ...genericMeasurementKeys]
      break
  }
  measurementKeys.forEach(measurementKey => {
    const key = measurementKey === "totalcount" ? "total" : measurementKey
    sizeData[key] = parseFloat(values[`${size}_${measurementKey}`]) || undefined
  })

  const manufacturerSizeNames = getManufacturerSizeNames(values, size)

  if (manufacturerSizeNames.length) {
    const manufacturerSizeType = getManufacturerSizeType(values, size)

    sizeData.manufacturerSizeNames = manufacturerSizeNames
    sizeData.manufacturerSizeType = values.manufacturerSizeType || manufacturerSizeType
    sizeData.internalSizeType = internalSizeType
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
export const getProductUpsertData: any = (values: any) => {
  const {
    architecture,
    brand,
    buyNewEnabled,
    buyUsedEnabled,
    buyUsedPrice,
    category: categoryID,
    color: colorCode,
    description,
    functions,
    innerMaterials,
    materialCategory: materialCategorySlug,
    model: modelID,
    modelSize: modelSizeName,
    manufacturerSizeType,
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

  let modelSizeDisplay = modelSizeName

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
      } else if (["unitCost"].includes(fieldKey)) {
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
    const variantSizeData = extractVariantSizeFields({ values, productType, sizeType: manufacturerSizeType, size })
    const shopifyProductVariantData = values[`${size}_shopifyProductVariant`]
      ? { shopifyProductVariant: { externalId: values[`${size}_shopifyProductVariant`]?.externalID } }
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
    brandID: brand.value,
    buyNewEnabled,
    buyUsedEnabled,
    buyUsedPrice: parseFloat(buyUsedPrice) * 100,
    categoryID,
    colorCode,
    description,
    functions: functions || [],
    images,
    innerMaterials: innerMaterials || [],
    materialCategorySlug,
    modelID,
    modelSizeDisplay,
    modelSizeName,
    modelSizeType: manufacturerSizeType,
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
    brand,
    buyNewEnabled,
    buyUsedEnabled,
    buyUsedPrice,
    category: categoryID,
    color: colorCode,
    description,
    externalURL,
    functions,
    innerMaterials,
    materialCategory: materialCategorySlug,
    model: modelID,
    modelSize: modelSizeName,
    manufacturerSizeType,
    name,
    outerMaterials,
    photographyStatus,
    productFit,
    productType,
    retailPrice,
    secondaryColor: secondaryColorCode,
    status,
    styles,
    tags,
    wearableSeasons,
    internalSeasonSeasonCode,
    internalSeasonYear,
    vendorSeasonSeasonCode,
    vendorSeasonYear,
  } = values

  const modelSizeDisplay = modelSizeName
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

  return {
    architecture,
    brand: { connect: { id: brand.value } },
    buyNewEnabled,
    buyUsedPrice: parseFloat(buyUsedPrice) * 100,
    buyUsedEnabled,
    category: { connect: { id: categoryID } },
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
    modelSizeType: manufacturerSizeType,
    name,
    styles,
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
}

/**
 * Uses [values] to form the data used in the variantsUpsert mutation
 * inside the New variants flow.
 * @param values: set of values retrieved from the New variants form
 */
export const getProductVariantUpsertData = ({ values, product }) => {
  const productType = product?.type
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
  ]

  const data = Array.from(Array(numVariants).keys()).map(index => {
    // We will show a manufacturerSizeType field in the create view if no variants
    const manufacturerSizeType = values[`${index}_manufacturerSizeType`]
      ? values[`${index}_manufacturerSizeType`]
      : product?.variants?.[0]?.manufacturerSizes?.[0]?.type

    const internalSize = values[`${index}_internalSize`]
    const manufacturerSize = values[`${index}_manufacturerSize`]

    // Get measurement values
    const measurementData = {}
    variantMeasurementFieldKeys.forEach(key => {
      const measurement = values[`${index}_${key}`]
      if (measurement) {
        const dataKey = key === "totalcount" ? "total" : key
        measurementData[dataKey] = Number(measurement)
      }
    })

    const shopifyProductVariantExternalId = values[`${index}_shopifyProductVariant`]
      ? { shopifyProductVariant: { externalId: values[`${index}_shopifyProductVariant`]?.externalId } }
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
          } else if (["unitCost"].includes(key)) {
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
      internalSizeType: productType === "Top" ? "Letter" : "WxL",
      internalSizeName: internalSize,
      manufacturerSizeNames: [manufacturerSize],
      manufacturerSizeType,
      physicalProducts,
      ...measurementData,
      ...shopifyProductVariantExternalId,
    }
  })

  return data
}
