import React from "react"
import { DateTime } from "luxon"
import get from "lodash/get"
import { Typography, Tooltip } from "@material-ui/core"

type DateFieldProps = {
  label?: string
  record?: object
  source: string
}

export const SinceDateField: React.FC<DateFieldProps> = ({ label, record, source }) => {
  const value = get(record, source)
  const date = DateTime.fromISO(value)
  const formattedDate = date.toUTC().toRelativeCalendar()
  return (
    <Tooltip title={date.toLocaleString(DateTime.DATETIME_MED)} aria-label="add" style={{ fontSize: 13 }}>
      <Typography component="span" variant="body2">
        {formattedDate}
      </Typography>
    </Tooltip>
  )
}
