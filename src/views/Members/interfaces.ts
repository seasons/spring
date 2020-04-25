import { History } from "history"

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
    user: user
    reservations: Array<any>
    reservationsIds: Array<string>
  }
}

export interface MemberViewIfc {
  history: any
  match: any
  props?: any
}

export interface HeaderProps extends MemberSubViewIfc {
  history: History
}
