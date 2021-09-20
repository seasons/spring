import gql from "graphql-tag"
import { UpdatePhysicalProductFragment } from "./queries"

export const UPDATE_PHYSICAL_PRODUCT = gql`
  mutation UpdatePhysicalProduct($where: PhysicalProductWhereUniqueInput!, $data: PhysicalProductUpdateInput!) {
    updatePhysicalProduct(where: $where, data: $data) {
      ...UpdatePhysicalProduct
    }
  }
  ${UpdatePhysicalProductFragment}
`

export const STOW_ITEMS = gql`
  mutation StowItems($ids: [String], $warehouseLocationBarcode: String!) {
    stowItems(ids: $ids, warehouseLocationBarcode: $warehouseLocationBarcode)
  }
`

export const UPDATE_PHYSICAL_PRODUCTS = gql`
  mutation UpdateManyPhysicalProducts($where: PhysicalProductWhereInput) {
    updateManyPhysicalProducts(where: $where, data: { barcoded: true }) {
      count
    }
  }
`
