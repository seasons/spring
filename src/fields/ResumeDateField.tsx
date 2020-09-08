import React from "react"
import { Box } from "@material-ui/core"
import { DateTime } from "luxon"
import { customer_membership } from "generated/customer"

interface Props {
  record?: { membership: customer_membership }
  label?: string
}

export const ResumeDateField: React.FC<Props> = ({ record, label }) => {
  const date = record?.membership?.pauseRequests?.[0]?.resumeDate
  return <div>{!!date && <Box>{DateTime.fromISO(date).toLocaleString(DateTime.DATE_MED)}</Box>}</div>
}
