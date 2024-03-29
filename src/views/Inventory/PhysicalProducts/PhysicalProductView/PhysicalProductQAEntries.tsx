import { Button } from "@material-ui/core"
import { Box, TableHead, TableCell, Card, Table, TableRow, TableBody, Typography, Checkbox } from "@material-ui/core"
import { ProductQAModal } from "components/ProductQAModal"
import { SinceDateField } from "fields"
import { useRefresh } from "@seasons/react-admin"
import React, { useState } from "react"

export const PhysicalProductQAView = ({ data }) => {
  const refresh = useRefresh()
  const [openModal, setOpenModal] = useState(false)

  const damageTypeToReadableText = damageType => {
    switch (damageType) {
      case "ReturnedToVendor":
        return "Returned To Vendor"
      case "SoldToThirdParty":
        return "Sold To Third Party"
      case "SoldToUser":
        return "Sold To User"

      default:
        return damageType
    }
  }

  return (
    <Box pt={3}>
      <Box display="flex" alignItems="center" justifyContent="flex-end" flexDirection="row" mb={2}>
        <Box>
          <Button
            color="primary"
            variant="contained"
            onClick={() => {
              setOpenModal(true)
            }}
          >
            Add Entry
          </Button>
        </Box>
      </Box>
      <Card>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Damage Type</TableCell>
              <TableCell>Notes</TableCell>
              <TableCell>Logger</TableCell>
              <TableCell>Score</TableCell>
              <TableCell>Published</TableCell>
              <TableCell>Created At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.reports.map(report => {
              const {
                damageType,
                user: { fullName },
                notes,
                score,
                published,
              } = report
              return (
                <TableRow>
                  <TableCell>
                    <Box>
                      <Typography variant="h6" style={{ fontWeight: "bold" }}>
                        {damageTypeToReadableText(damageType)}
                      </Typography>
                    </Box>
                  </TableCell>

                  <TableCell>
                    <Box>
                      <Typography variant="h6">{notes}</Typography>
                    </Box>
                  </TableCell>

                  <TableCell>
                    <Box>
                      <Box>
                        <Typography>{fullName}</Typography>
                      </Box>
                    </Box>
                  </TableCell>

                  <TableCell>
                    <Box>
                      <Box>{score && <Typography>{score} / 10 </Typography>}</Box>
                    </Box>
                  </TableCell>

                  <TableCell>
                    <Checkbox checked={published} disabled={true} />
                  </TableCell>

                  <TableCell>
                    <SinceDateField record={report} source="createdAt"></SinceDateField>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </Card>

      <ProductQAModal
        data={data}
        open={openModal}
        onSave={() => {
          setOpenModal(false)
          refresh()
        }}
        onClose={() => {
          setOpenModal(false)
        }}
      />
    </Box>
  )
}
