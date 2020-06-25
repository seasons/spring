import * as React from "react"
import { cloneElement } from "react"
import { TopToolbar, ExportButton, Button, sanitizeListRestProps } from "@seasons/react-admin"
import PrintIcon from "@material-ui/icons/Print"

export const ProductListActions: React.FC<any> = ({
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
  maxResults,
  total,
  onClickPrintBarcodes,
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
    <ExportButton
      disabled={total === 0}
      resource={resource}
      sort={currentSort}
      filter={{ ...filterValues, ...permanentFilter }}
      exporter={exporter}
      maxResults={maxResults}
    />
    {/* Add your custom actions */}
    <Button
      onClick={() => {
        onClickPrintBarcodes?.()
      }}
      label="Print Barcodes"
    >
      <PrintIcon />
    </Button>
  </TopToolbar>
)

ProductListActions.defaultProps = {
  selectedIds: [],
  onUnselectItems: () => null,
}
