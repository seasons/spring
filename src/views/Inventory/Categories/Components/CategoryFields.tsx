import React from "react"
import { Grid, Box, InputAdornment } from "@material-ui/core"
import { SelectField, TextField } from "fields"
import { Spacer, Text, Header } from "components"
import { useLocation } from "react-router-dom"
import { SelectChoice } from "fields/SelectField"

export const CategoryFields: React.FC<{ headerTitle: string }> = ({ headerTitle }) => {
  const location = useLocation()

  const trueOrFalseSelectFields: SelectChoice[] = [
    { display: "True", value: true },
    { display: "False", value: false },
  ]

  return (
    <Box my={1}>
      <Header
        title={headerTitle}
        breadcrumbs={[
          {
            title: "Categories",
            url: "/inventory/categories",
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
              <Text variant="h6">Name plural *</Text>
              <Spacer mt={1} />
              <TextField name="name" placeholder="Enter a name" requiredString />
            </Grid>
            <Grid item xs={6}>
              <Text variant="h6">Name singular *</Text>
              <Spacer mt={1} />
              <TextField name="singularName" placeholder="Enter a name" requiredString />
            </Grid>
            <Grid item xs={6}>
              <Text variant="h6">Dry cleaning fee</Text>
              <Spacer mt={1} />
              <TextField
                name="dryCleaningFee"
                type="number"
                minValue={0}
                InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
              />
            </Grid>
            <Grid item xs={6}>
              <Text variant="h6">Recoupment</Text>
              <Spacer mt={1} />
              <TextField name="recoupment" type="number" minValue={0} />
            </Grid>
            <Grid item xs={6}>
              <Text variant="h6">Visible (show in browse views in clients)</Text>
              <Spacer mt={1} />
              <SelectField name="visible" choices={trueOrFalseSelectFields} />
            </Grid>
            <Grid item xs={6}>
              <Text variant="h6">Description</Text>
              <Spacer mt={1} />
              <TextField name="description" multiline placeholder="Enter a description" />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}
