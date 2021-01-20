import { ListSubheader, MenuItem, Select } from "@material-ui/core"
import React from "react"
import { Field, ChildFieldProps } from "./Field"

import { FormControl } from "../components/FormControl"

export type SelectChoice = {
  disabled?: boolean
  display: any
  value: any
}

export type SelectFieldProps = ChildFieldProps & {
  choices?: SelectChoice[]
  disabled?: boolean
  groupedChoices?: { name: string; children: SelectChoice[] }[]
  name: string
  onChange?: (event: any) => void
  defaultValue?: string
}

export const SelectField: React.FC<SelectFieldProps> = ({
  choices,
  disabled,
  groupedChoices,
  multiple = false,
  name,
  onChange,
  ...rest
}) => {
  return (
    <Field
      multiple={multiple}
      name={name}
      render={({ input, meta }) => (
        <FormControl error={meta.touched && meta.error}>
          <Select
            id={input.name}
            defaultValue=""
            disabled={disabled}
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
            {choices &&
              choices.map(({ disabled, display, value }, index) => (
                <MenuItem key={index} value={value} disabled={disabled}>
                  {display}
                </MenuItem>
              ))}
            {groupedChoices &&
              groupedChoices.map(({ name, children }) => [
                <ListSubheader disableSticky>{name}</ListSubheader>,
                children.map(({ display, value }, index) => (
                  <MenuItem key={index} value={value}>
                    {display}
                  </MenuItem>
                )),
              ])}
          </Select>
        </FormControl>
      )}
      {...rest}
    />
  )
}
