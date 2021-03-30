import { TextField } from "@material-ui/core"
import React, { useState } from "react"
import { Field, ChildFieldProps } from "./Field"
import Autocomplete, { createFilterOptions } from "@material-ui/lab/Autocomplete"

import { FormControl } from "../components/FormControl"

const filter = createFilterOptions<string>()

export type AutocompleteFieldProps = ChildFieldProps & {
  options: (string | { label: string; group?: string })[]
  label?: string
  multiple?: boolean
  onInputChange?: (event: any) => void
  getOptionSelected?: (option, value) => boolean
}

export const AutocompleteField: React.FC<AutocompleteFieldProps> = ({
  label,
  name,
  options,
  multiple = true,
  onInputChange,
  getOptionSelected = (option, value) => option === value,
}) => {
  const [value, setValue] = useState("")

  return (
    <Field
      multiple
      name={name}
      render={({ input, meta }) => {
        return (
          <FormControl error={meta.touched && meta.error}>
            <Autocomplete
              multiple={multiple}
              onChange={(event: any, value) => {
                input.onChange({ target: { name, value } })
              }}
              getOptionLabel={option => {
                if (typeof option === "string") {
                  return option
                }
                if (!!option.label) {
                  return option.label
                }
                return ""
              }}
              getOptionSelected={getOptionSelected}
              groupBy={option => option.group}
              value={input.value || []}
              options={options}
              renderInput={params => (
                <TextField
                  label={label || ""}
                  {...params}
                  variant="outlined"
                  value={value}
                  onChange={event => {
                    setValue(event.target.value)
                    onInputChange?.(event)
                  }}
                />
              )}
              filterOptions={(options, params) => {
                const filtered: string[] = filter(options, params)
                if (params.inputValue) {
                  filtered.push(params.inputValue)
                }
                return filtered
              }}
            />
          </FormControl>
        )
      }}
    />
  )
}
