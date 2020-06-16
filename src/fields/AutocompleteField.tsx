import { TextField } from "@material-ui/core"
import React from "react"
import { Field, ChildFieldProps } from "./Field"
import Autocomplete, { createFilterOptions } from "@material-ui/lab/Autocomplete"

import { FormControl } from "../components/FormControl"

const filter = createFilterOptions<string>()

export type AutocompleteFieldProps = ChildFieldProps & {
  options: string[]
  label?: string
  multiple?: boolean
}

export const AutocompleteField: React.FC<AutocompleteFieldProps> = ({ label, name, options, multiple = true }) => {
  return (
    <Field
      multiple
      name={name}
      render={({ input, meta }) => {
        return (
          <FormControl error={meta.error}>
            <Autocomplete
              multiple={multiple}
              onChange={(event: any, value) => {
                input.onChange({ target: { name, value } })
              }}
              value={input.value || []}
              options={options}
              renderInput={params => <TextField label={label || ""} {...params} variant="outlined" />}
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
