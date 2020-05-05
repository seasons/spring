import React from "react"
import { Indicator } from "components/Indicator"
import { Spacer } from "components"

export interface StatusFieldProps {
  record?: { status: String }
  label?: string
}

// NOTE: label isn't used but needs to be listed as a parameter in order to
// properly display label for column.
export const StatusField: React.FC<StatusFieldProps> = ({ record, label }) => {
  const status = record?.status

  return (
    <div>
      <Indicator status={status} />
      <Spacer mr={1} /> {status}
    </div>
  )
}
