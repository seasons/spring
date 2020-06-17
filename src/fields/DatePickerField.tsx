import React from "react"
import { KeyboardDatePicker, DatePickerView } from "@material-ui/pickers"
import { Field, ChildFieldProps } from "./Field"

import { FormControl } from "components/FormControl"

export type DatePickerField = ChildFieldProps & {
  disabled?: boolean
  format?: string
  views?: DatePickerView[]
}

export const DatePickerField: React.FC<DatePickerField> = ({
  disabled = false,
  format = "MM/dd/yyyy",
  name,
  views,
  initialValue,
  ...rest
}) => {
  return (
    <Field
      name={name}
      initialValue={initialValue}
      render={({ input, meta }) => (
        <FormControl error={meta.error}>
          <KeyboardDatePicker
            autoOk
            variant="inline"
            views={views}
            inputVariant="outlined"
            format={format}
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
