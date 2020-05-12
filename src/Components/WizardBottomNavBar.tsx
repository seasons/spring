import React, { useState } from "react"
import { Box, Button, styled } from "@material-ui/core"

import { Loader, Separator } from "components"

export interface WizardBottomNavBarProps {
  isFirstPage: boolean
  isLastPage: boolean
  onPrevious: () => void
}

const BUTTON_HEIGHT = 40
const BUTTON_WIDTH = 148

export const WizardBottomNavBar: React.FC<WizardBottomNavBarProps> = ({ isFirstPage, isLastPage, onPrevious }) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const previousButtonVisiblity = isFirstPage ? "hidden" : "visible"
  const onSubmitBtnClick = () => {
    setIsSubmitting(isLastPage)
  }
  return (
    <StyledBox>
      <Separator />
      <FlexBox px={2} display="flex" justifyContent="space-between" alignItems="center">
        <PreviousButton onClick={onPrevious} style={{ visibility: previousButtonVisiblity }}>
          Previous
        </PreviousButton>
        <SubmitButton type="submit" onClick={onSubmitBtnClick}>
          {isSubmitting ? <Loader size={20} /> : isLastPage ? "Submit" : "Next"}
        </SubmitButton>
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
