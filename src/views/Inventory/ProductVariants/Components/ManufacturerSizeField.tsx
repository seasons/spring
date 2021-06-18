import React from "react"
import { SelectField } from "fields"
import { Box } from "@material-ui/core"
import { Spacer, Text } from "components"
import { getFormSelectChoices } from "utils/form"
import {
  ACCESSORY_SIZE_TYPES,
  getManufacturerSizes,
  ManufacturerSizeType,
  MANUFACTURER_BOTTOM_SIZE_TYPES,
  MANUFACTURER_TOP_SIZE_TYPES,
} from "utils/sizes"
import { useField } from "react-final-form"
import { ProductType } from "generated/globalTypes"

interface ManufacturerSizeFieldProps {
  namePrefix?: string
  sizeType?: ManufacturerSizeType
  productType: ProductType
}

export const ManufacturerSizeField = ({ namePrefix, sizeType, productType }: ManufacturerSizeFieldProps) => {
  const manufacturerSizeTypeField = useField(`${namePrefix}_manufacturerSizeType`)
  const manufacturerSizeType = sizeType ? sizeType : manufacturerSizeTypeField?.input?.value
  const manufacturerSizeTypes =
    productType === "Top"
      ? MANUFACTURER_TOP_SIZE_TYPES
      : productType === "Bottom"
      ? MANUFACTURER_BOTTOM_SIZE_TYPES
      : productType === "Accessory"
      ? ACCESSORY_SIZE_TYPES
      : []
  const manufacturerSizeTypeChoices = getFormSelectChoices(manufacturerSizeTypes)
  const manufacturerSizes = getManufacturerSizes(manufacturerSizeType)

  const isUniversalSize = manufacturerSizeType === "Universal"

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
            disabled={isUniversalSize}
            initialValue={isUniversalSize ? "Universal" : undefined}
            name={`${namePrefix}_manufacturerSize`}
            choices={getFormSelectChoices(manufacturerSizes)}
            requiredString
          />
        </Box>
      </Box>
    </Box>
  )
}
