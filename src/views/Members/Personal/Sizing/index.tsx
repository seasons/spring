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

export const Sizing: React.FC<MemberSubViewIfc> = ({ member }) => {
  const classes = useStyles()
  const user = member.detail

  const handleEditEntity = () => {
    console.log("editing membership")
  }

  return (
    <Card>
      <CardHeader title="Sizing" />
      <Divider />
      <CardContent className={classes.content}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Height</TableCell>
              <TableCell>{user.height}</TableCell>
              <TableCell>
                <EditButton onClick={handleEditEntity} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Body Type</TableCell>
              <TableCell>{user.bodyType}</TableCell>
              <TableCell>
                <EditButton onClick={handleEditEntity} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Avg. top size</TableCell>
              <TableCell>{user.averageTopSize}</TableCell>
              <TableCell>
                <EditButton onClick={handleEditEntity} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Avg. waist size</TableCell>
              <TableCell>{user.averageWaistSize}</TableCell>
              <TableCell>
                <EditButton onClick={handleEditEntity} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Avg. pant length</TableCell>
              <TableCell>{user.averagePantLength}</TableCell>
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
