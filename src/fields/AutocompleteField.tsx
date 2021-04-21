import { TextField } from "@material-ui/core"
import React, { useState } from "react"
import { Field, ChildFieldProps } from "./Field"
import Autocomplete, { createFilterOptions } from "@material-ui/lab/Autocomplete"

import { FormControl } from "../components/FormControl"

const filter = createFilterOptions<string>()

type OptionObject = { label: string; value?: string; group?: string }
type Option = OptionObject | string

export type AutocompleteFieldProps = ChildFieldProps & {
  options: Option[]
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
  const [value, setValue] = useState<Option>(options?.[0] || "")

  return (
    <Field
      multiple
      name={name}
      render={({ input, meta }) => {
        return (
          <FormControl error={meta.touched && meta.error}>
            <Autocomplete
              multiple={multiple}
              onChange={(event: any, value: any) => {
                console.log(value)
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
              groupBy={(option: Option) => (option as OptionObject)?.group || ""}
              value={input.value || (multiple ? [] : "")}
              options={options}
              renderInput={params => (
                <TextField
                  label={label || ""}
                  {...params}
                  variant="outlined"
                  value={value}
                  onChange={event => {
                    setValue(event.target.value)
                    // input.onChange(event)
                    onInputChange?.(event)
                  }}
                />
              )}
              filterOptions={(options, params) => {
                const filtered: string[] = filter((options || []) as string[], params)
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
