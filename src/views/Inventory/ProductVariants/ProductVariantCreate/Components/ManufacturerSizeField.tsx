import React from "react"
import { SelectField } from "fields"
import { Box } from "@material-ui/core"
import { Spacer, Text } from "components"
import { getFormSelectChoices } from "utils/form"
import { getManufacturerSizes, ManufacturerSizeType, MANUFACTURER_SIZE_TYPES } from "utils/sizes"
import { useField } from "react-final-form"

interface ManufacturerSizeFieldProps {
  namePrefix?: string
  sizeType?: ManufacturerSizeType
}

export const ManufacturerSizeField = ({ namePrefix, sizeType }: ManufacturerSizeFieldProps) => {
  const manufacturerSizeTypeField = useField(`${namePrefix}_manufacturerSizeType`)
  const manufacturerSizeType = sizeType ? sizeType : manufacturerSizeTypeField?.input?.value
  const manufacturerSizeTypeChoices = getFormSelectChoices(MANUFACTURER_SIZE_TYPES)
  const manufacturerSizes = getManufacturerSizes(manufacturerSizeType)

  return (
    <Box display="flex" flex={1} mb={1}>
      <Box flex={1} display="flex" alignItems="center">
        <Text variant="h5">Manufacturer size</Text>
      </Box>
      <Box display="flex" flex={1}>
        <Box flex={1} mr={2}>
          <Text variant="h5">Type</Text>
          <Spacer mt={1} />
          <SelectField
            name={`${namePrefix}_manufacturerSizeType`}
            choices={manufacturerSizeTypeChoices}
            initialValue={manufacturerSizeType}
            disabled={manufacturerSizeType.length > 0}
          />
        </Box>
        <Box flex={1}>
          <Text variant="h5">Value</Text>
          <Spacer mt={1} />
          <SelectField
            name={`${namePrefix}_manufacturerSize`}
            choices={getFormSelectChoices(manufacturerSizes)}
            requiredString
          />
        </Box>
      </Box>
    </Box>
  )
}
