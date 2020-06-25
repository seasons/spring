import gql from "graphql-tag"

export const BarcodeProducts = gql`
  query BarcodeProducts {
    physicalProducts(where: { barcoded: false }) {
      id
      seasonsUID
      sequenceNumber
      barcoded
      barcode
    }
  }
`
