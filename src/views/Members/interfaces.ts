import { History } from "history"

interface billingInfo {
  id: string
  brand: string
  last_digits: string
  name: string
  street1: string
  city: string
  state: string
  postal_code: string
}

interface shippingAddress {
  id: string
  address1: string
  city: string
  state: string
  zipCode: string
}

interface user {
  id: string
  firstName: string
  email: string
  lastName: string
  createdAt: string
}

export interface MemberSubViewIfc {
  member: {
    id: string
    status: string
    plan: string
    user: user
    billingInfo: billingInfo
    reservations: Array<any>
    reservationsIds: Array<string>
    detail: {
      shippingAddress: shippingAddress
      phoneNumber: string
      birthday: string
    }
  }
}

export interface MemberViewIfc {
  history: History
  match: any
  props?: any
}

export interface MemberViewHeaderIfc extends MemberSubViewIfc {
  history: History
}
