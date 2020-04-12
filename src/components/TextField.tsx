import React from "react"
import { TextField as MuiTextField, styled } from "@material-ui/core"

export interface TextFieldProps {
  placeholder?: string
  value?: string
  onChange: (string) => void
}

export const TextField: React.FC<TextFieldProps> = ({
  onChange,
  placeholder,
  value,
}) => {

  return (
    <StyledMuiTextField
      fullWidth
      placeholder={placeholder}
      value={value}
      variant="outlined"
      onChange={(event) => onChange(event.target.value)}
    />
  )
}

const StyledMuiTextField = styled(MuiTextField)({
  borderRadius: 4,
})