import React, { useEffect, useState } from "react"
import { Button, Card, Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core"
import { Spacer } from "components"
import { Link as RouterLink } from "react-router-dom"
import { DateTime } from "luxon"

import { CardContent } from "components"

export const DraftProductList = () => {
  const [data, setData] = useState({})

  useEffect(() => {
    const cacheData = JSON.parse(localStorage.getItem("draftProducts") ?? "{}")
    setData(cacheData)
  }, [])

  const rows = Object.keys(data) ?? []

  return rows.length > 0 ? (
    <>
      <Card>
        <CardContent>
          <Table>
            <TableBody>
              {rows.map((key: string, i) => {
                const row = data[key]
                return (
                  <TableRow key={i}>
                    <TableCell>{row.brand?.label}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{DateTime.fromISO(row.lastModified).toLocaleString(DateTime.DATETIME_MED)}</TableCell>
                    <TableCell align="right">
                      <Button
                        component={RouterLink}
                        size="small"
                        to={`/inventory/product/new?cacheKey=${key}`}
                        variant="contained"
                        color="primary"
                      >
                        Finish Editing
                      </Button>

                      <Button
                        size="small"
                        variant="contained"
                        color="secondary"
                        onClick={() => {
                          let newData = { ...data }
                          delete newData[key]
                          localStorage.setItem("draftProducts", JSON.stringify(newData))
                          setData(newData)
                        }}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Spacer mt={2} />
    </>
  ) : (
    <></>
  )
}
