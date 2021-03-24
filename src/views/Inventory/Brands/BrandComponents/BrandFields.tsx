import React from "react"
import { Grid, Box } from "@material-ui/core"
import { DatePickerField, SelectField, TextField, CheckboxField } from "fields"
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

  const trueOrFalseSelectFields = [
    { display: "True", value: true },
    { display: "False", value: false },
  ]

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
          <ImageUpload numImages={1} title="Logo" height={200} name="logo" />
          <Spacer mt={1} />
          <ImageUpload numImages={4} />
        </Grid>
        <Grid item xs={8}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Text variant="h6">Name*</Text>
              <Spacer mt={1} />
              <TextField name="name" placeholder="Enter a name" requiredString />
            </Grid>
            <Grid item xs={6}>
              <Text variant="h6">Brand code*</Text>
              <Spacer mt={1} />
              <TextField name="brandCode" placeholder="Enter a brand code" requiredString />
            </Grid>

            <Spacer mt={3} />

            <Grid item xs={6}>
              <Text variant="h6">Brand tier*</Text>
              <Spacer mt={1} />
              <SelectField name="brandTier" choices={brandTierChoices} requiredString />
            </Grid>
            <Grid item xs={6}>
              <Text variant="h6">Website URL</Text>
              <Spacer mt={1} />
              <TextField name="websiteURL" placeholder="Enter a url" optionalURL />
            </Grid>

            <Spacer mt={3} />

            <Grid item xs={6}>
              <Text variant="h6">Published</Text>
              <Spacer mt={1} />
              <SelectField name="published" choices={trueOrFalseSelectFields} />
            </Grid>
            <Grid item xs={6}>
              <Text variant="h6">Featured</Text>
              <Spacer mt={1} />
              <SelectField name="featured" choices={trueOrFalseSelectFields} />
            </Grid>

            <Spacer mt={3} />

            <Grid item xs={12}>
              <Text variant="h6">Description</Text>
              <Spacer mt={1} />
              <TextField multiline name="description" placeholder="Enter a description" />
            </Grid>

            <Spacer mt={3} />

            <Grid item xs={6}>
              <Text variant="h6">Since</Text>
              <Spacer mt={1} />
              <DatePickerField name="sinceDate" format="yyyy" views={["year"]} optionalDate />
            </Grid>
            <Grid item xs={6}>
              <Text variant="h6">Designer</Text>
              <Spacer mt={1} />
              <TextField name="designer" />
            </Grid>

            <Spacer mt={3} />

            <Grid item xs={6}>
              <Text variant="h6">Based in</Text>
              <Spacer mt={1} />
              <TextField name="basedIn" />
            </Grid>

            <Spacer mt={3} />

            <Grid item xs={6}>
              <Text variant="h6">Shopify Integration Enabled</Text>
              <Spacer mt={1} />
              <CheckboxField name="externalShopifyIntegrationEnabled" />
            </Grid>
            <Grid item xs={6}>
              <Text variant="h6">Shopify Integration Shop Name</Text>
              <Spacer mt={1} />
              <TextField name="externalShopifyIntegrationShopName" />
            </Grid>
            <Spacer mt={10} />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}
