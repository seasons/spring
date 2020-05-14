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
