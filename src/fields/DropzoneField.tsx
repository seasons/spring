import React, { useCallback, useState } from "react"
import { Box, styled } from "@material-ui/core"
import { useDropzone } from "react-dropzone"

import { FormControl, Spacer, Text } from "components"
import { Field, ChildFieldProps } from "./Field"
import { UploadFileIcon } from "icons"

export type DropzoneFieldProps = ChildFieldProps & {}

export const DropzoneField: React.FC<DropzoneFieldProps> = ({ name, ...rest }) => {
  const [imagePreview, setImagePreview] = useState("")
  const onDrop = useCallback(acceptedFiles => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0]
      setImagePreview(URL.createObjectURL(file))
    }
  }, [])
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
              {...getRootProps()}
            >
              <input
                {...inputProps}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  if (inputProps.onChange) {
                    inputProps.onChange(event)
                  }
                  onChange(event.target.files)
                }}
              />
              {imagePreview ? (
                <Box justifyContent="center" alignItems="center">
                  <img src={imagePreview} alt="Preview" style={{ minWidth: "100%", minHeight: "100%" }} />
                </Box>
              ) : (
                <>
                  <UploadFileIcon />
                  <Spacer mt={2} />
                  <Text variant="h6">Select files to upload</Text>
                  <Spacer mt={0.5} />
                  <Text variant="h6" opacity={0.5}>
                    or drag and drop, copy and paste files
                  </Text>
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
  background: "#f6f6f6",
  borderRadius: 4,
  height: 500,
})
