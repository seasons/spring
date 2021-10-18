import { Box, Card, Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core"
import React from "react"

import { TabRenderProps } from "components/DetailView"
import { SinceDateField } from "fields/SinceDateField"
import { ImagesField } from "fields/ImagesField"
import { StatusField } from "fields/StatusField"
import { MemberField } from "fields/MemberField"
import { PhaseField } from "fields/PhaseField"
import { ViewEntityField } from "fields/ViewEntityField"

export const ReservationHistoryView: React.FC<TabRenderProps> = ({ data }) => {
  if (!data) {
    return <></>
  }

  return (
    <Box pt={3}>
      <Card>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Created</TableCell>
              <TableCell>Images</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Member</TableCell>
              <TableCell>Status Last Updated</TableCell>
              <TableCell>Phase</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.reservations.map(reservation => {
              return (
                <TableRow>
                  <TableCell>
                    <SinceDateField record={reservation} source="createdAt" />
                  </TableCell>
                  <TableCell>
                    <ImagesField record={reservation} source="images" label="Images" size="medium" />
                  </TableCell>
                  <TableCell>
                    <StatusField record={reservation} label="Status" />
                  </TableCell>
                  <TableCell>
                    <MemberField record={reservation} label="Member" />
                  </TableCell>
                  <TableCell>
                    <SinceDateField record={reservation} source="statusUpdatedAt" label="Status Last Updated" />
                  </TableCell>
                  <TableCell>
                    <PhaseField record={reservation} source="phase" />
                  </TableCell>
                  <TableCell>
                    <ViewEntityField
                      record={reservation}
                      entityPath="reservation"
                      entityTab="overview"
                      source="id"
                      label="Actions"
                    />
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </Card>
    </Box>
  )
}
