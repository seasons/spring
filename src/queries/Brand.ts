import { GET_LIST } from "@seasons/react-admin"
import gql from "graphql-tag"

export default {
  [GET_LIST]: gql`
    fragment brand on Brand {
      id
      name
      tier
      brandCode
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
      logo {
        id
        url
      }
      designer
      basedIn
      images {
        id
        url
      }
      externalShopifyIntegration {
        enabled
        shopName
      }
      tier
      websiteUrl
    }
  }
`
