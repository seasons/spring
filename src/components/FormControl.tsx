import { FormControl as MuiFormControl, FormHelperText, styled } from "@material-ui/core"
import React from "react"

export interface FormControlProps {
  children?: any
  error: string
}

export const FormControl: React.FC<FormControlProps> = ({ children, error }) => {
  return (
    <FullWidthControl error={!!error}>
      {children}
      {error && <FormHelperText>{error}</FormHelperText>}
    </FullWidthControl>
  )
}

const FullWidthControl = styled(MuiFormControl)({
  width: "100%",
})
