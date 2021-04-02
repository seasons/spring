import React, { useState } from "react"

import { Grid } from "@material-ui/core"

import { Spacer, Text } from "components"
import { ExpandableSection } from "../../Components"
import { getTypeSpecificVariantFields } from "../../utils"
import { GroupedAutocompleteField, TextField, SelectField } from "fields"
import { getManufacturerSizes, MANUFACTURER_SIZE_TYPES } from "utils/sizes"
import { getFormSelectChoices } from "utils/form"

export interface VariantCreateSectionProps {
  productType: string
  sizeOptions: { key: string; value: any }[]
  variantIndex: number
}

export const VariantCreateSection: React.FC<VariantCreateSectionProps> = ({
  productType,
  sizeOptions,
  variantIndex,
}) => {
  const [manufacturerSizeType, setManufacturerSizeType] = useState(null)
  const typeSpecificFields = getTypeSpecificVariantFields(productType)
  const typeSpecificFirstRowFields = typeSpecificFields.length > 0 ? typeSpecificFields.slice(0, 3) : []
  const typeSpecificSecondRowFields = typeSpecificFields.length > 0 ? typeSpecificFields.slice(3) : []
  const firstRowFields = ["Weight", ...typeSpecificFirstRowFields]
  const secondRowFields = ["Total count", ...typeSpecificSecondRowFields]
  const requiredFields = productType === "Bottom" ? ["Total count", "Waist", "Inseam"] : ["Total count"]
  const manufacturerSizes = getManufacturerSizes(manufacturerSizeType).map(x => x.toString())

  return (
    <ExpandableSection
      title={`#${variantIndex + 1}`}
      content={
        <>
          <Grid container spacing={2}>
            {firstRowFields.map((field, index) => {
              const isRequired = requiredFields.includes(field)
              return (
                <Grid item key={index} xs={3}>
                  <Text variant="h5">
                    {field}
                    {isRequired && " *"}
                  </Text>
                  <Spacer mt={1} />
                  <TextField
                    type="number"
                    name={`${variantIndex}_${field.toLowerCase()}`}
                    requiredNumber={isRequired}
                  />
                </Grid>
              )
            })}
            <Spacer grid mt={3} />
            {secondRowFields.map((field, index) => {
              const isRequired = requiredFields.includes(field)
              return (
                <Grid item key={index} xs={3}>
                  <Text variant="h5">
                    {field}
                    {isRequired && " *"}
                  </Text>
                  <Spacer mt={1} />
                  <TextField
                    type="number"
                    name={`${variantIndex}_${field.toLowerCase().replace(" ", "")}`}
                    requiredNumber={isRequired}
                    maxValue={field === "Total count" ? 99 : undefined}
                  />
                </Grid>
              )
            })}
            <Spacer grid mt={3} />
            {productType === "Bottom" && (
              <>
                <Grid item xs={3}>
                  <Text variant="h5">Manufacturer size type</Text>
                  <Spacer mt={1} />
                  <SelectField
                    onChange={e => setManufacturerSizeType(e.target.value)}
                    name={`${variantIndex}_bottomSizeType`}
                    choices={getFormSelectChoices(MANUFACTURER_SIZE_TYPES)}
                  />
                  <Spacer mt={2} />
                </Grid>
                <Grid item xs={3}>
                  <Text variant="h5">Manufacturer sizes</Text>
                  <Spacer mt={1} />
                  <SelectField
                    name={`${variantIndex}_${"Manufacturer sizes".toLowerCase().replace(" ", "")}`}
                    choices={getFormSelectChoices(manufacturerSizes)}
                  />
                </Grid>
              </>
            )}
            {productType === "Top" && (
              <Grid item xs={3}>
                <Text variant="h5">Letter size *</Text>
                <Spacer mt={1} />
                <GroupedAutocompleteField
                  name={`${variantIndex}_${"Letter size".toLowerCase().replace(" ", "")}`}
                  groupedOptions={sizeOptions}
                  multiple={false}
                  requiredString
                />
              </Grid>
            )}
            <Spacer grid mt={3} />
          </Grid>
        </>
      }
    />
  )
}
