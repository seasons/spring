import { TextField } from "@material-ui/core"
import React from "react"
import { Field } from "react-final-form"
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';

const filter = createFilterOptions<string>()

export interface FormAutocompleteProps {
  name: string,
  options: string[]
}

export const FormAutocomplete: React.FC<FormAutocompleteProps> = ({
  name,
  options,
}) => {
  return (
    <Field
      multiple
      name={name}
      render={({ input }) => {
        console.log("INPUT:", input.value)
        return (
          <Autocomplete
            multiple
            onChange={(event: any) => {
              input.onChange({ target: { name, value: [...input.value, event.target.innerHTML] } })
            }}
            value={input.value || []}
            options={options}
            renderInput={(params) => <TextField {...params} variant="outlined" />}
            filterOptions={(options, params) => {
              const filtered: string[] = filter(options, params)
              if (params.inputValue) {
                filtered.push(params.inputValue);
              }
              return filtered;
            }}
          />
        )
      }} />
  )
}
