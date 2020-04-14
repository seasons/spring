import React from "react"

import { Grid, TextField } from "@material-ui/core"
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';

import { FormAutocomplete, FormSelect, FormTextField, Separator, Spacer, Text } from "components"

const filter = createFilterOptions<string>()


export interface ProductCreateTagsSectionProps {
  functions: string[]
  materials: string[]
  tags: string[]
}

export const ProductCreateTagsSection: React.FC<ProductCreateTagsSectionProps> = ({
  functions,
  materials,
  tags,
}) => {
  const tagChoices = tags.map(tag => ({
    display: tag,
    value: tag,
  }))
  return (
    <>
      <Text variant="h4">Tags</Text>
      <Spacer mt={2} />
      <Separator />
      <Spacer mt={3} />
      <Grid item xs={12}>
        <Text variant="h6">Tags</Text>
        <Spacer mt={1} />
        <FormAutocomplete
          name="tags"
          options={tags}
        />
      </Grid>
    </>
  )
}
