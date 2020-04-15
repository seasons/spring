import React from "react"
import { TextField, styled } from "@material-ui/core"
import { Field } from "react-final-form"

export interface FormTextFieldProps {
  multiline?: boolean
  name: string
  placeholder?: string
  rows?: number
}

export const FormTextField: React.FC<FormTextFieldProps> = ({
  multiline = false,
  name,
  placeholder,
  rows = 5,
  ...rest
}) => {
  return (
    <Field
      name={name}
      render={({ input }) => (
        <StyledTextField
          fullWidth
          multiline={multiline}
          rows={multiline ? rows : 0}
          name={input.name}
          placeholder={placeholder}
          value={input.value}
          variant="outlined"
          onChange={input.onChange}
        />
      )}
      {...rest}
    />
  )
}

const StyledTextField = styled(TextField)({
  borderRadius: 4,
})
