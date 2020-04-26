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
      height: string
      weight: string
      bodyType: string
      averageTopSize: string
      averageWaistSize: string
      averagePantLength: string
      preferredPronouns: string
      profession: string
      partyFrequency: string
      travelFrequency: string
      shoppingFrequency: string
      averageSpend: string
      style: string
      commuteStyle: string
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

export interface EditModalIfc extends MemberSubViewIfc {
  open: boolean
  onClose: () => void
}
