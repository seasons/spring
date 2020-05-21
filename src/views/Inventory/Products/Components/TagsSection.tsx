import React from "react"

import { Grid } from "@material-ui/core"

import { Spacer, Text } from "components"
import productFunctionsJSON from "data/productFunctions.json"
import { ExpandableSection } from "./ExpandableSection"
import { AutocompleteField } from "fields"

export interface TagsSectionProps {
  materials: string[]
  tags: string[]
}

export const TagsSection: React.FC<TagsSectionProps> = ({ materials, tags }) => {
  const { functions } = productFunctionsJSON
  return (
    <ExpandableSection
      title="Tags"
      content={
        <>
          <Grid item xs={12}>
            <Text variant="h6">Functions</Text>
            <Spacer mt={1} />
            <AutocompleteField name="functions" options={functions} requiredStringArray />
          </Grid>
          <Spacer mt={3} />
          <Grid item xs={12}>
            <Text variant="h6">Outer materials</Text>
            <Spacer mt={1} />
            <AutocompleteField name="outerMaterials" options={materials} requiredStringArray />
          </Grid>
          <Spacer mt={3} />
          <Grid item xs={12}>
            <Text variant="h6">Inner materials</Text>
            <Spacer mt={1} />
            <AutocompleteField name="innerMaterials" options={materials} requiredStringArray />
          </Grid>
          <Spacer mt={3} />
          <Grid item xs={12}>
            <Text variant="h6">Tags</Text>
            <Spacer mt={1} />
            <AutocompleteField name="tags" options={tags} requiredStringArray />
          </Grid>
        </>
      }
    />
  )
}
