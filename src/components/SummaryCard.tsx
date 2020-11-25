import React from "react"
import { Box, Card, Grid, CardContent, Table, TableBody, TableCell, TableRow, Typography } from "@material-ui/core"
import { get } from "lodash"

export interface SummaryCardRowInput {
  fieldName: string
  fieldValuePath?: string
  fieldValueFunc?: (any) => any
  formatFunc?: (any) => any
}

export interface SummaryCardProps {
  record: any
  title: string
  rows: SummaryCardRowInput[]
}

export const SummaryCard: React.FunctionComponent<SummaryCardProps> = ({ record, title, rows }) => {
  return (
    <Card>
      <CardContent>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell colSpan={3}>
                <Grid justify="space-between" container>
                  <Grid item alignItems="center" justify="center">
                    <Box mt={0.5}>
                      <Typography variant="h4">{title}</Typography>
                    </Box>
                  </Grid>
                </Grid>
              </TableCell>
            </TableRow>
            {rows.map(r => {
              let fieldValue
              if (!!r.fieldValuePath) {
                fieldValue = get(record, r.fieldValuePath)
              } else if (!!r.fieldValueFunc) {
                fieldValue = r.fieldValueFunc(record)
              } else {
                throw new Error(`Must pass one of fieldValuePath or fieldValueFunc`)
              }
              return <SummaryCardRow fieldName={r.fieldName} fieldValue={fieldValue} />
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

const SummaryCardRow = ({ fieldName, fieldValue }) => {
  return (
    <TableRow>
      <TableCell>{fieldName}</TableCell>
      <TableCell>{fieldValue || "n/a"}</TableCell>
      <TableCell></TableCell>
    </TableRow>
  )
}
