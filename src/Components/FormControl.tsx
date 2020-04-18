import { FormControl as MuiFormControl, FormHelperText, MenuItem, Select, styled } from "@material-ui/core"
import React from "react"

export interface FormSelectProps {
  children?: any
  error: string
}

export const FormControl: React.FC<FormSelectProps> = ({ children, error }) => {
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
