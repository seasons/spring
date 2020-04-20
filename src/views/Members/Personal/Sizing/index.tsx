import { EditButton } from "components"
import React from "react"

import { Card, CardContent, CardHeader, Divider, Table, TableBody, TableCell, TableRow, Theme } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"

const useStyles = makeStyles<Theme>(theme => ({
  content: {
    padding: 0,
  },
}))

export const Sizing: React.FC = props => {
  const classes = useStyles()

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
              <TableCell>68.0</TableCell>
              <TableCell>
                <EditButton onClick={handleEditEntity} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Body Type</TableCell>
              <TableCell>Muscular</TableCell>
              <TableCell>
                <EditButton onClick={handleEditEntity} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Avg. top size</TableCell>
              <TableCell>Medium</TableCell>
              <TableCell>
                <EditButton onClick={handleEditEntity} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Avg. waist size</TableCell>
              <TableCell>30</TableCell>
              <TableCell>
                <EditButton onClick={handleEditEntity} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Avg. pant length</TableCell>
              <TableCell>30</TableCell>
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
