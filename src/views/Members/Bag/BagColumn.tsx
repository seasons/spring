import { Box, Typography, styled } from "@material-ui/core"
import { Separator, Spacer } from "components"
import React from "react"
import { BagItemCard } from "./BagItemCard"
import { Droppable } from "react-beautiful-dnd"

export const BagColumn = ({ column }) => {
  const bagItems = column.bagItems

  return (
    <Wrapper mr={2}>
      <Typography variant="h4">{column.title}</Typography>
      <Spacer mb={1} />
      <Separator />
      <Spacer mb={2} />
      <Droppable droppableId={column.id}>
        {provided => {
          return (
            <Box ref={provided.innerRef} {...provided.droppableProps}>
              {bagItems?.map((bagItem, index) => {
                return <BagItemCard bagItem={bagItem} key={index} index={index} />
              })}
              {provided.placeholder}
            </Box>
          )
        }}
      </Droppable>
    </Wrapper>
  )
}

const Wrapper = styled(Box)({
  width: "343px",
  flex: "none",
})
