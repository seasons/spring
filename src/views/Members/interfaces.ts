import { History } from "history"
import { customer } from "generated/customer"

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

interface invoice {
  id: string
  amount: number
  amountNormalized: string
}

// public interfaces
export interface NewMemberProps {
  firstName: memberEntryValue
  email: memberEntryValue
  lastName: memberEntryValue
  phone: memberEntryValue
  birthday: memberEntryValue
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

export interface ActionButtonProps {
  record?: { id: string; status: string; user?: { id: string } }
  actionHandler: (record?: {}) => void
}
