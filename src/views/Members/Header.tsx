import { FullNameField } from "fields"
import moment from "moment"
import React from "react"

import { Link, Theme, Typography } from "@material-ui/core"
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft"
import { makeStyles } from "@material-ui/styles"

import { HeaderProps } from "./interfaces"

const useStyles = makeStyles<Theme>(theme => ({
  root: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(5),
  },
  back: {
    verticalAlign: "bottom",
  },
  memberName: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(1),
  },
}))

export const Header: React.FunctionComponent<HeaderProps> = ({ history, member }) => {
  const classes = useStyles()
  const memberSince = moment(member.user.createdAt).format("MMMM D, YYYY")

  return (
    <div className={classes.root}>
      <Typography component="h2" gutterBottom variant="overline">
        <Link component="button" variant="body2" onClick={() => history.push("/members")}>
          <KeyboardArrowLeftIcon className={classes.back} /> Members
        </Link>
      </Typography>
      <Typography component="h1" variant="h3" className={classes.memberName}>
        <FullNameField record={member} />
      </Typography>
      <Typography component="h3">Joined {memberSince}</Typography>
    </div>
  )
}
