import React from "react"
import { Box, Card, Grid, CardContent, Table, TableBody, TableCell, TableRow, Typography } from "@material-ui/core"
import { MemberSubViewProps } from "../interfaces"
import { CheckField } from "fields/CheckField"

export const Admissions: React.FunctionComponent<MemberSubViewProps> = ({ member }) => {
  const { admissions } = member
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
                      <Typography variant="h4">Admissions</Typography>
                    </Box>
                  </Grid>
                </Grid>
              </TableCell>
            </TableRow>
            <AdmissionsRow
              fieldName="Admissable"
              fieldValue={<CheckField record={member} source={"admissions.admissable"} value={true} />}
            />
            <AdmissionsRow
              fieldName="In Serviceable Zipcode"
              fieldValue={<CheckField record={member} source={"admissions.inServiceableZipcode"} value={true} />}
            />
            <AdmissionsRow fieldName="Inadmissable Reason" fieldValue={admissions?.inAdmissableReason} />
            <AdmissionsRow
              fieldName="Authorizations"
              fieldValue={admissions?.authorizationsCount}
              formatFunc={a => `${a}`}
            />
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

const AdmissionsRow = ({ fieldName, fieldValue, formatFunc = a => a }) => {
  return (
    <TableRow>
      <TableCell>{fieldName}</TableCell>
      <TableCell>{formatFunc(fieldValue) || "n/a"}</TableCell>
      <TableCell></TableCell>
    </TableRow>
  )
}
