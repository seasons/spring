import React from "react"
import * as yup from "yup"
import { validate } from "utils/form"
import { Field as FinalFormField } from "react-final-form"

export interface ChildFieldProps {
  name: string
  initialValue?: string
  multiple?: boolean

  requiredStringArray?: boolean
  requiredString?: boolean
  maxLength?: number
  minLength?: number

  requiredNumberArray?: boolean
  requiredNumber?: boolean
  maxValue?: number
  minValue?: number

  requiredDate?: boolean
}

export type FieldProps = ChildFieldProps & {
  render: ({ input, meta }) => any
}

export const Field: React.FC<FieldProps> = ({
  name,
  initialValue,
  render,
  requiredStringArray,
  requiredString,
  maxLength,
  minLength,
  requiredNumberArray,
  requiredNumber,
  maxValue,
  minValue,
  requiredDate,
  ...rest
}) => {
  const validateField = async value => {
    let schema
    if (requiredStringArray) {
      schema = yup
        .array()
        .of(yup.string().required("Required"))
        .required("Required")
    }
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
    if (requiredNumberArray) {
      schema = yup
        .array()
        .of(yup.number().required("Required"))
        .required("Required")
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
    if (requiredDate) {
      schema = yup.date().required("Required")
    }
    if (schema) {
      return await validate(schema, value)
    }
  }
  return (
    <FinalFormField
      validateFields={[]}
      name={name}
      initialValue={initialValue}
      validate={validateField}
      render={render}
      {...rest}
    />
  )
}
