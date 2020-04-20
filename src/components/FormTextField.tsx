import React from "react"
import { TextField, TextFieldProps, styled } from "@material-ui/core"
import { Field } from "react-final-form"

import { FormControl } from "./FormControl"

export type FormTextFieldProps = TextFieldProps & {
  disabled?: boolean
  multiline?: boolean
  name: string
  placeholder?: string
  rows?: number
  value?: string
}

export const FormTextField: React.FC<FormTextFieldProps> = ({
  disabled = false,
  multiline = false,
  label,
  name,
  placeholder,
  helperText,
  rows = 5,
  type,
  value,
  ...rest
}) => {
  return (
    <Field
      name={name}
      render={({ input, meta }) => (
        <FormControl error={meta.error}>
          <StyledTextField
            disabled={disabled}
            fullWidth
            multiline={multiline}
            rows={multiline ? rows : 0}
            name={input.name}
            placeholder={placeholder}
            value={value || input.value}
            variant="outlined"
            onChange={input.onChange}
            type={type}
            helperText={helperText}
            label={label}
          />
        </FormControl>
      )}
      {...rest}
    />
  )
}

const StyledFormControl = styled(FormControl)({
  width: "100%",
})

const StyledTextField = styled(TextField)({
  borderRadius: 4,
})
