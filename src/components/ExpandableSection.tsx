import React, { useState } from "react"
import { Box } from "@material-ui/core"
import { SectionHeader } from "./SectionHeader"

export interface ExpandableSectionProps {
  content: any
  expanded?: boolean
  title: string
  primaryButton?: {
    text: string
    icon?: JSX.Element
    action?: () => void
  } | null
}

export const ExpandableSection: React.FC<ExpandableSectionProps> = ({
  content,
  expanded = true,
  title,
  primaryButton,
}) => {
  const [isExpanded, setIsExpanded] = useState(expanded)
  const onExpanded = () => setIsExpanded(!isExpanded)
  return (
    <>
      <SectionHeader expanded={isExpanded} title={title} primaryButton={primaryButton} onExpanded={onExpanded} />

      {isExpanded && (
        <Box m={2} flex={1}>
          {content}
        </Box>
      )}
    </>
  )
}
