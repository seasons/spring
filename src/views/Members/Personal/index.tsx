import React from "react"

import { Grid, Theme } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"

import { MemberSubViewIfc } from "../interfaces"
import { Lifestyle } from "./Lifestyle"
import { Sizing } from "./Sizing"

const useStyles = makeStyles<Theme>(theme => ({
  root: {
    padding: theme.spacing(5),
  },
}))

export const PersonalView: React.FC<MemberSubViewIfc> = ({ member }) => {
  const classes = useStyles()

  return (
    <>
      <Grid className={classes.root} container spacing={3}>
        <Grid item lg={6} md={6} xl={6} xs={12}>
          <Sizing member={member} />
        </Grid>
        <Grid item lg={6} md={6} xl={6} xs={12}>
          <Lifestyle member={member} />
        </Grid>
      </Grid>
    </>
  )
}
