import { colors } from "theme"
import styled from "styled-components"

export const IndicatorMap = {
  Waitlisted: colors.black15,
  Invited: colors.black15,
  New: colors.green[100],
  InQueue: colors.black15,
  OnHold: colors.black15,
  Authorized: colors.green[500],
  Received: colors.blue[500],
  Completed: colors.green[500],
  Active: colors.green[500],
  Packed: colors.orange[500],
  Shipped: colors.orange[500],
  Created: colors.orange[500],
  InTransit: colors.orange[500],
  Suspended: colors.orange[500],
  Paused: colors.orange[500],
  Deactivated: colors.red[500],
  Cancelled: colors.red[500],
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