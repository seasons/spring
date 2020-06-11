import React from "react"
import { KeyboardDatePicker } from "@material-ui/pickers"
import { Field, ChildFieldProps } from "./Field"

import { FormControl } from "components/FormControl"

export type DatePickerField = ChildFieldProps & {
  disabled?: boolean
}

export const DatePickerField: React.FC<DatePickerField> = ({ disabled = false, name, initialValue, ...rest }) => {
  return (
    <Field
      name={name}
      initialValue={initialValue}
      render={({ input, meta }) => (
        <FormControl error={meta.error}>
          <KeyboardDatePicker
            autoOk
            variant="inline"
            inputVariant="outlined"
            format="MM/dd/yyyy"
            disabled={disabled}
            name={input.name}
            label="Date"
            value={input.value}
            onChange={date => input.onChange(date?.toISOString())}
            InputAdornmentProps={{ position: "start" }}
          />
        </FormControl>
      )}
      {...rest}
    />
  )
}
