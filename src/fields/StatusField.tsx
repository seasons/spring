import React, { useRef } from "react"
import { Box, Tooltip } from "@material-ui/core"
import { Indicator } from "components/Indicator"
import { startCase } from "lodash"
import Zoom from "@material-ui/core/Zoom"
import { withStyles } from "@material-ui/core/styles"
import { CustomerStatus } from "generated/globalTypes"

export interface StatusFieldProps {
  record?: { status: CustomerStatus; tooltipText?: string }
  label?: string
}

const DarkTooltip = withStyles(theme => ({
  tooltip: {
    // backgroundColor: theme.palette.primary.dark,
    // color: theme.palette.primary.contrastText,
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}))(Tooltip)

export const StatusField: React.FC<StatusFieldProps> = ({ record, label }) => {
  const ref = useRef(null)
  const status = record?.status

  return (
    <DarkTooltip title={record?.tooltipText || ""} placement="top-start" TransitionComponent={Zoom}>
      <div ref={ref}>
        <Indicator status={status} />
        <Box ml={1} style={{ display: "inline-block" }}>
          {startCase(status)}
        </Box>
      </div>
    </DarkTooltip>
  )
}
