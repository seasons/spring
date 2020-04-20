import { EditButton } from "components"
import React from "react"

import { Card, CardContent, CardHeader, Divider, Table, TableBody, TableCell, TableRow, Theme } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"

const useStyles = makeStyles<Theme>(theme => ({
  root: {},
  content: {
    padding: 0,
  },
  actions: {
    flexDirection: "column",
    alignItems: "flex-start",
    "& > * + *": {
      marginLeft: 0,
    },
  },
  buttonIcon: {
    marginRight: theme.spacing(1),
  },
}))

export const PersonalDetails: React.FC = props => {
  const classes = useStyles()

  const handleEditStatus = () => {
    console.log("editing status")
  }

  const handleEditMembership = () => {
    console.log("editing membership")
  }

  return (
    <Card className={classes.root}>
      <CardHeader title="Personal details" />
      <Divider />
      <CardContent className={classes.content}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Status</TableCell>
              <TableCell>Active</TableCell>
              <TableCell>
                <EditButton onClick={handleEditStatus} />
              </TableCell>
            </TableRow>
            <TableRow selected>
              <TableCell>Membership</TableCell>
              <TableCell>All Access</TableCell>
              <TableCell>
                <EditButton onClick={handleEditMembership} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell>l2succes@gmail.com</TableCell>
            </TableRow>
            <TableRow selected>
              <TableCell>Phone number</TableCell>
              <TableCell>706-125-2095</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Birthday</TableCell>
              <TableCell>08/16/1990</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
