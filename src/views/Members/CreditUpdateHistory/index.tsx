import React from "react"
import { ProductItemsField, SinceDateField, StatusField, ViewEntityField } from "fields"
import { Datagrid, TextField } from "@seasons/react-admin"
import { Box, Card, Table, TableCell, TableHead, TableRow, Typography, TableBody } from "@material-ui/core"
import { formatPrice } from "utils/price"

import { MemberSubViewProps } from "../interfaces"

export const CreditBalanceUpdateHistory: React.FC<MemberSubViewProps> = ({ member }) => {
  let normalizedCreditHistory = {}
  const creditUpdateHistory = member?.membership?.creditUpdateHistory

  creditUpdateHistory?.forEach(res => {
    normalizedCreditHistory[res.id] = res
  })
  const defaultSort = { field: "createdAt", order: "DESC" }

  return (
    <Card>
      <Box>
        <Card>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date Updated</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Who</TableCell>
                <TableCell>Details</TableCell>
                <TableCell>Balance</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {creditUpdateHistory &&
                creditUpdateHistory?.map(log => {
                  const firstName = log?.adminUser?.firstName
                  const lastName = log?.adminUser?.lastName
                  const fullName = firstName ? firstName + " " + lastName : "System"
                  return (
                    <TableRow>
                      {/* When did it happen */}
                      <TableCell>
                        <SinceDateField record={log} source="createdAt"></SinceDateField>
                      </TableCell>

                      {/* Amount Update */}
                      <TableCell>
                        <Box>
                          <Typography
                            variant="h6"
                            style={{ color: log.amount > 0 ? "green" : "red", fontWeight: "bold" }}
                          >
                            {formatPrice(log.amount)}
                          </Typography>
                        </Box>
                      </TableCell>

                      {/* Who did it */}
                      <TableCell>
                        <Box>
                          <Box>
                            <Typography>{fullName}</Typography>
                          </Box>
                        </Box>
                      </TableCell>

                      {/* Detail on what happened  */}
                      <TableCell>
                        <Box width="25%" style={{ overflow: "hidden" }}>
                          <Typography variant="h6">{log.reason}</Typography>
                        </Box>
                      </TableCell>

                      {/* Credit Balance after update */}
                      <TableCell>
                        <Typography variant="h6">{formatPrice(log.balance)}</Typography>
                      </TableCell>
                    </TableRow>
                  )
                })}
            </TableBody>
          </Table>
        </Card>
      </Box>
    </Card>
  )
}
