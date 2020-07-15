import React, { ReactNode } from "react"
import { TextField as MuiTextField, TextFieldProps as MuiTextFieldProps, styled } from "@material-ui/core"
import { Field, ChildFieldProps } from "./Field"

import { FormControl } from "components/FormControl"

export type TextFieldProps = ChildFieldProps &
  MuiTextFieldProps & {
    disabled?: boolean
    helperText?: ReactNode
    label?: ReactNode
    multiline?: boolean
    placeholder?: string
    rows?: number
    type?: string
    autoFocus?: boolean
    asterisk?: boolean
  }

export const TextField: React.FC<TextFieldProps> = ({
  disabled = false,
  helperText,
  initialValue,
  label = "",
  multiline = false,
  name,
  placeholder,
  rows = 5,
  type,
  asterisk = false,
  ...rest
}) => {
  return (
    <Field
      name={name}
      initialValue={initialValue}
      render={({ input, meta }) => (
        <FormControl error={meta.touched && meta.error}>
          <StyledTextField
            disabled={disabled}
            fullWidth
            multiline={multiline}
            rows={multiline ? rows : 0}
            name={input.name}
            placeholder={placeholder}
            value={input.value}
            variant="outlined"
            onChange={input.onChange}
            type={type}
            helperText={helperText}
            label={`${label}${asterisk ? " *" : ""}`}
            {...rest}
          />
        </FormControl>
      )}
      {...rest}
    />
  )
}

const StyledTextField = styled(MuiTextField)({
  borderRadius: 4,
})
