import React from "react"
import { SinceDateField } from "fields"
import { Box, Typography, Table, TableBody, TableRow, TableCell, Card } from "@material-ui/core"
import { head } from "lodash"

interface TrackingInfoProps {
  packageEvents: any
}

export const TrackingInfo: React.FC<TrackingInfoProps> = ({ packageEvents }) => {
  if (packageEvents.length === 0) {
    return null
  }
  const firstEvent: any = head(packageEvents)
  const eventData = firstEvent.data.data
  const { trackingHistory } = eventData

  return (
    <Box>
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
