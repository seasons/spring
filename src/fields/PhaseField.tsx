import React from "react"
import get from "lodash/get"
import { ReservationPhase } from "generated/globalTypes"

interface PhaseFieldProps {
  record?: any
  source: string
}

export const PhaseField: React.FC<PhaseFieldProps> = ({ source, record }) => {
  const phase: ReservationPhase = get(record, source)

  const text = phase === "BusinessToCustomer" ? "Outgoing" : "Incoming"
  return <div>{text}</div>
}
