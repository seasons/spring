import React from "react"
import { Typography, Box } from "@material-ui/core"

interface StowProductInfoReportsProps {
  product?: any
}

export const StowProductInfoReports: React.FC<StowProductInfoReportsProps> = ({ product }) => {
  return (
    <Box my={1} mt={2}>
      {product?.reports?.map((report, index) => {
        if (!report) {
          return null
        }
        // @ts-ignore
        const { damageTypes, notes } = report

        return (
          <Box key={index}>
            {damageTypes?.length > 0 && (
              <>
                <Typography variant="overline" color="textSecondary">
                  Damage Types
                </Typography>
                <Typography variant="body1">{damageTypes?.join(", ")}</Typography>
              </>
            )}
            {notes && notes.length > 0 && (
              <>
                <Typography variant="overline" color="textSecondary">
                  Notes
                </Typography>
                <Typography variant="body1">{notes}</Typography>
              </>
            )}
          </Box>
        )
      })}
    </Box>
  )
}
