import React from "react"
import { StatusField, SinceDateField, CheckField } from "fields"
import { DateTime } from "luxon"
import { Box, Typography, Table, TableBody, TableRow, TableCell, Card } from "@material-ui/core"
import { head, stubArray } from "lodash"

interface TrackingInfoProps {
  packageEvents: any
}

export const TrackingInfo: React.FC<TrackingInfoProps> = ({ packageEvents }) => {
  if (packageEvents.length === 0) {
    return null
  }
  const firstEvent: any = head(packageEvents)
  const eventData = firstEvent.data.data
  const { trackingNumber, trackingHistory } = eventData

  return (
    <Box>
      <Box mb={2}>
        <Typography variant="h3">Package Events</Typography>
      </Box>

      <Card>
        <Table>
          <TableBody>
            {trackingHistory.map(event => {
              const { statusDetails, substatus, status } = event

              return (
                <TableRow>
                  <TableCell>
                    <SinceDateField record={event} source="statusDate"></SinceDateField>
                  </TableCell>
                  <TableCell>
                    <Box>
                      <Typography variant="h6" style={{ fontWeight: "bold" }}>
                        {status}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box>
                      <Typography variant="body2">{statusDetails}</Typography>
                    </Box>
                    {!!substatus && (
                      <Box>
                        <Box>
                          <Typography>{substatus.text}</Typography>
                        </Box>
                      </Box>
                    )}
                  </TableCell>
                  <TableCell>
                    {!!substatus.actionRequired && (
                      <Box mt={1}>
                        <Typography variant="button" color="error">
                          Action Required
                        </Typography>
                      </Box>
                    )}
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
