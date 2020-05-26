import React from "react"
import CheckIcon from "@material-ui/icons/Check"
import { Box } from "@material-ui/core"
import { colors } from "theme"

export const CheckField = ({ record = {}, source, value, label }) => {
  if (value === record[source]) {
    return (
      <Box display="flex" alignItems="center" m="0 auto">
        <CheckIcon style={{ color: colors.green[500] }} />
      </Box>
    )
  }
  return <></>
}
