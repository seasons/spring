import React from "react"
import { Grid, Box } from "@material-ui/core"
import { DatePickerField, SelectField, TextField } from "fields"
import { Spacer, Text, ImageUpload, Header } from "components"
import { useLocation } from "react-router-dom"

export const BrandFields: React.FC<{ headerTitle: string }> = ({ headerTitle }) => {
  const location = useLocation()

  const brandTierChoices = [
    "Tier0",
    "Tier1",
    "Tier2",
    "Niche",
    "Upcoming",
    "Retro",
    "Boutique",
    "Local",
    "Discovery",
  ].map(choice => ({ display: choice, value: choice }))

  return (
    <Box my={1}>
      <Header
        title={headerTitle}
        subtitle="Please fill out all required fields"
        breadcrumbs={[
          {
            title: "Brands",
            url: "/inventory/brands",
          },
          {
            title: headerTitle,
            url: location.pathname,
          },
        ]}
      />
      <Grid container spacing={5}>
        <Grid item xs={4}>
          <ImageUpload numImages={4} />
        </Grid>
        <Grid item xs={8}>
          <Text variant="h6">Name*</Text>
          <Spacer mt={1} />
          <TextField name="name" placeholder="Enter a name" requiredString />
          <Spacer mt={3} />
          <Text variant="h6">Brand code*</Text>
          <Spacer mt={1} />
          <TextField name="brandCode" placeholder="Enter a brand code" requiredString />
          <Spacer mt={3} />
          <Text variant="h6">Brand tier*</Text>
          <Spacer mt={1} />
          <SelectField name="brandTier" choices={brandTierChoices} requiredString />
          <Spacer mt={3} />
          <Text variant="h6">Since</Text>
          <Spacer mt={1} />
          <DatePickerField name="sinceDate" format="yyyy" views={["year"]} optionalDate />
          <Spacer mt={3} />
          <Text variant="h6">Description</Text>
          <Spacer mt={1} />
          <TextField multiline name="description" placeholder="Enter a description" />
          <Spacer mt={3} />
          <Text variant="h6">Website URL</Text>
          <Spacer mt={1} />
          <TextField name="websiteURL" placeholder="Enter a url" optionalURL />
        </Grid>
      </Grid>
    </Box>
  )
}
