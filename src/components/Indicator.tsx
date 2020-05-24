import { colors } from "theme"
import styled from "styled-components"

const ReservationStatusMap = {
  New: colors.green[100],
  InQueue: colors.green[200],
  OnHold: colors.green[200],
  Packed: colors.orange[200],
  Shipped: colors.orange[500],
  InTransit: colors.blue[200],
  Received: colors.blue[500],
  Cancelled: colors.red[500],
  Completed: colors.black100,
}

export const IndicatorMap = {
  ...ReservationStatusMap,
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
