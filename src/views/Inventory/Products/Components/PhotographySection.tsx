import React from "react"

import { Box, GridList, GridListTile } from "@material-ui/core"

import { Spacer, Text } from "components"
import { DropzoneField } from "fields"

export interface PhotographySectionProps {
  numImages: number
}

export const PhotographySection: React.FC<PhotographySectionProps> = ({ numImages }) => {
  return (
    <>
      <Text variant="h4">Photography</Text>
      <Spacer mt={2} />
      <Box borderColor="#e5e5e5" borderRadius={4} border={1} p={2}>
        <GridList cellHeight={516} cols={1}>
          {[...Array(numImages)].map((_, index) => (
            <GridListTile key={index}>
              <DropzoneField name={`image_${index}`} required />
            </GridListTile>
          ))}
        </GridList>
      </Box>
      <Spacer mt={9} />
    </>
  )
}
