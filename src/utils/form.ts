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
