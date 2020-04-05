import React from "react"
import { makeStyles } from "@material-ui/styles"
import PropTypes from "prop-types"
import { Redirect } from "react-router-dom"
import { Container, Theme, Tabs, Tab, Divider, colors } from "@material-ui/core"

import Header from "./Header"
import { ProductList } from "./Products"
import { BrandList } from "./Brands"
import { CategoryList } from "./Categories"
import { SizeList } from "./Sizes"
import { TagList } from "./Tags"

const useStyles = makeStyles<Theme>(theme => ({
  root: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
  tabs: {
    marginTop: theme.spacing(3),
  },
  divider: {
    backgroundColor: colors.grey[300],
  },
  content: {
    marginTop: theme.spacing(3),
  },
}))

function InventoryView({ match, history, props }) {
  const classes = useStyles()
  const { tab: currentTab } = match.params
  const tabs = [
    { value: "products", label: "Products" },
    { value: "brands", label: "Brands" },
    { value: "categories", label: "Categories" },
    { value: "sizes", label: "Sizes" },
    { value: "tags", label: "Tags" },
  ]

  const handleTabsChange = (event, value) => {
    history.push(value)
  }

  if (!currentTab) {
    return <Redirect to={`/inventory/products`} />
  }

  // if (!tabs.find((tab) => tab.value === currentTab)) {
  //   return <Redirect to="/errors/error-404" />;
  // }

  return (
    <Container maxWidth={false}>
      <Header />
      <Tabs
        className={classes.tabs}
        indicatorColor={"primary"}
        onChange={handleTabsChange}
        scrollButtons="auto"
        value={currentTab}
        variant="scrollable"
      >
        {tabs.map(tab => (
          <Tab key={tab.value} label={tab.label} value={tab.value} />
        ))}
      </Tabs>
      <Divider className={classes.divider} />
      <div className={classes.content}>
        {currentTab === "products" && <ProductList {...props} basePath="/inventory/products" resource="Product" />}
        {currentTab === "brands" && <BrandList {...props} basePath="/inventory/products" resource="Brand" />}
        {currentTab === "categories" && <CategoryList {...props} basePath="/inventory/products" resource="Category" />}
        {currentTab === "sizes" && <SizeList {...props} basePath="/inventory/sizes" resource="Size" />}
        {currentTab === "tags" && <TagList {...props} basePath="/inventory/tags" resource="Tag" />}
      </div>
    </Container>
  )
}

InventoryView.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
}

export default InventoryView
