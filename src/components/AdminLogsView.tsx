import React from "react"
import { SinceDateField } from "fields"
import { Box, Typography, Table, TableBody, TableRow, TableCell, Card, TableHead } from "@material-ui/core"
import { orderBy, upperFirst } from "lodash"

interface AdminLogsViewProps {
  logs: any
}

export const AdminLogsView: React.FC<AdminLogsViewProps> = ({ logs }) => {
  if (logs.length === 0) {
    return null
  }

  const sortedLogs = orderBy(logs, "triggeredAt", "desc")
  const databaseActionToReadableActionMap = {
    Insert: "Created",
    Delete: "Deleted",
    Update: "Updated",
    Truncate: "Truncated",
  }
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
            {sortedLogs.map(log => {
              const {
                action,
                activeAdminUser: { fullName },
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
                    <Box>{renderChangedFields(log)}</Box>
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

const renderChangedFields = ({ rowData, changedFields, action, interpretation }) => {
  if (!!interpretation) {
    return (
      <Typography variant="h6" style={{ fontWeight: "bold" }}>
        {interpretation.interpretation}
      </Typography>
    )
  }

  if (action === "Update") {
    return Object.keys(changedFields).map(key => (
      <Typography variant="h6" style={{ fontWeight: "bold" }}>
        {`\n${upperFirst(key)}: ${rowData?.[key]} > ${changedFields[key]}`}
      </Typography>
    ))
  }

  return null
}
