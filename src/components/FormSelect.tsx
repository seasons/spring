import { MenuItem, Select, styled } from "@material-ui/core"
import React from "react"
import { Field } from "react-final-form"

export interface FormSelectProps {
  choices: { display: string, value: any }[]
  multiple?: boolean
  name: string
}

export const FormSelect: React.FC<FormSelectProps> = ({
  choices,
  multiple = false,
  name,
  ...rest
}) => {
  return (
    <Field
      multiple={multiple}
      name={name}
      render={({ input }) => (
        <FullWidthSelect
          multiple={multiple}
          name={input.name}
          value={input.value || []}
          variant="outlined"
          onChange={input.onChange}
        >
          {choices.map(({ display, value }) => (
            <MenuItem value={value}>{display}</MenuItem>
          ))}
        </FullWidthSelect>
      )}
      {...rest}
    />
  )
}

const FullWidthSelect = styled(Select)({
  width: "100%"
})
