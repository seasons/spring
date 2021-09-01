import gql from "graphql-tag"

import Brand from "./Brand"
import Product from "./Product"
import Reservation from "./Reservation"
import User from "./User"
import Customer from "./Customer"
import Package from "./Package"
import Collection from "./Collection"
import PhysicalProduct from "./PhysicalProduct"
import Size from "./Size"
import PushNotificationReceipt from "./PushNotificationReceipt"
import FitPic from "./FitPic"
import Order from "./Order"
import Launch from "./Launch"
import Category from "./Category"

export default {
  Product,
  Brand,
  Category,
  Launch,
  Collection,
  Reservation,
  User,
  Customer,
  Package,
  PhysicalProduct,
  Size,
  PushNotificationReceipt,
  FitPic,
  Order,
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
