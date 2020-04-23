import React from "react"

import { Grid } from "@material-ui/core"

import { Spacer, Text } from "components"
import { ExpandableSection } from "./ExpandableSection"
import { AutocompleteField } from "fields"

export interface TagsSectionProps {
  functions: string[]
  materials: string[]
  tags: string[]
}

export const TagsSection: React.FC<TagsSectionProps> = ({ functions, materials, tags }) => {
  return (
    <ExpandableSection
      title="Tags"
      content={
        <>
          <Grid item xs={12}>
            <Text variant="h6">Functions</Text>
            <Spacer mt={1} />
            <AutocompleteField name="functions" options={functions} />
          </Grid>
          <Spacer mt={3} />
          <Grid item xs={12}>
            <Text variant="h6">Outer materials</Text>
            <Spacer mt={1} />
            <AutocompleteField name="outerMaterials" options={materials} />
          </Grid>
          <Spacer mt={3} />
          <Grid item xs={12}>
            <Text variant="h6">Inner materials</Text>
            <Spacer mt={1} />
            <AutocompleteField name="innerMaterials" options={materials} />
          </Grid>
          <Spacer mt={3} />
          <Grid item xs={12}>
            <Text variant="h6">Tags</Text>
            <Spacer mt={1} />
            <AutocompleteField name="tags" options={tags} />
          </Grid>
        </>
      }
    />
  )
}
