import { MenuItem, Select } from "@material-ui/core"
import React from "react"
import { Field } from "react-final-form"

import { FormControl } from "../components/FormControl"

export interface SelectFieldProps {
  choices: { display: any; value: any }[]
  multiple?: boolean
  name: string
  onChange?: (event: any) => void
}

export const SelectField: React.FC<SelectFieldProps> = ({ choices, multiple = false, name, onChange, ...rest }) => {
  return (
    <Field
      multiple={multiple}
      name={name}
      render={({ input, meta }) => (
        <FormControl error={meta.error}>
          <Select
            multiple={multiple}
            name={input.name}
            value={multiple ? input.value || [] : input.value}
            variant="outlined"
            onChange={event => {
              if (onChange) {
                onChange(event)
              }
              input.onChange(event)
            }}
          >
            {choices.map(({ display, value }, index) => (
              <MenuItem key={index} value={value}>
                {display}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
      {...rest}
    />
  )
}
