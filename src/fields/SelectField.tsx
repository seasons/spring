import { ListSubheader, MenuItem, Select } from "@material-ui/core"
import React from "react"
import { Field, ChildFieldProps } from "./Field"

import { FormControl } from "../components/FormControl"

export type SelectChoice = {
  display: any
  value: any
}

export type SelectFieldProps = ChildFieldProps & {
  choices?: SelectChoice[]
  groupedChoices?: { name: string; children: SelectChoice[] }[]
  disabled?: boolean
  name: string
  onChange?: (event: any) => void
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
        <FormControl error={meta.error}>
          <Select
            id="grouped-select"
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
              choices.map(({ display, value }, index) => (
                <MenuItem key={index} value={value}>
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
