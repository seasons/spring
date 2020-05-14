import { TextField } from "@material-ui/core"
import React from "react"
import { Field, ChildFieldProps } from "./Field"
import Autocomplete, { createFilterOptions } from "@material-ui/lab/Autocomplete"

import { FormControl } from "../components/FormControl"

const filter = createFilterOptions<string>()

export type AutocompleteFieldProps = ChildFieldProps & {
  options: string[]
}

export const AutocompleteField: React.FC<AutocompleteFieldProps> = ({ name, options }) => {
  return (
    <Field
      multiple
      name={name}
      render={({ input, meta }) => {
        return (
          <FormControl error={meta.error}>
            <Autocomplete
              multiple
              onChange={(event: any, value) => {
                input.onChange({ target: { name, value } })
              }}
              value={input.value || []}
              options={options}
              renderInput={params => <TextField {...params} variant="outlined" />}
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
