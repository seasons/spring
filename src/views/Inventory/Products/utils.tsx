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
