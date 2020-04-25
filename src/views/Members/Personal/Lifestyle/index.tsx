import { EditButton } from "components"
import React from "react"

import { Card, CardContent, CardHeader, Divider, Table, TableBody, TableCell, TableRow, Theme } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"

import { MemberSubViewIfc } from "../../interfaces"

const useStyles = makeStyles<Theme>(theme => ({
  content: {
    padding: 0,
  },
}))

export const Lifestyle: React.FC<MemberSubViewIfc> = ({ member }) => {
  const classes = useStyles()
  const user = member.detail

  const handleEditEntity = () => {
    console.log("editing membership")
  }

  return (
    <Card>
      <CardHeader title="Lifestyle" />
      <Divider />
      <CardContent className={classes.content}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Preferred Pronouns</TableCell>
              <TableCell>{user.preferredPronouns}</TableCell>
              <TableCell>
                <EditButton onClick={handleEditEntity} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Profession</TableCell>
              <TableCell>{user.profession}</TableCell>
              <TableCell>
                <EditButton onClick={handleEditEntity} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Party Frequency</TableCell>
              <TableCell>{user.partyFrequency}</TableCell>
              <TableCell>
                <EditButton onClick={handleEditEntity} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Average Spend</TableCell>
              <TableCell>{user.averageSpend}</TableCell>
              <TableCell>
                <EditButton onClick={handleEditEntity} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Style Preferences</TableCell>
              <TableCell>{user.style}</TableCell>
              <TableCell>
                <EditButton onClick={handleEditEntity} />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
