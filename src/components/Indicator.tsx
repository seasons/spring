import { colors } from "theme"
import styled from "styled-components"

const ReservationStatusMap = {
  Queued: colors.green[100],
  Picked: colors.purple[200],
  Packed: colors.orange[200],
  Shipped: colors.orange[500],
  Delivered: colors.blue[500],
  Cancelled: colors.red[500],
  Blocked: colors.red[500],
  Received: colors.blue[500],
  Completed: colors.black100,
}

const InvoiceStatusMap = {
  Paid: colors.green[500],
  Refunded: colors.orange[500],
}

const FitPicStatusMap = {
  Published: colors.green[500],
  Submitted: colors.grey[500],
  Unpublished: colors.grey[500],
  Reported: colors.red[500],
}

const iOSAppStatusMap = {
  UpToDate: colors.green[500],
  Outdated: colors.yellow[500],
  NoRecord: colors.grey[500],
}

export const IndicatorMap = {
  ...ReservationStatusMap,
  ...InvoiceStatusMap,
  ...FitPicStatusMap,
  ...iOSAppStatusMap,
  New: colors.green[100],
  Used: colors.green[200],
  Waitlisted: colors.black15,
  Invited: colors.black15,
  Authorized: colors.green[500],
  Active: colors.green[500],
  Created: colors.orange[500],
  Suspended: colors.orange[500],
  Paused: colors.orange[500],
  Deactivated: colors.red[500],
  Reserved: colors.blue[500],
  Reservable: colors.green[500],
  Drafted: colors.black15,
  Submitted: colors.blue[500],
  True: colors.green[500],
  False: colors.black15,
  Delinquent: colors.red[500],
  Paid: colors.green[100],
}

export interface IndicatorProps {
  status: string
}

export const Indicator = styled.div`
  background-color: ${(props: IndicatorProps) => IndicatorMap[props.status]};
  width: 8px;
  height: 8px;
  border-radius: 50%;
  display: inline-block;
`
