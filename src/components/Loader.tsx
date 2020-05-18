import React from "react"
import { ClipLoader } from "react-spinners"
import { colors } from "theme/colors"

export interface LoaderProps {
  size?: number
}

export const Loader: React.FC<LoaderProps> = ({ size }) => {
  return <ClipLoader color={colors.white100} size={size} />
}
