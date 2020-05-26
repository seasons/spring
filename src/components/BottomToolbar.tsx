import React from "react"
import { Box, Toolbar, styled } from "@material-ui/core"

export const BottomToolbar = props => {
  return (
    <FixedContainer>
      <Toolbar>{props.childen}</Toolbar>
    </FixedContainer>
  )
}

const FixedContainer = styled(Box)({
  position: "fixed",
  bottom: 0,
  left: 256,
  right: 0,
  height: 72,
  backgroundColor: "white",
})
