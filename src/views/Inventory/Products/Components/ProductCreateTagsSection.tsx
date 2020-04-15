import React from "react"

import { Grid } from "@material-ui/core"

import { FormAutocomplete, Separator, Spacer, Text } from "components"

export interface ProductCreateTagsSectionProps {
  functions: string[]
  materials: string[]
  tags: string[]
}

export const ProductCreateTagsSection: React.FC<ProductCreateTagsSectionProps> = ({ functions, materials, tags }) => {
  return (
    <>
      <Text variant="h4">Tags</Text>
      <Spacer mt={2} />
      <Separator />
      <Spacer mt={3} />
      <Grid item xs={12}>
        <Text variant="h6">Functions</Text>
        <Spacer mt={1} />
        <FormAutocomplete name="functions" options={functions} />
      </Grid>
      <Spacer mt={3} />
      <Grid item xs={12}>
        <Text variant="h6">Outer materials</Text>
        <Spacer mt={1} />
        <FormAutocomplete name="outerMaterials" options={materials} />
      </Grid>
      <Spacer mt={3} />
      <Grid item xs={12}>
        <Text variant="h6">Inner materials</Text>
        <Spacer mt={1} />
        <FormAutocomplete name="innerMaterials" options={materials} />
      </Grid>
      <Spacer mt={3} />
      <Grid item xs={12}>
        <Text variant="h6">Tags</Text>
        <Spacer mt={1} />
        <FormAutocomplete name="tags" options={tags} />
      </Grid>
    </>
  )
}