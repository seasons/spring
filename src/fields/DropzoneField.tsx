import React, { useCallback } from "react"
import { Box, styled } from "@material-ui/core"
import { useDropzone } from "react-dropzone"

import { FormControl } from "components"
import { Field, ChildFieldProps } from "./Field"
import { UploadFileIcon } from "icons"
import { colors } from "theme/colors"

export type DropzoneFieldProps = ChildFieldProps & {
  index: number
  imagePreview?: string
  onReceivedImages: (images: File[], offset: number) => void
}

const CONTAINER_HEIGHT = 85

export const DropzoneField: React.FC<DropzoneFieldProps> = ({
  index,
  imagePreview,
  name,
  onReceivedImages,
  ...rest
}) => {
  const onDrop = useCallback(
    acceptedFiles => {
      // If multiple files were uploaded, update images starting
      // at index 0, otherwise just update the current index
      const offset = acceptedFiles.length > 1 ? 0 : index
      onReceivedImages(acceptedFiles, offset)
    },
    [index, onReceivedImages]
  )
  const { getRootProps, getInputProps } = useDropzone({ onDrop })
  const inputProps = getInputProps()

  return (
    <Field
      name={name}
      render={({ input: { value, onChange, ...input }, meta }) => {
        return (
          <FormControl error={meta.error}>
            <Wrapper
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              mx={1}
              {...getRootProps()}
            >
              <input
                {...inputProps}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  if (inputProps.onChange) {
                    inputProps.onChange(event)
                  }
                }}
              />
              {imagePreview ? (
                <Box display="flex" justifyContent="center" alignItems="center">
                  <img src={imagePreview} alt="Preview" style={{ height: CONTAINER_HEIGHT, objectFit: "contain" }} />
                </Box>
              ) : (
                <>
                  <UploadFileIcon height={33} width={33} />
                </>
              )}
            </Wrapper>
          </FormControl>
        )
      }}
      {...rest}
    />
  )
}

const Wrapper = styled(Box)({
  background: colors.white95,
  borderRadius: 4,
  height: CONTAINER_HEIGHT,
})
