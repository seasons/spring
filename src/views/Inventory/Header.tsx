import clsx from "clsx"
import React from "react"

import { Button, Grid, Theme, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"

const useStyles = makeStyles<Theme>(theme => ({
  root: {},
  addButton: {
    marginTop: theme.spacing(3),
  },
}))

export interface HeaderProps {
  className?: string
  onNewProductBtnPressed: () => void
}

export const Header: React.FC<HeaderProps> = ({ className, onNewProductBtnPressed, ...rest }) => {
  const classes = useStyles()

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Grid alignItems="flex-end" container justify="space-between" spacing={3}>
        <Grid item>
          <Typography component="h1" variant="h3">
            Inventory
          </Typography>
        </Grid>
        <Grid item>
          <Button color="primary" variant="contained" className={classes.addButton} onClick={onNewProductBtnPressed}>
            New product
          </Button>
        </Grid>
      </Grid>
    </div>
  )
}
