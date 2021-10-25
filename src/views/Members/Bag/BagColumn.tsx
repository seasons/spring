import { Box, Typography, styled, Button } from "@material-ui/core"
import { Separator, Spacer } from "components"
import React from "react"
import { BagItemCard } from "./BagItemCard"
import { Droppable } from "react-beautiful-dnd"

export const BagColumn = ({ column, index, onColumnButtonClick }) => {
  const bagItems = column.bagItems
  const buttons = column.buttons

  return (
    <Wrapper mr={2} pl={index === 0 ? 2 : 0}>
      <FlexHeader>
        <Typography variant="h4">{column.title}</Typography>
        <Flex>
          {buttons.map((button, index) => {
            return (
              <Box key={index} ml={1}>
                <Button variant="contained" onClick={() => onColumnButtonClick(button.id, bagItems)}>
                  {button.title}
                </Button>
              </Box>
            )
          })}
        </Flex>
      </FlexHeader>
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

const Flex = styled(Box)({
  display: "flex",
  flexDirection: "row",
  flexWrap: "nowrap",
  alignItems: "center",
})

const FlexHeader = styled(Box)({
  display: "flex",
  flexDirection: "row",
  flexWrap: "nowrap",
  justifyContent: "space-between",
  alignItems: "center",
  height: "36px",
})
