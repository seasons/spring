import { EditButton } from "components"
import React from "react"

import { Card, CardContent, CardHeader, Divider, Table, TableBody, TableCell, TableRow, Theme } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"

const useStyles = makeStyles<Theme>(theme => ({
  content: {
    padding: 0,
  },
}))

export const Lifestyle: React.FC = props => {
  const classes = useStyles()

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
              <TableCell>He/Him</TableCell>
              <TableCell>
                <EditButton onClick={handleEditEntity} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Profession</TableCell>
              <TableCell>Technology</TableCell>
              <TableCell>
                <EditButton onClick={handleEditEntity} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Party Frequency</TableCell>
              <TableCell>3-4 times a week</TableCell>
              <TableCell>
                <EditButton onClick={handleEditEntity} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Average Spend</TableCell>
              <TableCell>$500 - $1000 a month</TableCell>
              <TableCell>
                <EditButton onClick={handleEditEntity} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Style Preferences</TableCell>
              <TableCell>All of the above</TableCell>
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
