import React, { useState } from "react"
import Carousel from "react-images"
import { useForm, useFormState } from "react-final-form"

import { Box, Grid } from "@material-ui/core"

import { Spacer, Text } from "components"
import { DropzoneField } from "fields"
import { colors } from "theme/colors"

export interface ImageUploadProps {
  numImages: number
  title?: string
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ numImages, title }) => {
  const {
    mutators: { setValue },
  } = useForm()
  const { values } = useFormState()
  const [imagePreviews, setImagePreviews] = useState<any[]>(
    // Read the image files stored inside the form state by checking the keys
    // image_0, image_1, etc and if file exists, convert it to a URL
    [...Array(numImages)].map((_, index) => {
      const imageURL = values[`image_${index}`]
      if (!imageURL) {
        return null
      }
      if (typeof imageURL === "string") {
        return imageURL
      }

      return URL.createObjectURL(imageURL)
    })
  )

  const onReceivedImages = (images: File[], offset: number) => {
    const newImagePreviews = [...imagePreviews]
    images.forEach((image, index) => {
      const imageIndex = offset + index
      setValue(`image_${imageIndex}`, image)
      newImagePreviews[imageIndex] = URL.createObjectURL(image)
    })
    setImagePreviews(newImagePreviews)
  }

  const filteredImagePreviews = imagePreviews.filter(Boolean)

  return (
    <>
      <Text variant="h4">{title ? title : "Photography"}</Text>
      <Spacer mt={2} />
      <Box borderColor="#e5e5e5" borderRadius={4} border={1} p={2}>
        {filteredImagePreviews.length > 0 ? (
          <Carousel
            views={filteredImagePreviews.map(url => ({ source: url })) || []}
            styles={{
              navigationNext: (base, state) => ({ ...base, color: colors.black100 }),
              navigationPrev: (base, state) => ({ ...base, color: colors.black100 }),
            }}
          />
        ) : (
          <>
            <Box display="flex" justifyContent="center" alignItems="center" bgcolor={colors.white95} height={400}>
              <Text variant="h6" opacity={0.5}>
                No images uploaded yet
              </Text>
            </Box>
            <Spacer mt={2} />
          </>
        )}
        <Text variant="h6" opacity={0.5}>
          Drag and drop file(s) or tap on any of the images below to update them
        </Text>
        <Spacer mt={2} />
        <Grid container>
          {[...Array(numImages)].map((_, index) => (
            <Grid item xs={3} key={index}>
              <DropzoneField
                index={index}
                imagePreview={imagePreviews[index]}
                name={`image_${index}`}
                onReceivedImages={onReceivedImages}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
      <Spacer mt={9} />
    </>
  )
}