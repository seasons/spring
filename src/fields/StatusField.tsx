import React from "react"
import { Box } from "@material-ui/core"
import { Indicator } from "components/Indicator"

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
      <Box ml={1} style={{ display: "inline-block" }}>
        {status}
      </Box>
    </div>
  )
}
