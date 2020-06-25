import gql from "graphql-tag"

export const GET_WAREHOUSE_LOCATIONS = gql`
  query GetWarehouseLocations {
    warehouseLocations {
      id
      barcode
      locationCode
      itemCode
      type
    }
  }
`
