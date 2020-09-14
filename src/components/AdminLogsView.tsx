import React from "react"
import { SinceDateField } from "fields"
import { Box, Typography, Table, TableBody, TableRow, TableCell, Card, TableHead } from "@material-ui/core"
import { upperFirst } from "lodash"

interface AdminLogsViewProps {
  logs: any
}

export const AdminLogsView: React.FC<AdminLogsViewProps> = ({ logs }) => {
  if (logs.length === 0) {
    return null
  }

  const databaseActionToReadableActionMap = {
    Insert: "Created",
    Delete: "Deleted",
    Update: "Updated",
    Truncate: "Truncated",
  }
  console.log(logs)
  return (
    <Box>
      <Card>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>When</TableCell>
              <TableCell>Who</TableCell>
              <TableCell>Action</TableCell>
              <TableCell>Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {logs.map(log => {
              const {
                action,
                activeAdminUser: { fullName },
                changedFields,
              } = log
              return (
                <TableRow>
                  {/* When did it happen */}
                  <TableCell>
                    <SinceDateField record={log} source="triggeredAt"></SinceDateField>
                  </TableCell>

                  {/* Who did it */}
                  <TableCell>
                    <Box>
                      <Box>
                        <Typography>{fullName}</Typography>
                      </Box>
                    </Box>
                  </TableCell>

                  {/* What happened */}
                  <TableCell>
                    <Box>
                      <Typography variant="h6" style={{ fontWeight: "bold" }}>
                        {`${databaseActionToReadableActionMap[action]} Record`}
                      </Typography>
                    </Box>
                  </TableCell>

                  {/*Detail on what happened */}
                  <TableCell>
                    <Box>
                      <Typography variant="h6" style={{ fontWeight: "bold" }}>
                        {renderChangedFields(log)}
                      </Typography>
                    </Box>
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

const renderChangedFields = ({ rowData, changedFields, action }) => {
  let returnString = ``
  if (action === "Update") {
    for (const key of Object.keys(changedFields)) {
      returnString = returnString + `\n${upperFirst(key)}: ${rowData?.[key]} > ${changedFields[key]}`
    }
  }

  return returnString
}