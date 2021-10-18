import { Box, styled } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import { DragDropContext } from "react-beautiful-dnd"
import { BagColumn } from "./BagColumn"

const columnData = {
  columns: {
    queued: {
      id: "queued",
      title: "Queued",
      bagItems: [],
    },
    picked: {
      id: "picked",
      title: "Picked",
      bagItems: [],
    },
    packed: {
      id: "packed",
      title: "Packed",
      bagItems: [],
    },
    shipped: {
      id: "shipped",
      title: "Shipped",
      bagItems: [],
    },
    atHome: {
      id: "atHome",
      title: "At Home",
      bagItems: [],
    },
    returning: {
      id: "returning",
      title: "Returning",
      bagItems: [],
    },
  },
  columnOrder: ["queued", "picked", "packed", "shipped", "atHome", "returning"],
}

export const BagColumns = ({ bagSections }) => {
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

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <FlexBox py={5}>
        {columnData.columnOrder.map((columnId, index) => {
          return <BagColumn column={columnsWithItems[columnId]} key={index} />
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
})
