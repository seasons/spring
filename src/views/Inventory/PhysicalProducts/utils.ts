import { PHYSICAL_PRODUCT_BARCODE_REGEX } from "views/constants"

export const barcodeToSequenceNumber = (barcode: string) => {
  if (!barcode.match(PHYSICAL_PRODUCT_BARCODE_REGEX)) {
    return null
  }
  const rawSequenceNumber = barcode.replace("SZNS", "")
  for (let i = 0; i <= rawSequenceNumber.length; i++) {
    if (parseInt(rawSequenceNumber[i]) > 0) {
      return parseInt(rawSequenceNumber.slice(i))
    }
  }
}
