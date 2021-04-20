import React from "react"
import { Table, TableHead, TableCell, TableBody, TableRow, Card, Box } from "@material-ui/core"

import { CheckField } from "fields"

interface ExpandedRowProps {
  id?: string
  record?: any
  resource?: string
}

export const ExpandedRow = ({ record: customer }: ExpandedRowProps) => {
  const {
    admissions,
    user: {
      links: { sendgrid, mixpanel, intercom },
    },
  } = customer

  return (
    <Box p={1} width="100%">
      <Card style={{ width: "100%" }}>
        <Table>
          <TableHead>
            {!!admissions && (
              <>
                <TableCell>Admissable</TableCell>
                <TableCell>In Serviceable Zipcode</TableCell>
                {!admissions.admissable && <TableCell>Inadmissable Reason</TableCell>}
                <TableCell>Authorizations</TableCell>
              </>
            )}
            <TableCell>Mixpanel</TableCell>
            <TableCell>Sendgrid</TableCell>
            <TableCell>Intercom</TableCell>
          </TableHead>
          <TableBody>
            <TableRow>
              {!!admissions && (
                <>
                  <TableCell>
                    <CheckField record={customer} source="admissions.admissable" value={true} />
                  </TableCell>
                  <TableCell>
                    <CheckField record={customer} source="admissions.inServiceableZipcode" value={true} />
                  </TableCell>
                  {!admissions.admissable && <TableCell>{admissions.inAdmissableReason}</TableCell>}
                  <TableCell>{admissions.authorizationsCount}</TableCell>
                </>
              )}
              <TableCell>
                <a target="_blank" rel="noopener noreferrer" href={`${mixpanel}`}>
                  View
                </a>
              </TableCell>
              <TableCell>
                <a target="_blank" rel="noopener noreferrer" href={`${sendgrid}`}>
                  View
                </a>
              </TableCell>
              <TableCell>
                <a target="_blank" rel="noopener noreferrer" href={`${intercom}`}>
                  View
                </a>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>
    </Box>
  )
}
