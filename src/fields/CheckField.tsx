import React from "react"
import CheckIcon from "@material-ui/icons/Check"
import CloseIcon from "@material-ui/icons/Close"
import { Box } from "@material-ui/core"
import { colors } from "theme"
import { get } from "lodash"

export const CheckField = ({ record = {}, source, value, label = "", nullIf = (record, source, value) => false }) => {
  if (nullIf(record, source, value)) {
    return null
  }

  return (
    <Box display="flex" alignItems="center" m="0 auto">
      {value === get(record, source) ? (
        <CheckIcon style={{ color: colors.green[500] }} />
      ) : (
        <CloseIcon style={{ color: colors.red[500] }} />
      )}
    </Box>
  )
}
