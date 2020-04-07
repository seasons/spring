import React from "react"
import PropTypes from "prop-types"
import clsx from "clsx"
import { makeStyles } from "@material-ui/styles"
import { Grid, Typography, Button, Theme } from "@material-ui/core"

const useStyles = makeStyles<Theme>(theme => ({
  root: {},
  addButton: {
    marginTop: theme.spacing(3),
  },
}))

function Header({ className, ...rest }: any) {
  const classes = useStyles()

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Grid alignItems="flex-end" container justify="space-between" spacing={3}>
        <Grid item>
          <Typography component="h1" variant="h3">
<<<<<<< HEAD:src/views/Products/Header.tsx
            Products
          </Typography>
        </Grid>
        <Grid item>
          <Button color="primary" variant="contained">
            Add product
=======
            Inventory
          </Typography>
        </Grid>
        <Grid item>
          <Button color="primary" variant="contained" className={classes.addButton}>
            New product
>>>>>>> 5fa4932c64ebeda86f7a515da64fb6edd332e710:src/views/Inventory/Header.tsx
          </Button>
        </Grid>
      </Grid>
    </div>
  )
}

Header.propTypes = {
  className: PropTypes.string,
}

export default Header
