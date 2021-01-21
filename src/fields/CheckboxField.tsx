import React from "react"
import { Field, ChildFieldProps } from "./Field"
import { Checkbox, CheckboxProps } from "@material-ui/core"

export const CheckboxField: React.FC<Omit<ChildFieldProps, "initialValue"> &
  CheckboxProps & { initialValue?: boolean }> = ({ name, initialValue, ...rest }) => {
  return (
    <Field
      initialValue={(initialValue as any) as string}
      name={name}
      render={({ input: { value, onChange, name } }) => (
        <Checkbox
          {...rest}
          defaultChecked={initialValue}
          checked={value}
          onChange={onChange}
          color="primary"
          name={name}
        />
      )}
    />
  )
}
