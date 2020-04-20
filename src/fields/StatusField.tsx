import { IndicatorMap } from "components"
import React from "react"
import styled from "styled-components"

export interface IndicatorProps {
  status: string
}

const Indicator = styled.div`
  background-color: ${(props: IndicatorProps) => IndicatorMap[props.status]};
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
      <Indicator status={status} />
      {status}
    </div>
  )
}
