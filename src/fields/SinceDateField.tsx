import React from "react"
import { DateTime } from "luxon"
import get from "lodash/get"
import { Box, Typography, Tooltip } from "@material-ui/core"

type DateFieldProps = {
  label?: string
  record?: object
  source: string
  since?: boolean
}

export const SinceDateField: React.FC<DateFieldProps> = ({ label, record, source, since = false }) => {
  const value = get(record, source)
  const date = DateTime.fromISO(value)

  if (!value) {
    return <></>
  }

  const formattedDate = since ? (
    <Typography component="span" variant="body2">
      {date.toUTC().toRelativeCalendar()}
    </Typography>
  ) : (
    <Box>
      <Box>
        <Typography component="span" variant="body2">
          {date.toLocaleString(DateTime.DATE_MED)}
        </Typography>
      </Box>
      <Box>
        <Typography component="span" variant="body2">
          {date.toLocaleString(DateTime.TIME_SIMPLE)}
        </Typography>
      </Box>
    </Box>
  )

  const tooltipDate = since ? date.toLocaleString(DateTime.DATETIME_MED) : date.toUTC().toRelativeCalendar()
  return (
    <Tooltip title={tooltipDate!} aria-label="add" style={{ fontSize: 13 }}>
      {formattedDate}
    </Tooltip>
  )
}
