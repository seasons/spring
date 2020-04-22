import React from "react"

import { Separator, Spacer, Text } from "components"

export interface SectionHeaderProps {
  title: string
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title }) => {
  return (
    <>
      <Text variant="h4">{title}</Text>
      <Spacer mt={2} />
      <Separator />
      <Spacer mt={3} />
    </>
  )
}
