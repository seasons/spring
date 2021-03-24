import React from "react"
import { Grid, Box } from "@material-ui/core"
import { DatePickerField, SelectField } from "fields"
import { Spacer, Text, Header } from "components"
import { useLocation } from "react-router-dom"
import { SelectChoice } from "fields/SelectField"

export const LaunchFields: React.FC<{ headerTitle: string; data: any }> = ({ headerTitle, data }) => {
  const location = useLocation()

  const collections = data?.collections
  const brands = data?.brands

  const trueOrFalseSelectFields: SelectChoice[] = [
    { display: "True", value: true },
    { display: "False", value: false },
  ]

  const collectionSelections: SelectChoice[] = collections?.map(c => {
    return {
      value: c.id,
      display: c.title,
    }
  })

  const brandsSelections: SelectChoice[] = brands?.map(b => {
    return {
      value: b.id,
      display: b.name,
    }
  })

  return (
    <Box my={1}>
      <Header
        title={headerTitle}
        subtitle="Please select a collection or brand and a launch date"
        breadcrumbs={[
          {
            title: "Launches",
            url: "/inventory/launches",
          },
          {
            title: headerTitle,
            url: location.pathname,
          },
        ]}
      />
      <Spacer mt={3} />
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Text variant="h6">Brand</Text>
              <Spacer mt={1} />
              <SelectField name="brandID" choices={brandsSelections} />
            </Grid>
            <Grid item xs={6}>
              <Text variant="h6">Collection</Text>
              <Spacer mt={1} />
              <SelectField name="collectionID" choices={collectionSelections} />
            </Grid>
            <Spacer mt={3} />
            <Grid item xs={6}>
              <Text variant="h6">Launch date</Text>
              <Spacer mt={1} />
              <DatePickerField name="launchAt" />
            </Grid>
            <Grid item xs={6}>
              <Text variant="h6">Published</Text>
              <Spacer mt={1} />
              <SelectField name="published" choices={trueOrFalseSelectFields} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}
