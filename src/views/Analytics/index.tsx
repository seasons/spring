import React, { useState } from "react"

import { Box, MenuItem } from "@material-ui/core"
import { Select } from "@material-ui/core"
import { AnalyticsReport } from "components/AnalyticsReport"
import { AnalyticsViewType } from "generated/globalTypes"

export const AnalyticsView: React.FC = props => {
  const items = [
    { title: "Inventory Health", value: "/inventory-health", index: 4 },
    { title: "Inventory Health Detail", value: "/inventory-health/detail", index: 5 },
    { title: "Reactivations", value: "/sales/reactivations", index: 8 },
    ...[
      { month: "Jan", index: 23, year: "21" },
      { month: "Dec", index: 22, year: "20" },
      { month: "Nov", index: 21, year: "20" },
      { month: "Oct", index: 20, year: "20" },
      { month: "Sep", index: 19, year: "20" },
      { month: "Aug", index: 18, year: "20" },
      { month: "Jul", index: 17, year: "20" },
      { month: "Jun", index: 16, year: "20" },
      { month: "May", index: 15, year: "20" },
      { month: "Apr", index: 14, year: "20" },
      { month: "Mar", index: 13, year: "20" },
      { month: "Feb", index: 12, year: "20" },
      { month: "Jan", index: 11, year: "20" },
      { month: "Dec", index: 10, year: "19" },
      { month: "Nov", index: 9, year: "19" },
    ].map(a => ({
      value: `/${a.month.toLowerCase()}${a.year}`,
      index: a.index,
      title: `${a.month} ${a.year} Sales`,
    })),
  ]

  const [currentIndex, setCurrentIndex] = useState(0)

  const currentMenuItem = items[currentIndex]

  return (
    <Box height="100%">
      <Box m={2}>
        <Select
          label="Dashboard"
          variant="outlined"
          onChange={(event: any) => setCurrentIndex(event.target.value)}
          value={currentIndex}
          fullWidth
        >
          {items.map((item, i) => (
            <MenuItem value={i}>{item.title}</MenuItem>
          ))}
        </Select>
      </Box>
      <AnalyticsReport
        title={currentMenuItem.title}
        url={currentMenuItem.value}
        type={AnalyticsViewType.Dashboard}
        index={currentMenuItem.index}
      />
    </Box>
  )
}
