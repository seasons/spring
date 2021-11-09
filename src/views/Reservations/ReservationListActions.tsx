import * as React from "react"
import { cloneElement } from "react"
import { TopToolbar, Button, sanitizeListRestProps } from "@seasons/react-admin"
import InputIcon from "@material-ui/icons/Input"

export const ReservationListActions: React.FC<any> = ({
  currentSort,
  className,
  resource,
  filters,
  displayedFilters,
  exporter, // you can hide ExportButton if exporter = (null || false)
  filterValues,
  permanentFilter,
  hasCreate, // you can hide CreateButton if hasCreate = false
  basePath,
  selectedIds,
  onUnselectItems,
  showFilter,
  total,
  onClickLookupReservation,
  onClickProcessItemReturn,
  ...rest
}) => (
  <TopToolbar className={className} {...sanitizeListRestProps(rest)}>
    {filters &&
      cloneElement(filters, {
        resource,
        showFilter,
        displayedFilters,
        filterValues,
        context: "button",
      })}
    <Button
      onClick={() => {
        onClickLookupReservation?.()
      }}
      label="Lookup Reservation"
    >
      <InputIcon />
    </Button>
  </TopToolbar>
)

ReservationListActions.defaultProps = {
  selectedIds: [],
  onUnselectItems: () => null,
}
