import { History } from "history"
import { customer } from "generated/customer"

interface EditEntity {
  id: object
}

interface MemberEntryValue {
  label: string
  type: string
  value: string
  error: boolean
  helperText: string
}

interface Invoice {
  id: string
  amount: number
  amountNormalized: string
}

// public interfaces
export interface NewMemberProps {
  firstName: MemberEntryValue
  email: MemberEntryValue
  lastName: MemberEntryValue
  phone: MemberEntryValue
  birthday: MemberEntryValue
}

export interface MemberSubViewProps {
  adminKey?: string
  member: customer
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

export interface EditModalProps {
  title: string
  editEntity: EditEntity
  open: boolean
  onClose: () => void
  onSave(values: {}): void
}

export interface RefundInvoiceModalProps {
  title: string
  invoice: Invoice
  open: boolean
  onClose: () => void
  onSave(values: {}): void
}

export interface ActionButtonProps {
  record?: { id: string; status: string }
  action: (record?: {}) => void
}
