/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PhotographyStatus, ProductType, LetterSize, PhysicalProductStatus, InventoryStatus, PhysicalProductOffloadMethod, ProductStatus, ProductArchitecture, ProductFit, SeasonCode, SeasonString } from "./globalTypes";

// ====================================================
// GraphQL fragment: ProductFragment
// ====================================================

export interface ProductFragment_images {
  __typename: "Image";
  url: string | null;
}

export interface ProductFragment_brand {
  __typename: "Brand";
  id: string;
  name: string;
}

export interface ProductFragment_category {
  __typename: "Category";
  id: string;
  name: string;
}

export interface ProductFragment_variants_internalSize_top {
  __typename: "TopSize";
  id: string;
  letter: LetterSize | null;
}

export interface ProductFragment_variants_internalSize_bottom {
  __typename: "BottomSize";
  id: string;
  value: string | null;
}

export interface ProductFragment_variants_internalSize {
  __typename: "Size";
  id: string;
  display: string;
  productType: ProductType | null;
  top: ProductFragment_variants_internalSize_top | null;
  bottom: ProductFragment_variants_internalSize_bottom | null;
}

export interface ProductFragment_variants_physicalProducts_warehouseLocation {
  __typename: "WarehouseLocation";
  id: string;
  barcode: string;
}

export interface ProductFragment_variants_physicalProducts {
  __typename: "PhysicalProduct";
  id: string;
  seasonsUID: string;
  barcode: string;
  barcoded: boolean;
  productStatus: PhysicalProductStatus;
  inventoryStatus: InventoryStatus;
  offloadMethod: PhysicalProductOffloadMethod | null;
  offloadNotes: string | null;
  warehouseLocation: ProductFragment_variants_physicalProducts_warehouseLocation | null;
}

export interface ProductFragment_variants {
  __typename: "ProductVariant";
  id: string;
  sku: string | null;
  internalSize: ProductFragment_variants_internalSize | null;
  physicalProducts: ProductFragment_variants_physicalProducts[] | null;
}

export interface ProductFragment_season_internalSeason {
  __typename: "Season";
  id: string;
  year: number | null;
  seasonCode: SeasonCode | null;
}

export interface ProductFragment_season_vendorSeason {
  __typename: "Season";
  id: string;
  year: number | null;
  seasonCode: SeasonCode | null;
}

export interface ProductFragment_season {
  __typename: "ProductSeason";
  id: string;
  internalSeason: ProductFragment_season_internalSeason | null;
  vendorSeason: ProductFragment_season_vendorSeason | null;
  wearableSeasons: SeasonString[];
}

export interface ProductFragment_color {
  __typename: "Color";
  id: string;
  colorCode: string;
  name: string;
}

export interface ProductFragment_functions {
  __typename: "ProductFunction";
  id: string;
  name: string | null;
}

export interface ProductFragment_materialCategory {
  __typename: "ProductMaterialCategory";
  id: string;
  slug: string;
}

export interface ProductFragment_model {
  __typename: "ProductModel";
  id: string;
  name: string;
}

export interface ProductFragment_modelSize {
  __typename: "Size";
  id: string;
  display: string;
}

export interface ProductFragment_secondaryColor {
  __typename: "Color";
  id: string;
  colorCode: string;
  name: string;
}

export interface ProductFragment_tags {
  __typename: "Tag";
  id: string;
  name: string;
}

export interface ProductFragment {
  __typename: "Product";
  id: string;
  name: string;
  slug: string;
  description: string | null;
  photographyStatus: PhotographyStatus | null;
  images: ProductFragment_images[];
  retailPrice: number | null;
  createdAt: any;
  updatedAt: any;
  publishedAt: any | null;
  brand: ProductFragment_brand;
  category: ProductFragment_category;
  variants: ProductFragment_variants[] | null;
  status: ProductStatus | null;
  externalURL: string | null;
  architecture: ProductArchitecture | null;
  innerMaterials: string[];
  outerMaterials: string[];
  type: ProductType | null;
  productFit: ProductFit | null;
  buyNewEnabled: boolean;
  season: ProductFragment_season | null;
  color: ProductFragment_color;
  functions: ProductFragment_functions[] | null;
  materialCategory: ProductFragment_materialCategory | null;
  model: ProductFragment_model | null;
  modelSize: ProductFragment_modelSize | null;
  secondaryColor: ProductFragment_secondaryColor | null;
  tags: ProductFragment_tags[];
}
