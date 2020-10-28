import React from "react"
import {
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  Card,
  Box,
  Menu,
  IconButton,
  MenuItem,
  styled,
} from "@material-ui/core"
import MoreHorizIcon from "@material-ui/icons/MoreHoriz"

import { CheckField } from "fields"
import { colors } from "theme"

interface ExpandedRowProps {
  id?: string
  record?: any
  resource?: string
}

export const ExpandedRow = ({ record: customer }: ExpandedRowProps) => {
  if (!customer.admissions) {
    return <p>No further data</p>
  }
  const {
    admissions: { admissable, inAdmissableReason, authorizationsCount },
  } = customer

  return (
    <Box p={1} width="100%">
      <Card style={{ width: "100%" }}>
        <Table>
          <TableHead>
            <TableCell>Admissable</TableCell>
            <TableCell>In Serviceable Zipcode</TableCell>
            {!admissable && <TableCell>Inadmissable Reason</TableCell>}
            <TableCell>Authorizations</TableCell>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>
                <CheckField record={customer} source="admissions.admissable" value={true} />
              </TableCell>
              <TableCell>
                <CheckField record={customer} source="admissions.inServiceableZipcode" value={true} />
              </TableCell>
              {!admissable && <TableCell>{inAdmissableReason}</TableCell>}
              <TableCell>{authorizationsCount}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>
    </Box>
  )
}
