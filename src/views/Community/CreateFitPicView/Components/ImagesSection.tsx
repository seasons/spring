import React, { useState } from "react"
import { useForm, useFormState } from "react-final-form"
import { Box } from "@material-ui/core"
import { Spacer, Text } from "components"
import { DropzoneField } from "fields"

export const ImagesSection: React.FC = () => {
  const {
    mutators: { setValue },
  } = useForm()
  const { values } = useFormState()
  const [imagePreview, setImagePreview] = useState<any>(
    (() => {
      const imageURL = values.image
      if (!imageURL) {
        return null
      }
      if (typeof imageURL === "string") {
        return imageURL
      }

      return URL.createObjectURL(imageURL)
    })()
  )

  const onReceivedImages = (images: File[]) => {
    if (images.length > 0) {
      setValue("image", images[0])
      setImagePreview(URL.createObjectURL(images[0]))
    }
  }

  return (
    <>
      <Text variant="h4">Image</Text>
      <Spacer mt={2} />
      <Box borderColor="#e5e5e5" borderRadius={4} border={1} p={2}>
        <DropzoneField
          index={0}
          imagePreview={imagePreview}
          name={"image"}
          onReceivedImages={onReceivedImages}
          style={{
            height: 400,
            mx: 0,
            uploadIconHeight: 64,
            title: "Select files to upload",
            subtitle: "or drag and drop, copy and paste files",
          }}
        />
      </Box>
      <Spacer mt={9} />
    </>
  )
}
