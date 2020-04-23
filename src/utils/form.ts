/**
 * Extract enum values from a query to monsoon fetching all cases of an enum
 */
export const getEnumValues = obj => obj.enumValues.map(enumValue => enumValue.name)

/**
 * Return a formatted veresion [choices] to pass into the <FormSelect /> component
 */
export const getFormSelectChoices = (choices: string[]) =>
  choices.map(choice => ({
    display: choice,
    value: choice,
  }))

/**
 * Returns any errors to React Final Form using Yup
 */
export const validate = async (validationSchema, values) => {
  try {
    await validationSchema.validate(values, { abortEarly: false })
  } catch (err) {
    console.log("ERR", err)
    return err?.errors?.[0]
  }
}
