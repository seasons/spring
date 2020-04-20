import React from "react"

import { Link, Theme, Typography } from "@material-ui/core"
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft"
import { makeStyles } from "@material-ui/styles"

const useStyles = makeStyles<Theme>(theme => ({
  root: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(5),
  },
  back: {
    verticalAlign: "bottom",
  },
  customerName: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(1),
  },
}))

export interface HeaderProps {
  history: any
}

export const Header: React.FunctionComponent<HeaderProps> = ({ history }) => {
  const classes = useStyles()
  const customer = {
    name: "Luc Succes",
    memberSince: "November 16, 2019",
  }

  return (
    <div className={classes.root}>
      <Typography component="h2" gutterBottom variant="overline">
        <Link component="button" variant="body2" onClick={() => history.push("/members")}>
          <KeyboardArrowLeftIcon className={classes.back} /> Members
        </Link>
      </Typography>
      <Typography component="h1" variant="h3" className={classes.customerName}>
        {customer.name}
      </Typography>
      <Typography component="h3">Joined {customer.memberSince}</Typography>
    </div>
  )
}
