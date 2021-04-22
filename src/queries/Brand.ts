import { GET_LIST } from "@seasons/react-admin"
import gql from "graphql-tag"

export default {
  [GET_LIST]: gql`
    fragment brand on Brand {
      id
      name
      tier
      brandCode
      published
      featured
      productsConnection {
        aggregate {
          count
        }
      }
      createdAt
      updatedAt
    }
  `,
}

export const BRAND_EDIT_QUERY = gql`
  query BrandEditQuery($input: BrandWhereUniqueInput!) {
    brand(where: $input) {
      id
      name
      description
      brandCode
      since
      published
      featured
      logoImage {
        id
        url
      }
      designer
      basedIn
      images {
        id
        url
      }
      productsConnection {
        aggregate {
          count
        }
      }
      shopifyShop {
        enabled
        shopName
      }
      tier
      websiteUrl
    }
  }
`
