import React from "react"
import { Grid } from "@material-ui/core"
import { Spacer, Text } from "components"
import { ProductUpsertQuery_productModels } from "generated/ProductUpsertQuery"
import { ExpandableSection } from "components/ExpandableSection"
import { SelectField, TextField } from "fields"

interface SeasonsSectionProps {
  architectures: string[]
  models: ProductUpsertQuery_productModels[]
}

export const SeasonsSection: React.FC<SeasonsSectionProps> = () => {
  const wearableSeasonChoices = [
    { display: "Spring", value: "Spring" },
    { display: "Summer", value: "Summer" },
    { display: "Fall", value: "Fall" },
    { display: "Winter", value: "Winter" },
  ]

  const internalSeasons = [
    { display: "Fall Winter", value: "FW" },
    { display: "Spring Summer", value: "SS" },
  ]

  const vendorSeasons = [
    { display: "Fall Winter", value: "FW" },
    { display: "Spring Summer", value: "SS" },
    { display: "Pre-Spring", value: "PS" },
    { display: "Pre-Fall", value: "PF" },
    { display: "Holiday", value: "HO" },
    { display: "Autumn Winter", value: "AW" },
  ]

  const currentYear = new Date().getFullYear()
  const getRange = (start, stop, step) => Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step)
  const yearRanges = getRange(currentYear + 1, 2019, -1)
  const years = yearRanges.map(year => ({ display: year, value: year }))

  return (
    <ExpandableSection
      title="Seasons"
      content={
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Text variant="h6">Internal season</Text>
            <Spacer mt={1} />
            <SelectField name="internalSeasonSeasonCode" choices={internalSeasons} />
          </Grid>
          <Grid item xs={6}>
            <Text variant="h6">Internal year</Text>
            <Spacer mt={1} />
            <SelectField name="internalSeasonYear" choices={years} />
          </Grid>
          <Grid item xs={6}>
            <Text variant="h6">Vendor season</Text>
            <Spacer mt={1} />
            <SelectField name="vendorSeasonSeasonCode" choices={vendorSeasons} />
          </Grid>
          <Grid item xs={6}>
            <Text variant="h6">Vendor year</Text>
            <Spacer mt={1} />
            <TextField name="vendorSeasonYear" />
          </Grid>
          <Grid item xs={6}>
            <Text variant="h6">Wearable seasons</Text>
            <Spacer mt={1} />
            <SelectField name="wearableSeasons" multiple choices={wearableSeasonChoices} />
          </Grid>
        </Grid>
      }
    />
  )
}
