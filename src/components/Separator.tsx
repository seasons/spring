import styled from "styled-components"

export interface SeparatorProps {
  color?: string
}

/**
 * A horizontal divider whose width and spacing can be adjusted
 */
export const Separator = styled.div<SeparatorProps>`
  border: 1px solid ${props => props.color || "#e5e5e5"};
  border-bottom-width: 0;
`

Separator.defaultProps = {
  width: "100%",
}
