import React from "react"
import { FullNameField } from "fields"

import { DateTime } from "luxon"
import { Theme, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"

import { BackButton } from "components"
import { MemberViewHeaderProps } from "./interfaces"

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

export const Header: React.FunctionComponent<MemberViewHeaderProps> = ({ history, member }) => {
  const classes = useStyles()
  const memberSince = DateTime.fromISO(member.user.createdAt).toLocaleString(DateTime.DATETIME_MED)

  return (
    <div className={classes.root}>
      <BackButton title="Members" onClick={() => history.push("/members")} />
      <Typography component="h1" variant="h3" className={classes.memberName}>
        <FullNameField record={member} />
      </Typography>
      <Typography component="h3">Joined {memberSince}</Typography>
    </div>
  )
}
