import React from "react"

import { Link, Typography } from "@material-ui/core"
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft"

export interface BackButtonProps {
  title: string
  onClick: () => void
}

export const BackButton: React.FC<BackButtonProps> = ({ title, onClick }) => {
  return (
    <Typography component="h2" gutterBottom variant="overline">
      <Link component="button" variant="body2" onClick={onClick}>
        <KeyboardArrowLeftIcon style={{ verticalAlign: "bottom" }} /> {title}
      </Link>
    </Typography>
  )
}
