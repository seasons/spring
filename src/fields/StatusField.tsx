import React from "react"
import { Box } from "@material-ui/core"
import { Indicator } from "components/Indicator"
import { startCase } from "lodash"

export interface StatusFieldProps {
  record?: { status: string }
  label?: string
}

export const StatusField: React.FC<StatusFieldProps> = ({ record, label }) => {
  const status = record?.status

  return (
    <div>
      <Indicator status={status} />
      <Box ml={1} style={{ display: "inline-block" }}>
        {startCase(status)}
      </Box>
    </div>
  )
}
