import React from "react"
import { Box, Button, styled } from "@material-ui/core"

import { Separator } from "components"

export interface WizardBottomNavBarProps {
  isLastPage: boolean
  onPrevious: () => void
}

const BUTTON_HEIGHT = 40
const BUTTON_WIDTH = 148

export const WizardBottomNavBar: React.FC<WizardBottomNavBarProps> = ({ isLastPage, onPrevious }) => {
  return (
    <StyledBox>
      <Separator />
      <FlexBox px={2} display="flex" justifyContent="space-between" alignItems="center">
        <PreviousButton onClick={onPrevious}>Previous</PreviousButton>
        <SubmitButton type="submit">{isLastPage ? "Submit" : "Next"}</SubmitButton>
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

const PreviousButton = styled(Button)({
  backgroundColor: "white",
  border: "1px solid #dddddd",
  borderRadius: 4,
  height: BUTTON_HEIGHT,
  width: BUTTON_WIDTH,
})

const SubmitButton = styled(Button)({
  backgroundColor: "black",
  borderRadius: 4,
  color: "white",
  height: BUTTON_HEIGHT,
  width: BUTTON_WIDTH,
})
