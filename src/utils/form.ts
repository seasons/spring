import { setIn } from "final-form"

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

// To be passed to React Final Form
export const validate = async (validationSchema, values) => {
  try {
    await validationSchema.validate(values, { abortEarly: false })
  } catch (err) {
    const errors = err.inner.reduce((formError, innerError) => {
      return setIn(formError, innerError.path, innerError.message)
    }, {})

    return errors
  }
}
