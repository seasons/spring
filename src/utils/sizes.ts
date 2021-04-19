export type ManufacturerSizeType = "EU" | "JP" | "US" | "WxL" | "Letter"

const usWaistSizes = [26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 38]

const usPantLengthSizes = [26, 27, 28, 29, 30, 31, 32, 33, 34]
const usShortLengthSizes = [5, 6, 7, 8, 9, 10]

const jpSizes = [0, 1, 2, 3, 4, 5]
const euSizes = [44, 46, 48, 50, 52, 54]

export const US_LETTER_SIZES = ["XS", "S", "M", "L", "XL", "XXL"]
export const MANUFACTURER_SIZE_TYPES: ManufacturerSizeType[] = ["EU", "JP", "US", "WxL", "Letter"]

export const wxlBottomSizes = () => {
  return usWaistSizes.flatMap(waistSize => {
    return [...usShortLengthSizes, ...usPantLengthSizes].flatMap(lengthSize => {
      return `${waistSize}x${lengthSize}`
    })
  })
}

export const getInternalSizes = (productType): string[] => {
  switch (productType) {
    case "Top":
      return US_LETTER_SIZES
    case "Bottom":
      return wxlBottomSizes()
    default:
      return []
  }
}

export const getManufacturerSizes = (sizeType: ManufacturerSizeType | null): string[] => {
  switch (sizeType) {
    case "EU":
      return euSizes.map(x => x.toString())
    case "JP":
      return jpSizes.map(x => x.toString())
    case "US":
      return usWaistSizes.map(x => x.toString())
    case "WxL":
      return wxlBottomSizes()
    case "Letter":
      return US_LETTER_SIZES
    default:
      return []
  }
}
