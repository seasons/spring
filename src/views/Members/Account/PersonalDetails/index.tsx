import { EditButton, IndicatorMap, Label } from "components"
import moment from "moment"
import React from "react"

import { Card, CardContent, CardHeader, Divider, Table, TableBody, TableCell, TableRow, Theme } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"

import { MemberSubViewIfc } from "../../interfaces"

const useStyles = makeStyles<Theme>(theme => ({
  content: {
    padding: 0,
  },
  status: {
    borderRadius: "20px",
  },
}))

export const PersonalDetails: React.FunctionComponent<MemberSubViewIfc> = ({ member }) => {
  const classes = useStyles()
  const birthday = moment(member.detail.birthday).format("MM/DD/YYYY")

  const handleEditStatus = () => {
    console.log("editing status")
  }

  const handleEditMembership = () => {
    console.log("editing membership")
  }

  return (
    <Card>
      <CardHeader title="Personal details" />
      <Divider />
      <CardContent className={classes.content}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Status</TableCell>
              <TableCell>
                <Label className={classes.status} color={IndicatorMap[member.status]}>
                  {member.status}
                </Label>
              </TableCell>
              <TableCell>
                <EditButton onClick={handleEditStatus} />
              </TableCell>
            </TableRow>
            <TableRow selected>
              <TableCell>Membership</TableCell>
              <TableCell>{member.plan}</TableCell>
              <TableCell>
                <EditButton onClick={handleEditMembership} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell>{member.user.email}</TableCell>
            </TableRow>
            <TableRow selected>
              <TableCell>Phone number</TableCell>
              <TableCell>{member.detail.phoneNumber}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Birthday</TableCell>
              <TableCell>{birthday}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
