import React, { useCallback } from "react"
import { Box, styled } from "@material-ui/core"
import { useDropzone } from "react-dropzone"

import { FormControl, Spacer, Text } from "components"
import { Field, ChildFieldProps } from "./Field"
import { UploadFileIcon } from "icons"
import { colors } from "theme/colors"

export type DropzoneFieldProps = ChildFieldProps & {
  index: number
  imagePreview?: string
  onReceivedImages: (images: File[], offset: number) => void
  style?: any
}

export const DropzoneField: React.FC<DropzoneFieldProps> = ({
  index,
  imagePreview,
  name,
  onReceivedImages,
  style,
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

  const wrapperHeight = style?.height ?? 85
  const uploadIconHeight = style?.uploadIconHeight ?? 33

  return (
    <Field
      name={name}
      render={({ input: { value, onChange, ...input }, meta }) => {
        return (
          <FormControl error={meta.error}>
            <Box
              display="flex"
              style={{ backgroundColor: colors.white95 }}
              borderRadius={4}
              height={wrapperHeight}
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              mx={1}
              {...getRootProps()}
              {...style}
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
                  <img
                    src={imagePreview}
                    alt="Preview"
                    style={{ width: "100%", height: "100%", objectFit: "contain" }}
                  />
                </Box>
              ) : (
                <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
                  <UploadFileIcon height={uploadIconHeight} width={uploadIconHeight} />
                  {style?.title && (
                    <>
                      <Spacer mt={2} /> <Text variant="h6">{style?.title}</Text>
                    </>
                  )}
                  {style?.subtitle && (
                    <Text variant="h6" opacity={0.5}>
                      {style?.subtitle}
                    </Text>
                  )}
                </Box>
              )}
            </Box>
          </FormControl>
        )
      }}
      {...rest}
    />
  )
}
