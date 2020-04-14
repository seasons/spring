import React from "react"
import { Box, Button, TextField, styled } from "@material-ui/core"

import { Separator, Spacer } from "components"

export interface BottomNavBarProps {
  onCancel: () => void
  onNext: () => void
}

const BUTTON_HEIGHT = 40
const BUTTON_WIDTH = 148

export const BottomNavBar: React.FC<BottomNavBarProps> = ({ onCancel, onNext }) => {
  return (
    <StyledBox>
      <Separator />
      <FlexBox px={2} display="flex" justifyContent="space-between" alignItems="center">
        <CancelButton onClick={onCancel}>Cancel</CancelButton>
        <NextButton onClick={onNext}>Next</NextButton>
      </FlexBox>
    </StyledBox>
  )
}

const StyledBox = styled(Box)({
  position: "fixed",
  bottom: 0,
  left: 256,
  right: 0,
  height: 72,
  backgroundColor: "white",
})

const FlexBox = styled(Box)({
  height: "100%",
  width: "auto",
})

const CancelButton = styled(Button)({
  backgroundColor: "white",
  border: "1px solid #dddddd",
  borderRadius: 4,
  height: BUTTON_HEIGHT,
  width: BUTTON_WIDTH,
})

const NextButton = styled(Button)({
  backgroundColor: "black",
  borderRadius: 4,
  color: "white",
  height: BUTTON_HEIGHT,
  width: BUTTON_WIDTH,
})
