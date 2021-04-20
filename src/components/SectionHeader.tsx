import React, { useState } from "react"

import { Box, Button, Grid, IconButton } from "@material-ui/core"
import ExpandLessIcon from "@material-ui/icons/ExpandLess"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"

import { Separator, Spacer, Text } from "components"

export interface SectionHeaderProps {
  expanded?: boolean
  title: string
  primaryButton?: {
    text: string
    icon?: JSX.Element
    action?: () => void
  } | null
  onExpanded: (expanded: boolean) => void
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ expanded = true, onExpanded, primaryButton, title }) => {
  const [isExpanded, setIsExpanded] = useState(expanded)

  const onClickedExpand = () => {
    setIsExpanded(!isExpanded)
    onExpanded(!isExpanded)
  }

  return (
    <Grid item xs={12}>
      <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">
        <Text variant="h4">{title}</Text>

        <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">
          {primaryButton && (
            <Box>
              <Button color="primary" variant="contained" onClick={primaryButton.action} startIcon={primaryButton.icon}>
                {primaryButton.text}
              </Button>
            </Box>
          )}
          <IconButton onClick={onClickedExpand}>{isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}</IconButton>
        </Box>
      </Box>
      <Spacer mt={2} />
      <Separator />
      <Spacer mt={3} />
    </Grid>
  )
}
