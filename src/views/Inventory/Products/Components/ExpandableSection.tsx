import React, { useState } from "react"

import { SectionHeader } from "./SectionHeader"

export interface ExpandableSectionProps {
  content: any
  expanded?: boolean
  title: string
}

export const ExpandableSection: React.FC<ExpandableSectionProps> = ({ content, expanded = true, title }) => {
  const [isExpanded, setIsExpanded] = useState(expanded)
  const onExpanded = () => setIsExpanded(!isExpanded)
  return (
    <>
      <SectionHeader expanded={isExpanded} title={title} onExpanded={onExpanded} />
      {isExpanded && content}
    </>
  )
}
