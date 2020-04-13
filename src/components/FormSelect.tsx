import React from "react"
import { MenuItem, Select, styled } from "@material-ui/core"
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
        <StyledSelect
          multiple={multiple}
          name={input.name}
          value={input.value || []}
          variant="outlined"
          onChange={input.onChange}
        >
          {choices.map(({ display, value }) => (
            <MenuItem value={value}>{display}</MenuItem>
          ))}
        </StyledSelect>
      )}
      {...rest}
    />
  )
}

const StyledSelect = styled(Select)({
  width: "100%"
})
