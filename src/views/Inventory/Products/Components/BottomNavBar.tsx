import React from "react"
import { Box, Button, TextField, styled } from "@material-ui/core"

import { Separator, Spacer } from "components"

export interface BottomNavBarProps {
  onCancel: () => void
  onNext: () => void
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  onCancel,
  onNext
}) => {
  return (
    <StyledBox>
      <Separator />
      <Box justifyContent="center" alignItems="center">
        <Button onClick={onCancel}>Cancel</Button>
        <Button onClick={onNext}>Next</Button>
      </Box>
    </StyledBox>
  )
}

const StyledBox = styled(Box)({
  position: "fixed",
  bottom: 0,
  left: 0,
  width: "100%",
  height: 72,
  backgroundColor: "white",
})