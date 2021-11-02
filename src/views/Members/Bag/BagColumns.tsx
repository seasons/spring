import { Box, styled } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import { DragDropContext } from "react-beautiful-dnd"
import { colors } from "theme/colors"
import { BagColumn } from "./BagColumn"

const columnData = {
  columns: {
    queued: {
      id: "queued",
      title: "Queued",
      bagItems: [],
      buttons: [{ id: "pickItems", title: "Pick items" }],
    },
    picked: {
      id: "picked",
      title: "Picked",
      bagItems: [],
      buttons: [{ id: "packItems", title: "Pack items" }],
    },
    packed: {
      id: "packed",
      title: "Packed",
      bagItems: [],
      buttons: [
        { id: "pickedUp", title: "Picked up" },
        { id: "printlabel", title: "Print label" },
      ],
    },
    shipped: {
      id: "shipped",
      title: "Shipped",
      bagItems: [],
      buttons: [{ id: "trackShippment", title: "Track shipment" }],
    },
    atHome: {
      id: "atHome",
      title: "At Home",
      bagItems: [],
      buttons: [{ id: "returnLabel", title: "Return label" }],
    },
    returnPending: {
      id: "returnPending",
      title: "Returning",
      bagItems: [],
      buttons: [],
    },
    customerToBusiness: {
      id: "customerToBusiness",
      title: "On the way back",
      bagItems: [],
      buttons: [{ id: "trackReturn", title: "Track return" }],
    },
  },
  columnOrder: ["queued", "picked", "packed", "shipped", "atHome", "returnPending", "customerToBusiness"],
}

export const BagColumns = ({ bagSections, setModalBagItems, setShowModal }) => {
  const [columnsWithItems, setColumnsWithItems] = useState(columnData.columns)

  useEffect(() => {
    // FIXME: Remove uniqueID once proper bagitems are passed
    let newObj = { ...columnData.columns }
    columnData.columnOrder.forEach(c => {
      newObj = {
        ...newObj,
        [c]: {
          ...newObj[c],
          bagItems: bagSections?.[1].bagItems.map((bi, index) => ({ ...bi, uniqueID: `${bi.id}-${index}-${c}` })),
        },
      }
    })

    setColumnsWithItems(newObj)
  }, [bagSections])

  const onDragEnd = result => {
    const { destination, source, draggableId } = result

    if (!destination) {
      return
    }

    const noChange = destination.droppableId === source.droppableId && destination.index === source.index
    if (noChange) {
      return
    }

    const sourceColumn = columnsWithItems[source.droppableId]
    const movedItem = sourceColumn.bagItems.find(item => item.uniqueID === draggableId)

    const newSourceBagItemsArray = Array.from(sourceColumn.bagItems)
    newSourceBagItemsArray.splice(source.index, 1)
    const newSourceColData = {
      ...sourceColumn,
      bagItems: newSourceBagItemsArray,
    }

    if (destination.droppableId === source.droppableId) {
      // Same column
      newSourceBagItemsArray.splice(destination.index, 0, movedItem)

      setColumnsWithItems({ ...columnsWithItems, [sourceColumn.id]: newSourceColData })
    } else {
      // We need to update two columns
      const destinationColumn = columnsWithItems[destination.droppableId]
      const newDestinationBagItemsArray = Array.from(destinationColumn.bagItems)
      newDestinationBagItemsArray.splice(destination.index, 0, movedItem)

      const newDestinationColData = {
        ...destinationColumn,
        bagItems: newDestinationBagItemsArray,
      }

      setColumnsWithItems({
        ...columnsWithItems,
        [sourceColumn.id]: newSourceColData,
        [destinationColumn.id]: newDestinationColData,
      })
    }
  }

  const onColumnButtonClick = (buttonId, bagItems) => {
    setModalBagItems(bagItems)

    switch (buttonId) {
      case "pickItems":
        return setShowModal("PickingModal")
      case "packItems":
        return setShowModal("PackingModal")
      case "pickedUp":
      case "printlabel":
      case "trackShippment":
      case "returnLabel":
      case "trackReturn":
        return null
      default:
        return null
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <FlexBox py={5}>
        {columnData.columnOrder.map((columnId, index) => {
          return (
            <BagColumn
              column={columnsWithItems[columnId]}
              key={index}
              index={index}
              onColumnButtonClick={onColumnButtonClick}
            />
          )
        })}
      </FlexBox>
    </DragDropContext>
  )
}

const FlexBox = styled(Box)({
  flex: 1,
  display: "flex",
  flexDirection: "row",
  flexWrap: "nowrap",
  overflowX: "auto",
  backgroundColor: colors.black04,
})
