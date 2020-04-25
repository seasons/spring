import React from "react"

import { Button, Grid, Typography } from "@material-ui/core"

export interface HeaderProps {
  className?: string
  title: string
  newEntityText: string
  newEntityHandler: () => void
}

export const Header: React.FC<HeaderProps> = ({ className, title, newEntityText, newEntityHandler, ...rest }) => {
  return (
    <div {...rest}>
      <Grid alignItems="flex-end" container justify="space-between" spacing={3}>
        <Grid item>
          <Typography component="h1" variant="h3">
            {title}
          </Typography>
        </Grid>
        <Grid item>
          <Button color="primary" variant="contained" onClick={newEntityHandler}>
            {newEntityText}
          </Button>
        </Grid>
      </Grid>
    </div>
  )
}
