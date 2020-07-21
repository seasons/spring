import React from "react"
import { Redirect } from "react-router-dom"
import { colors, Container, Theme } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"
import { BrandList } from "./Brands"
import { CategoryList } from "./Categories"
import { ProductList } from "./Products"
import { SizeList } from "./Sizes"
import { TagList } from "./Tags"

const useStyles = makeStyles<Theme>(theme => ({
  tabs: {
    marginTop: theme.spacing(3),
  },
  tab: {
    textTransform: "none",
  },
  divider: {
    backgroundColor: colors.grey[300],
  },
  content: {
    marginTop: theme.spacing(3),
  },
}))

export interface InventoryViewProps {
  history: any
  match: any
  props?: any
}

export const InventoryView: React.FunctionComponent<InventoryViewProps> = ({ match, history, props }) => {
  const classes = useStyles()
  const { tab: currentTab } = match.params

  const onNewProductBtnPressed = () => {
    history.push("/inventory/product/new")
  }

  if (!currentTab) {
    return <Redirect to={`/inventory/products`} />
  }

  return (
    <Container maxWidth={false}>
      <div className={classes.content}>
        {currentTab === "products" && (
          <ProductList
            {...props}
            basePath="/inventory/products"
            onNewProductBtnPressed={onNewProductBtnPressed}
            resource="Product"
          />
        )}
        {currentTab === "brands" && <BrandList {...props} basePath="/inventory/products" resource="Brand" />}
        {currentTab === "categories" && <CategoryList {...props} basePath="/inventory/products" resource="Category" />}
        {currentTab === "sizes" && <SizeList {...props} basePath="/inventory/sizes" resource="Size" />}
        {currentTab === "tags" && <TagList {...props} basePath="/inventory/tags" resource="Tag" />}
      </div>
    </Container>
  )
}
