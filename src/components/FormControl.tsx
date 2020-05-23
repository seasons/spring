import { FormControl as MuiFormControl, FormHelperText, styled } from "@material-ui/core"
import React from "react"

import { Text } from "components"
import { colors } from "theme/colors"

export interface FormControlProps {
  children?: any
  error: string
}

export const FormControl: React.FC<FormControlProps> = ({ children, error }) => {
  return (
    <FullWidthControl error={!!error}>
      {children}
      {error && (
        <FormHelperText>
          <Text variant="body2" color={colors.red100}>
            {error}
          </Text>
        </FormHelperText>
      )}
    </FullWidthControl>
  )
}

const FullWidthControl = styled(MuiFormControl)({
  width: "100%",
})
