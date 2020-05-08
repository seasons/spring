import React from "react"
import { DateTime } from "luxon"
import get from "lodash/get"
import { Typography } from "@material-ui/core"

type DateFieldProps = {
  label?: string
  record?: object
  source: string
}

export const SinceDateField: React.FC<DateFieldProps> = ({ label, record, source }) => {
  const value = get(record, source)
  const formattedDate = DateTime.fromISO(value)
    .toUTC()
    .toRelativeCalendar()
  return (
    <Typography component="span" variant="body2">
      {formattedDate}
    </Typography>
  )
}
