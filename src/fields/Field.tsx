import React from "react"
import * as yup from "yup"
import { validate } from "utils/form"
import { TextField as MuiTextField, TextFieldProps as MuiTextFieldProps, styled } from "@material-ui/core"
import { Field as FinalFormField, FieldProps as FinalFormFieldProps } from "react-final-form"

import { FormControl } from "components/FormControl"

export interface ChildFieldProps {
  name: string
  initialValue?: string

  requiredString?: boolean
  maxLength?: number
  minLength?: number

  requiredNumber?: boolean
  maxValue?: number
  minValue?: number
}

export type FieldProps = ChildFieldProps & {
  render: ({ input, meta }) => any
}

export const Field: React.FC<FieldProps> = ({
  name,
  initialValue,
  render,
  requiredString,
  maxLength,
  minLength,
  requiredNumber,
  maxValue,
  minValue,
  ...rest
}) => {
  const validateField = async value => {
    let schema
    if (requiredString) {
      schema = yup.string().required("Required")
    }
    if (maxLength !== undefined) {
      schema = yup
        .string()
        .required("Required")
        .max(maxLength)
    }
    if (minLength !== undefined) {
      schema = yup
        .string()
        .required("Required")
        .min(minLength)
    }
    if (requiredNumber) {
      schema = yup.number().required("Required")
    }
    if (maxValue !== undefined) {
      schema = yup
        .number()
        .required("Required")
        .max(maxValue)
    }
    if (minValue !== undefined) {
      schema = yup
        .number()
        .required("Required")
        .min(minValue)
    }
    if (schema) {
      return await validate(schema, value)
    }
  }
  return <FinalFormField name={name} initialValue={initialValue} validate={validateField} render={render} {...rest} />
}
