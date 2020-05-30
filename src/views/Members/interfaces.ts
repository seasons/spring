import { History } from "history"

interface billingInfo {
  id: string
  brand: string
  last_digits: string
  expiration_month: string
  expiration_year: string
  name: string
  street1: string
  city: string
  state: string
  postal_code: string
}

interface shippingAddress {
  id: string
  name: string
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

interface editEntity {
  id: object
}

interface memberEntryValue {
  label: string
  type: string
  value: string
  error: boolean
  helperText: string
}

export interface NewMemberProps {
  firstName: memberEntryValue
  email: memberEntryValue
  lastName: memberEntryValue
  phone: memberEntryValue
  birthday: memberEntryValue
}

export interface MemberProps {
  id: string
  status: string
  plan: string
  user: user
  billingInfo: billingInfo
  invoices: Array<any>
  invoicesIds: Array<string>
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

export interface MemberSubViewProps {
  adminKey?: string
  member: MemberProps

  match?: { params: { id: string } }
}

export interface MemberViewProps {
  history: History
  match: any
  props?: any
}

export interface CreateMemberProps {
  history: History
  open: boolean
  onClose: () => void
}

export interface MemberViewHeaderProps extends MemberSubViewProps {
  history: History
}

export interface EditModalProps {
  title: string
  editEntity: editEntity
  open: boolean
  onClose: () => void
  onSave(values: {}): void
}

export interface RefundInvoiceModalProps {
  title: string
  invoice: invoice
  open: boolean
  onClose: () => void
  onSave(values: {}): void
}

interface invoice {
  id: string
  amount: number
  amountNormalized: string
}
