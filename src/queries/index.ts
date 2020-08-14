import { GET_LIST } from "@seasons/react-admin"
import gql from "graphql-tag"

import Brand from "./Brand"
import Product from "./Product"
import Reservation from "./Reservation"
import User from "./User"
import Customer from "./Customer"
import Package from "./Package"
import PhysicalProduct from "./PhysicalProduct"
import Size from "./Size"
import PushNotificationReceipt from "./PushNotificationReceipt"
import FitPic from "./FitPic"

export default {
  Product,
  Brand,
  Reservation,
  User,
  Customer,
  Package,
  PhysicalProduct,
  Size,
  PushNotificationReceipt,
  FitPic,
  Category: {
    [GET_LIST]: gql`
      fragment category on Category {
        id
        name
      }
    `,
  },
}

export const getAllBrands = gql`
  query getAllBrands {
    brands {
      id
      name
      slug
    }
  }
`

export const getAllColors = gql`
  query getAllColors {
    colors {
      id
      name
    }
  }
`
