import { Button } from "@material-ui/core"
import { Box, TableHead, TableCell, Card, Table, TableRow, TableBody } from "@material-ui/core"
import { ProductQAModal } from "components/ProductQAModal"
import Typography from "material-ui/styles/typography"
import React, { useState } from "react"

export const PhysicalProductQAView = ({ data }) => {
  console.log(data)
  const [openModal, setOpenModal] = useState(false)
  return (
    <Box>
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
              <TableCell>Created At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              // logs.map(log => {
              //   const {
              //     action,
              //     activeAdminUser: { fullName },
              //     changedFields,
              //   } = log
              //   return (
              //     <TableRow>
              //       {/* When did it happen */}
              //       <TableCell>
              //         <SinceDateField record={log} source="triggeredAt"></SinceDateField>
              //       </TableCell>
              //       {/* Who did it */}
              //       <TableCell>
              //         <Box>
              //           <Box>
              //             <Typography>{fullName}</Typography>
              //           </Box>
              //         </Box>
              //       </TableCell>
              //       {/* What happened */}
              //       <TableCell>
              //         <Box>
              //           <Typography variant="h6" style={{ fontWeight: "bold" }}>
              //             {`${databaseActionToReadableActionMap[action]} Record`}
              //           </Typography>
              //         </Box>
              //       </TableCell>
              //       {/*Detail on what happened */}
              //       <TableCell>
              //         <Box>
              //           <Typography variant="h6" style={{ fontWeight: "bold" }}>
              //             {renderChangedFields(log)}
              //           </Typography>
              //         </Box>
              //       </TableCell>
              //     </TableRow>
              //   )
              // })
            }
          </TableBody>
        </Table>
      </Card>

      <ProductQAModal
        data={data}
        open={openModal}
        onSave={() => {}}
        onClose={() => {
          setOpenModal(false)
        }}
      />
    </Box>
  )
}
