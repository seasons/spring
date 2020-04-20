import React from "react"
import styled from "styled-components"

const indicatorMap = {
  Authorized: "#01b06c",
  Active: "#01b06c",
  Waitlisted: "#c4c4c4",
  Invited: "#c4c4c4",
  Created: "#eea30e",
  Suspended: "#eea30e",
  Paused: "#eea30e",
  Deactivated: "#f85156",
}

export interface IndicatorProps {
  color: string
}

const Indicator = styled.div`
  background-color: ${(props: IndicatorProps) => indicatorMap[props.color]};
  width: 8px;
  height: 8px;
  border-radius: 50%;
  display: inline-block;
  margin-right: 10px;
`

export interface StatusFieldProps {
  record?: { status: String }
  label?: string
}

// NOTE: label isn't used but needs to be listed as a parameter in order to
// properly display label for column.
export const StatusField: React.FC<StatusFieldProps> = ({ record, label }) => {
  const status = record?.status

  return (
    <div>
      {" "}
      <Indicator color={status} />
      {status}
    </div>
  )
}
