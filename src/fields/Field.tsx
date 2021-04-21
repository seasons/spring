import React from "react"
import * as yup from "yup"
import { validate } from "utils/form"
import { Field as FinalFormField, FieldRenderProps } from "react-final-form"

export interface ChildFieldProps {
  name: string
  initialValue?: string | number
  multiple?: boolean

  required?: boolean

  requiredStringArray?: boolean
  requiredString?: boolean
  maxLength?: number
  minLength?: number

  requiredNumberArray?: boolean
  requiredNumber?: boolean
  optionalNumber?: boolean
  maxValue?: number
  minValue?: number

  requiredDate?: boolean
  optionalDate?: boolean

  optionalURL?: boolean
}

export interface FieldProps extends ChildFieldProps {
  render: ({ input, meta }: FieldRenderProps<any>) => React.ReactElement
}

export const Field: React.FC<FieldProps> = ({
  name,
  initialValue,
  render,
  required,
  requiredStringArray,
  requiredString,
  maxLength,
  minLength,
  requiredNumberArray,
  requiredNumber,
  optionalNumber,
  maxValue,
  minValue,
  requiredDate,
  optionalDate,
  optionalURL,
  ...rest
}) => {
  // Builds a yup schema for the specific field and validates it accordingly
  const validateField = async value => {
    let schema
    if (required) {
      schema = yup.mixed().required("Required")
    }
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
    if (optionalNumber) {
      schema = yup.number()
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
    if (optionalDate) {
      schema = yup.date()
    }
    if (optionalURL) {
      schema = yup.string().url()
    }
    if (schema) {
      return await validate(schema, value)
    }
  }
  return (
    <FinalFormField
      validateFields={[]} // ONLY validate *this* field when this field's value changes
      name={name}
      initialValue={initialValue}
      validate={validateField}
      render={render}
      {...rest}
    />
  )
}
