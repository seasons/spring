import React from "react"
import { ClipLoader } from "react-spinners"
import { colors } from "theme/colors"

export interface LoaderProps {
  color?: string
  size?: number
}

export const Loader: React.FC<LoaderProps> = ({ color, size }) => {
  return <ClipLoader color={color || colors.white100} size={size} />
}
