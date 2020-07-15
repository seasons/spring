import { TextField } from "@material-ui/core"
import React from "react"
import { Field, ChildFieldProps } from "./Field"
import Autocomplete, { createFilterOptions } from "@material-ui/lab/Autocomplete"

import { FormControl } from "../components/FormControl"

const filter = createFilterOptions<string>()

export type GroupedAutocompleteFieldProps = ChildFieldProps & {
  groupedOptions: { key: string; value: string }[]
  label?: string
  multiple?: boolean
}

export const GroupedAutocompleteField: React.FC<GroupedAutocompleteFieldProps> = ({
  label,
  name,
  groupedOptions,
  multiple = true,
}) => {
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
              value={input.value || []}
              options={groupedOptions}
              groupBy={option => option.key}
              getOptionLabel={option => option.value || ""}
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
