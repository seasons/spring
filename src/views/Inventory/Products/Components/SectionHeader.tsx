import React, { useState } from "react"

import { Box, IconButton } from "@material-ui/core"
import ExpandLessIcon from "@material-ui/icons/ExpandLess"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"

import { Separator, Spacer, Text } from "components"

export interface SectionHeaderProps {
  expanded?: boolean
  title: string
  onExpanded: (expanded: boolean) => void
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ expanded = true, onExpanded, title }) => {
  const [isExpanded, setIsExpanded] = useState(expanded)

  const onClickedExpand = () => {
    setIsExpanded(!isExpanded)
    onExpanded(!isExpanded)
  }

  return (
    <>
      <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">
        <Text variant="h4">{title}</Text>
        <IconButton onClick={onClickedExpand}>{isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}</IconButton>
      </Box>
      <Spacer mt={2} />
      <Separator />
      <Spacer mt={3} />
    </>
  )
}
