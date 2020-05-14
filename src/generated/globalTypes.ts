/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum BagItemStatus {
  Added = "Added",
  Received = "Received",
  Reserved = "Reserved",
}

export enum BottomSizeType {
  EU = "EU",
  JP = "JP",
  Letter = "Letter",
  US = "US",
  WxL = "WxL",
}

export enum BrandTier {
  Boutique = "Boutique",
  Discovery = "Discovery",
  Local = "Local",
  Niche = "Niche",
  Retro = "Retro",
  Tier0 = "Tier0",
  Tier1 = "Tier1",
  Tier2 = "Tier2",
  Upcoming = "Upcoming",
}

export enum CustomerStatus {
  Active = "Active",
  Authorized = "Authorized",
  Created = "Created",
  Deactivated = "Deactivated",
  Invited = "Invited",
  Paused = "Paused",
  Suspended = "Suspended",
  Waitlisted = "Waitlisted",
}

export enum InventoryStatus {
  NonReservable = "NonReservable",
  Offloaded = "Offloaded",
  Reservable = "Reservable",
  Reserved = "Reserved",
  Stored = "Stored",
}

export enum InvoiceStatus {
  NotPaid = "NotPaid",
  Paid = "Paid",
  PaymentDue = "PaymentDue",
  Pending = "Pending",
  Posted = "Posted",
  Voided = "Voided",
}

export enum LetterSize {
  L = "L",
  M = "M",
  S = "S",
  XL = "XL",
  XS = "XS",
  XXL = "XXL",
}

export enum LocationType {
  Cleaner = "Cleaner",
  Customer = "Customer",
  Office = "Office",
  Warehouse = "Warehouse",
}

export enum PhysicalProductOffloadMethod {
  Recycled = "Recycled",
  ReturnedToVendor = "ReturnedToVendor",
  SoldToThirdParty = "SoldToThirdParty",
  SoldToUser = "SoldToUser",
  Unknown = "Unknown",
}

export enum PhysicalProductStatus {
  Clean = "Clean",
  Damaged = "Damaged",
  Lost = "Lost",
  New = "New",
  Used = "Used",
}

export enum Plan {
  AllAccess = "AllAccess",
  Essential = "Essential",
}

export enum ProductArchitecture {
  Fashion = "Fashion",
  Showstopper = "Showstopper",
  Staple = "Staple",
}

export enum ProductStatus {
  Available = "Available",
  NotAvailable = "NotAvailable",
  Offloaded = "Offloaded",
  Stored = "Stored",
}

export enum ProductType {
  Accessory = "Accessory",
  Bottom = "Bottom",
  Shoe = "Shoe",
  Top = "Top",
}

export enum PushNotificationStatus {
  Blocked = "Blocked",
  Denied = "Denied",
  Granted = "Granted",
}

export enum ReservationStatus {
  Cancelled = "Cancelled",
  Completed = "Completed",
  InQueue = "InQueue",
  InTransit = "InTransit",
  New = "New",
  OnHold = "OnHold",
  Packed = "Packed",
  Received = "Received",
  Shipped = "Shipped",
}

export enum UserRole {
  Admin = "Admin",
  Customer = "Customer",
  Partner = "Partner",
}

export enum WarehouseLocationType {
  Bin = "Bin",
  Conveyor = "Conveyor",
  Rail = "Rail",
}

export interface BagItemCreateWithoutCustomerInput {
  id?: string | null
  productVariant: ProductVariantCreateOneInput
  position?: number | null
  saved?: boolean | null
  status: BagItemStatus
}

export interface BagItemScalarWhereInput {
  id?: string | null
  id_not?: string | null
  id_in?: string[] | null
  id_not_in?: string[] | null
  id_lt?: string | null
  id_lte?: string | null
  id_gt?: string | null
  id_gte?: string | null
  id_contains?: string | null
  id_not_contains?: string | null
  id_starts_with?: string | null
  id_not_starts_with?: string | null
  id_ends_with?: string | null
  id_not_ends_with?: string | null
  position?: number | null
  position_not?: number | null
  position_in?: number[] | null
  position_not_in?: number[] | null
  position_lt?: number | null
  position_lte?: number | null
  position_gt?: number | null
  position_gte?: number | null
  saved?: boolean | null
  saved_not?: boolean | null
  status?: BagItemStatus | null
  status_not?: BagItemStatus | null
  status_in?: BagItemStatus[] | null
  status_not_in?: BagItemStatus[] | null
  AND?: BagItemScalarWhereInput[] | null
  OR?: BagItemScalarWhereInput[] | null
  NOT?: BagItemScalarWhereInput[] | null
}

export interface BagItemUpdateManyDataInput {
  position?: number | null
  saved?: boolean | null
  status?: BagItemStatus | null
}

export interface BagItemUpdateManyWithWhereNestedInput {
  where: BagItemScalarWhereInput
  data: BagItemUpdateManyDataInput
}

export interface BagItemUpdateManyWithoutCustomerInput {
  create?: BagItemCreateWithoutCustomerInput[] | null
  delete?: BagItemWhereUniqueInput[] | null
  connect?: BagItemWhereUniqueInput[] | null
  set?: BagItemWhereUniqueInput[] | null
  disconnect?: BagItemWhereUniqueInput[] | null
  update?: BagItemUpdateWithWhereUniqueWithoutCustomerInput[] | null
  upsert?: BagItemUpsertWithWhereUniqueWithoutCustomerInput[] | null
  deleteMany?: BagItemScalarWhereInput[] | null
  updateMany?: BagItemUpdateManyWithWhereNestedInput[] | null
}

export interface BagItemUpdateWithWhereUniqueWithoutCustomerInput {
  where: BagItemWhereUniqueInput
  data: BagItemUpdateWithoutCustomerDataInput
}

export interface BagItemUpdateWithoutCustomerDataInput {
  productVariant?: ProductVariantUpdateOneRequiredInput | null
  position?: number | null
  saved?: boolean | null
  status?: BagItemStatus | null
}

export interface BagItemUpsertWithWhereUniqueWithoutCustomerInput {
  where: BagItemWhereUniqueInput
  update: BagItemUpdateWithoutCustomerDataInput
  create: BagItemCreateWithoutCustomerInput
}

export interface BagItemWhereUniqueInput {
  id?: string | null
}

export interface BillingInfoCreateInput {
  id?: string | null
  brand: string
  name?: string | null
  last_digits: string
  expiration_month: number
  expiration_year: number
  street1?: string | null
  street2?: string | null
  city?: string | null
  state?: string | null
  country?: string | null
  postal_code?: string | null
}

export interface BillingInfoUpdateDataInput {
  brand?: string | null
  name?: string | null
  last_digits?: string | null
  expiration_month?: number | null
  expiration_year?: number | null
  street1?: string | null
  street2?: string | null
  city?: string | null
  state?: string | null
  country?: string | null
  postal_code?: string | null
}

export interface BillingInfoUpdateOneInput {
  create?: BillingInfoCreateInput | null
  update?: BillingInfoUpdateDataInput | null
  upsert?: BillingInfoUpsertNestedInput | null
  delete?: boolean | null
  disconnect?: boolean | null
  connect?: BillingInfoWhereUniqueInput | null
}

export interface BillingInfoUpsertNestedInput {
  update: BillingInfoUpdateDataInput
  create: BillingInfoCreateInput
}

export interface BillingInfoWhereUniqueInput {
  id?: string | null
}

export interface BottomSizeCreateInput {
  id?: string | null
  type?: BottomSizeType | null
  value?: string | null
  waist?: number | null
  rise?: number | null
  hem?: number | null
  inseam?: number | null
}

export interface BottomSizeCreateOneInput {
  create?: BottomSizeCreateInput | null
  connect?: BottomSizeWhereUniqueInput | null
}

export interface BottomSizeUpdateDataInput {
  type?: BottomSizeType | null
  value?: string | null
  waist?: number | null
  rise?: number | null
  hem?: number | null
  inseam?: number | null
}

export interface BottomSizeUpdateOneInput {
  create?: BottomSizeCreateInput | null
  update?: BottomSizeUpdateDataInput | null
  upsert?: BottomSizeUpsertNestedInput | null
  delete?: boolean | null
  disconnect?: boolean | null
  connect?: BottomSizeWhereUniqueInput | null
}

export interface BottomSizeUpsertNestedInput {
  update: BottomSizeUpdateDataInput
  create: BottomSizeCreateInput
}

export interface BottomSizeWhereUniqueInput {
  id?: string | null
}

export interface BrandCreateOneWithoutProductsInput {
  create?: BrandCreateWithoutProductsInput | null
  connect?: BrandWhereUniqueInput | null
}

export interface BrandCreateWithoutProductsInput {
  id?: string | null
  slug: string
  brandCode: string
  description?: string | null
  isPrimaryBrand?: boolean | null
  logo?: any | null
  name: string
  basedIn?: string | null
  since?: any | null
  tier: BrandTier
  websiteUrl?: string | null
}

export interface BrandUpdateOneRequiredWithoutProductsInput {
  create?: BrandCreateWithoutProductsInput | null
  update?: BrandUpdateWithoutProductsDataInput | null
  upsert?: BrandUpsertWithoutProductsInput | null
  connect?: BrandWhereUniqueInput | null
}

export interface BrandUpdateWithoutProductsDataInput {
  slug?: string | null
  brandCode?: string | null
  description?: string | null
  isPrimaryBrand?: boolean | null
  logo?: any | null
  name?: string | null
  basedIn?: string | null
  since?: any | null
  tier?: BrandTier | null
  websiteUrl?: string | null
}

export interface BrandUpsertWithoutProductsInput {
  update: BrandUpdateWithoutProductsDataInput
  create: BrandCreateWithoutProductsInput
}

export interface BrandWhereUniqueInput {
  id?: string | null
  slug?: string | null
  brandCode?: string | null
}

export interface CategoryCreateInput {
  id?: string | null
  slug: string
  name: string
  image?: any | null
  description?: string | null
  visible?: boolean | null
  products?: ProductCreateManyWithoutCategoryInput | null
  children?: CategoryCreateManyWithoutChildrenInput | null
}

export interface CategoryCreateManyWithoutChildrenInput {
  create?: CategoryCreateWithoutChildrenInput[] | null
  connect?: CategoryWhereUniqueInput[] | null
}

export interface CategoryCreateOneInput {
  create?: CategoryCreateInput | null
  connect?: CategoryWhereUniqueInput | null
}

export interface CategoryCreateOneWithoutProductsInput {
  create?: CategoryCreateWithoutProductsInput | null
  connect?: CategoryWhereUniqueInput | null
}

export interface CategoryCreateWithoutChildrenInput {
  id?: string | null
  slug: string
  name: string
  image?: any | null
  description?: string | null
  visible?: boolean | null
  products?: ProductCreateManyWithoutCategoryInput | null
}

export interface CategoryCreateWithoutProductsInput {
  id?: string | null
  slug: string
  name: string
  image?: any | null
  description?: string | null
  visible?: boolean | null
  children?: CategoryCreateManyWithoutChildrenInput | null
}

export interface CategoryScalarWhereInput {
  id?: string | null
  id_not?: string | null
  id_in?: string[] | null
  id_not_in?: string[] | null
  id_lt?: string | null
  id_lte?: string | null
  id_gt?: string | null
  id_gte?: string | null
  id_contains?: string | null
  id_not_contains?: string | null
  id_starts_with?: string | null
  id_not_starts_with?: string | null
  id_ends_with?: string | null
  id_not_ends_with?: string | null
  slug?: string | null
  slug_not?: string | null
  slug_in?: string[] | null
  slug_not_in?: string[] | null
  slug_lt?: string | null
  slug_lte?: string | null
  slug_gt?: string | null
  slug_gte?: string | null
  slug_contains?: string | null
  slug_not_contains?: string | null
  slug_starts_with?: string | null
  slug_not_starts_with?: string | null
  slug_ends_with?: string | null
  slug_not_ends_with?: string | null
  name?: string | null
  name_not?: string | null
  name_in?: string[] | null
  name_not_in?: string[] | null
  name_lt?: string | null
  name_lte?: string | null
  name_gt?: string | null
  name_gte?: string | null
  name_contains?: string | null
  name_not_contains?: string | null
  name_starts_with?: string | null
  name_not_starts_with?: string | null
  name_ends_with?: string | null
  name_not_ends_with?: string | null
  description?: string | null
  description_not?: string | null
  description_in?: string[] | null
  description_not_in?: string[] | null
  description_lt?: string | null
  description_lte?: string | null
  description_gt?: string | null
  description_gte?: string | null
  description_contains?: string | null
  description_not_contains?: string | null
  description_starts_with?: string | null
  description_not_starts_with?: string | null
  description_ends_with?: string | null
  description_not_ends_with?: string | null
  visible?: boolean | null
  visible_not?: boolean | null
  AND?: CategoryScalarWhereInput[] | null
  OR?: CategoryScalarWhereInput[] | null
  NOT?: CategoryScalarWhereInput[] | null
}

export interface CategoryUpdateDataInput {
  slug?: string | null
  name?: string | null
  image?: any | null
  description?: string | null
  visible?: boolean | null
  products?: ProductUpdateManyWithoutCategoryInput | null
  children?: CategoryUpdateManyWithoutChildrenInput | null
}

export interface CategoryUpdateManyDataInput {
  slug?: string | null
  name?: string | null
  image?: any | null
  description?: string | null
  visible?: boolean | null
}

export interface CategoryUpdateManyWithWhereNestedInput {
  where: CategoryScalarWhereInput
  data: CategoryUpdateManyDataInput
}

export interface CategoryUpdateManyWithoutChildrenInput {
  create?: CategoryCreateWithoutChildrenInput[] | null
  delete?: CategoryWhereUniqueInput[] | null
  connect?: CategoryWhereUniqueInput[] | null
  set?: CategoryWhereUniqueInput[] | null
  disconnect?: CategoryWhereUniqueInput[] | null
  update?: CategoryUpdateWithWhereUniqueWithoutChildrenInput[] | null
  upsert?: CategoryUpsertWithWhereUniqueWithoutChildrenInput[] | null
  deleteMany?: CategoryScalarWhereInput[] | null
  updateMany?: CategoryUpdateManyWithWhereNestedInput[] | null
}

export interface CategoryUpdateOneRequiredInput {
  create?: CategoryCreateInput | null
  update?: CategoryUpdateDataInput | null
  upsert?: CategoryUpsertNestedInput | null
  connect?: CategoryWhereUniqueInput | null
}

export interface CategoryUpdateOneRequiredWithoutProductsInput {
  create?: CategoryCreateWithoutProductsInput | null
  update?: CategoryUpdateWithoutProductsDataInput | null
  upsert?: CategoryUpsertWithoutProductsInput | null
  connect?: CategoryWhereUniqueInput | null
}

export interface CategoryUpdateWithWhereUniqueWithoutChildrenInput {
  where: CategoryWhereUniqueInput
  data: CategoryUpdateWithoutChildrenDataInput
}

export interface CategoryUpdateWithoutChildrenDataInput {
  slug?: string | null
  name?: string | null
  image?: any | null
  description?: string | null
  visible?: boolean | null
  products?: ProductUpdateManyWithoutCategoryInput | null
}

export interface CategoryUpdateWithoutProductsDataInput {
  slug?: string | null
  name?: string | null
  image?: any | null
  description?: string | null
  visible?: boolean | null
  children?: CategoryUpdateManyWithoutChildrenInput | null
}

export interface CategoryUpsertNestedInput {
  update: CategoryUpdateDataInput
  create: CategoryCreateInput
}

export interface CategoryUpsertWithWhereUniqueWithoutChildrenInput {
  where: CategoryWhereUniqueInput
  update: CategoryUpdateWithoutChildrenDataInput
  create: CategoryCreateWithoutChildrenInput
}

export interface CategoryUpsertWithoutProductsInput {
  update: CategoryUpdateWithoutProductsDataInput
  create: CategoryCreateWithoutProductsInput
}

export interface CategoryWhereUniqueInput {
  id?: string | null
  slug?: string | null
  name?: string | null
}

export interface ColorCreateInput {
  id?: string | null
  slug: string
  name: string
  colorCode: string
  hexCode: string
  productVariants?: ProductVariantCreateManyWithoutColorInput | null
}

export interface ColorCreateOneInput {
  create?: ColorCreateInput | null
  connect?: ColorWhereUniqueInput | null
}

export interface ColorCreateOneWithoutProductVariantsInput {
  create?: ColorCreateWithoutProductVariantsInput | null
  connect?: ColorWhereUniqueInput | null
}

export interface ColorCreateWithoutProductVariantsInput {
  id?: string | null
  slug: string
  name: string
  colorCode: string
  hexCode: string
}

export interface ColorUpdateDataInput {
  slug?: string | null
  name?: string | null
  colorCode?: string | null
  hexCode?: string | null
  productVariants?: ProductVariantUpdateManyWithoutColorInput | null
}

export interface ColorUpdateOneInput {
  create?: ColorCreateInput | null
  update?: ColorUpdateDataInput | null
  upsert?: ColorUpsertNestedInput | null
  delete?: boolean | null
  disconnect?: boolean | null
  connect?: ColorWhereUniqueInput | null
}

export interface ColorUpdateOneRequiredInput {
  create?: ColorCreateInput | null
  update?: ColorUpdateDataInput | null
  upsert?: ColorUpsertNestedInput | null
  connect?: ColorWhereUniqueInput | null
}

export interface ColorUpdateOneRequiredWithoutProductVariantsInput {
  create?: ColorCreateWithoutProductVariantsInput | null
  update?: ColorUpdateWithoutProductVariantsDataInput | null
  upsert?: ColorUpsertWithoutProductVariantsInput | null
  connect?: ColorWhereUniqueInput | null
}

export interface ColorUpdateWithoutProductVariantsDataInput {
  slug?: string | null
  name?: string | null
  colorCode?: string | null
  hexCode?: string | null
}

export interface ColorUpsertNestedInput {
  update: ColorUpdateDataInput
  create: ColorCreateInput
}

export interface ColorUpsertWithoutProductVariantsInput {
  update: ColorUpdateWithoutProductVariantsDataInput
  create: ColorCreateWithoutProductVariantsInput
}

export interface ColorWhereUniqueInput {
  id?: string | null
  slug?: string | null
  colorCode?: string | null
}

export interface CustomerDetailCreateInput {
  id?: string | null
  phoneNumber?: string | null
  birthday?: any | null
  height?: number | null
  weight?: string | null
  bodyType?: string | null
  averageTopSize?: string | null
  averageWaistSize?: string | null
  averagePantLength?: string | null
  preferredPronouns?: string | null
  profession?: string | null
  partyFrequency?: string | null
  travelFrequency?: string | null
  shoppingFrequency?: string | null
  averageSpend?: string | null
  style?: string | null
  commuteStyle?: string | null
  shippingAddress?: LocationCreateOneInput | null
  phoneOS?: string | null
  insureShipment?: boolean | null
}

export interface CustomerDetailUpdateDataInput {
  phoneNumber?: string | null
  birthday?: any | null
  height?: number | null
  weight?: string | null
  bodyType?: string | null
  averageTopSize?: string | null
  averageWaistSize?: string | null
  averagePantLength?: string | null
  preferredPronouns?: string | null
  profession?: string | null
  partyFrequency?: string | null
  travelFrequency?: string | null
  shoppingFrequency?: string | null
  averageSpend?: string | null
  style?: string | null
  commuteStyle?: string | null
  shippingAddress?: LocationUpdateOneInput | null
  phoneOS?: string | null
  insureShipment?: boolean | null
}

export interface CustomerDetailUpdateOneInput {
  create?: CustomerDetailCreateInput | null
  update?: CustomerDetailUpdateDataInput | null
  upsert?: CustomerDetailUpsertNestedInput | null
  delete?: boolean | null
  disconnect?: boolean | null
  connect?: CustomerDetailWhereUniqueInput | null
}

export interface CustomerDetailUpsertNestedInput {
  update: CustomerDetailUpdateDataInput
  create: CustomerDetailCreateInput
}

export interface CustomerDetailWhereUniqueInput {
  id?: string | null
}

export interface CustomerUpdateInput {
  user?: UserUpdateOneRequiredInput | null
  status?: CustomerStatus | null
  detail?: CustomerDetailUpdateOneInput | null
  billingInfo?: BillingInfoUpdateOneInput | null
  plan?: Plan | null
  bagItems?: BagItemUpdateManyWithoutCustomerInput | null
  reservations?: ReservationUpdateManyWithoutCustomerInput | null
}

export interface ImageCreateInput {
  id?: string | null
  caption?: string | null
  url?: string | null
  height?: number | null
  width?: number | null
  title?: string | null
}

export interface ImageCreateManyInput {
  create?: ImageCreateInput[] | null
  connect?: ImageWhereUniqueInput[] | null
}

export interface ImageScalarWhereInput {
  id?: string | null
  id_not?: string | null
  id_in?: string[] | null
  id_not_in?: string[] | null
  id_lt?: string | null
  id_lte?: string | null
  id_gt?: string | null
  id_gte?: string | null
  id_contains?: string | null
  id_not_contains?: string | null
  id_starts_with?: string | null
  id_not_starts_with?: string | null
  id_ends_with?: string | null
  id_not_ends_with?: string | null
  caption?: string | null
  caption_not?: string | null
  caption_in?: string[] | null
  caption_not_in?: string[] | null
  caption_lt?: string | null
  caption_lte?: string | null
  caption_gt?: string | null
  caption_gte?: string | null
  caption_contains?: string | null
  caption_not_contains?: string | null
  caption_starts_with?: string | null
  caption_not_starts_with?: string | null
  caption_ends_with?: string | null
  caption_not_ends_with?: string | null
  url?: string | null
  url_not?: string | null
  url_in?: string[] | null
  url_not_in?: string[] | null
  url_lt?: string | null
  url_lte?: string | null
  url_gt?: string | null
  url_gte?: string | null
  url_contains?: string | null
  url_not_contains?: string | null
  url_starts_with?: string | null
  url_not_starts_with?: string | null
  url_ends_with?: string | null
  url_not_ends_with?: string | null
  height?: number | null
  height_not?: number | null
  height_in?: number[] | null
  height_not_in?: number[] | null
  height_lt?: number | null
  height_lte?: number | null
  height_gt?: number | null
  height_gte?: number | null
  width?: number | null
  width_not?: number | null
  width_in?: number[] | null
  width_not_in?: number[] | null
  width_lt?: number | null
  width_lte?: number | null
  width_gt?: number | null
  width_gte?: number | null
  title?: string | null
  title_not?: string | null
  title_in?: string[] | null
  title_not_in?: string[] | null
  title_lt?: string | null
  title_lte?: string | null
  title_gt?: string | null
  title_gte?: string | null
  title_contains?: string | null
  title_not_contains?: string | null
  title_starts_with?: string | null
  title_not_starts_with?: string | null
  title_ends_with?: string | null
  title_not_ends_with?: string | null
  createdAt?: any | null
  createdAt_not?: any | null
  createdAt_in?: any[] | null
  createdAt_not_in?: any[] | null
  createdAt_lt?: any | null
  createdAt_lte?: any | null
  createdAt_gt?: any | null
  createdAt_gte?: any | null
  updatedAt?: any | null
  updatedAt_not?: any | null
  updatedAt_in?: any[] | null
  updatedAt_not_in?: any[] | null
  updatedAt_lt?: any | null
  updatedAt_lte?: any | null
  updatedAt_gt?: any | null
  updatedAt_gte?: any | null
  AND?: ImageScalarWhereInput[] | null
  OR?: ImageScalarWhereInput[] | null
  NOT?: ImageScalarWhereInput[] | null
}

export interface ImageUpdateDataInput {
  caption?: string | null
  url?: string | null
  height?: number | null
  width?: number | null
  title?: string | null
}

export interface ImageUpdateManyDataInput {
  caption?: string | null
  url?: string | null
  height?: number | null
  width?: number | null
  title?: string | null
}

export interface ImageUpdateManyInput {
  create?: ImageCreateInput[] | null
  update?: ImageUpdateWithWhereUniqueNestedInput[] | null
  upsert?: ImageUpsertWithWhereUniqueNestedInput[] | null
  delete?: ImageWhereUniqueInput[] | null
  connect?: ImageWhereUniqueInput[] | null
  set?: ImageWhereUniqueInput[] | null
  disconnect?: ImageWhereUniqueInput[] | null
  deleteMany?: ImageScalarWhereInput[] | null
  updateMany?: ImageUpdateManyWithWhereNestedInput[] | null
}

export interface ImageUpdateManyWithWhereNestedInput {
  where: ImageScalarWhereInput
  data: ImageUpdateManyDataInput
}

export interface ImageUpdateWithWhereUniqueNestedInput {
  where: ImageWhereUniqueInput
  data: ImageUpdateDataInput
}

export interface ImageUpsertWithWhereUniqueNestedInput {
  where: ImageWhereUniqueInput
  update: ImageUpdateDataInput
  create: ImageCreateInput
}

export interface ImageWhereUniqueInput {
  id?: string | null
  url?: string | null
}

export interface LabelCreateInput {
  id?: string | null
  name?: string | null
  image?: string | null
  trackingNumber?: string | null
  trackingURL?: string | null
}

export interface LabelCreateOneInput {
  create?: LabelCreateInput | null
  connect?: LabelWhereUniqueInput | null
}

export interface LabelUpdateDataInput {
  name?: string | null
  image?: string | null
  trackingNumber?: string | null
  trackingURL?: string | null
}

export interface LabelUpdateOneRequiredInput {
  create?: LabelCreateInput | null
  update?: LabelUpdateDataInput | null
  upsert?: LabelUpsertNestedInput | null
  connect?: LabelWhereUniqueInput | null
}

export interface LabelUpsertNestedInput {
  update: LabelUpdateDataInput
  create: LabelCreateInput
}

export interface LabelWhereUniqueInput {
  id?: string | null
}

export interface LocationCreateInput {
  id?: string | null
  slug: string
  name: string
  company?: string | null
  description?: string | null
  address1: string
  address2?: string | null
  city: string
  state: string
  zipCode: string
  locationType?: LocationType | null
  user?: UserCreateOneInput | null
  lat?: number | null
  lng?: number | null
  physicalProducts?: PhysicalProductCreateManyWithoutLocationInput | null
}

export interface LocationCreateOneInput {
  create?: LocationCreateInput | null
  connect?: LocationWhereUniqueInput | null
}

export interface LocationCreateOneWithoutPhysicalProductsInput {
  create?: LocationCreateWithoutPhysicalProductsInput | null
  connect?: LocationWhereUniqueInput | null
}

export interface LocationCreateWithoutPhysicalProductsInput {
  id?: string | null
  slug: string
  name: string
  company?: string | null
  description?: string | null
  address1: string
  address2?: string | null
  city: string
  state: string
  zipCode: string
  locationType?: LocationType | null
  user?: UserCreateOneInput | null
  lat?: number | null
  lng?: number | null
}

export interface LocationUpdateDataInput {
  slug?: string | null
  name?: string | null
  company?: string | null
  description?: string | null
  address1?: string | null
  address2?: string | null
  city?: string | null
  state?: string | null
  zipCode?: string | null
  locationType?: LocationType | null
  user?: UserUpdateOneInput | null
  lat?: number | null
  lng?: number | null
  physicalProducts?: PhysicalProductUpdateManyWithoutLocationInput | null
}

export interface LocationUpdateOneInput {
  create?: LocationCreateInput | null
  update?: LocationUpdateDataInput | null
  upsert?: LocationUpsertNestedInput | null
  delete?: boolean | null
  disconnect?: boolean | null
  connect?: LocationWhereUniqueInput | null
}

export interface LocationUpdateOneRequiredInput {
  create?: LocationCreateInput | null
  update?: LocationUpdateDataInput | null
  upsert?: LocationUpsertNestedInput | null
  connect?: LocationWhereUniqueInput | null
}

export interface LocationUpdateOneWithoutPhysicalProductsInput {
  create?: LocationCreateWithoutPhysicalProductsInput | null
  update?: LocationUpdateWithoutPhysicalProductsDataInput | null
  upsert?: LocationUpsertWithoutPhysicalProductsInput | null
  delete?: boolean | null
  disconnect?: boolean | null
  connect?: LocationWhereUniqueInput | null
}

export interface LocationUpdateWithoutPhysicalProductsDataInput {
  slug?: string | null
  name?: string | null
  company?: string | null
  description?: string | null
  address1?: string | null
  address2?: string | null
  city?: string | null
  state?: string | null
  zipCode?: string | null
  locationType?: LocationType | null
  user?: UserUpdateOneInput | null
  lat?: number | null
  lng?: number | null
}

export interface LocationUpsertNestedInput {
  update: LocationUpdateDataInput
  create: LocationCreateInput
}

export interface LocationUpsertWithoutPhysicalProductsInput {
  update: LocationUpdateWithoutPhysicalProductsDataInput
  create: LocationCreateWithoutPhysicalProductsInput
}

export interface LocationWhereUniqueInput {
  id?: string | null
  slug?: string | null
}

export interface PackageCreateInput {
  id?: string | null
  items?: PhysicalProductCreateManyInput | null
  shippingLabel: LabelCreateOneInput
  fromAddress: LocationCreateOneInput
  toAddress: LocationCreateOneInput
  weight?: number | null
}

export interface PackageCreateOneInput {
  create?: PackageCreateInput | null
  connect?: PackageWhereUniqueInput | null
}

export interface PackageUpdateDataInput {
  items?: PhysicalProductUpdateManyInput | null
  shippingLabel?: LabelUpdateOneRequiredInput | null
  fromAddress?: LocationUpdateOneRequiredInput | null
  toAddress?: LocationUpdateOneRequiredInput | null
  weight?: number | null
}

export interface PackageUpdateOneInput {
  create?: PackageCreateInput | null
  update?: PackageUpdateDataInput | null
  upsert?: PackageUpsertNestedInput | null
  delete?: boolean | null
  disconnect?: boolean | null
  connect?: PackageWhereUniqueInput | null
}

export interface PackageUpsertNestedInput {
  update: PackageUpdateDataInput
  create: PackageCreateInput
}

export interface PackageWhereUniqueInput {
  id?: string | null
}

export interface PhysicalProductCreateInput {
  id?: string | null
  seasonsUID: string
  location?: LocationCreateOneWithoutPhysicalProductsInput | null
  productVariant: ProductVariantCreateOneWithoutPhysicalProductsInput
  inventoryStatus: InventoryStatus
  productStatus: PhysicalProductStatus
  offloadMethod?: PhysicalProductOffloadMethod | null
  offloadNotes?: string | null
  sequenceNumber: number
  warehouseLocation?: WarehouseLocationCreateOneWithoutPhysicalProductsInput | null
}

export interface PhysicalProductCreateManyInput {
  create?: PhysicalProductCreateInput[] | null
  connect?: PhysicalProductWhereUniqueInput[] | null
}

export interface PhysicalProductCreateManyWithoutLocationInput {
  create?: PhysicalProductCreateWithoutLocationInput[] | null
  connect?: PhysicalProductWhereUniqueInput[] | null
}

export interface PhysicalProductCreateManyWithoutProductVariantInput {
  create?: PhysicalProductCreateWithoutProductVariantInput[] | null
  connect?: PhysicalProductWhereUniqueInput[] | null
}

export interface PhysicalProductCreateWithoutLocationInput {
  id?: string | null
  seasonsUID: string
  productVariant: ProductVariantCreateOneWithoutPhysicalProductsInput
  inventoryStatus: InventoryStatus
  productStatus: PhysicalProductStatus
  offloadMethod?: PhysicalProductOffloadMethod | null
  offloadNotes?: string | null
  sequenceNumber: number
  warehouseLocation?: WarehouseLocationCreateOneWithoutPhysicalProductsInput | null
}

export interface PhysicalProductCreateWithoutProductVariantInput {
  id?: string | null
  seasonsUID: string
  location?: LocationCreateOneWithoutPhysicalProductsInput | null
  inventoryStatus: InventoryStatus
  productStatus: PhysicalProductStatus
  offloadMethod?: PhysicalProductOffloadMethod | null
  offloadNotes?: string | null
  sequenceNumber: number
  warehouseLocation?: WarehouseLocationCreateOneWithoutPhysicalProductsInput | null
}

export interface PhysicalProductScalarWhereInput {
  id?: string | null
  id_not?: string | null
  id_in?: string[] | null
  id_not_in?: string[] | null
  id_lt?: string | null
  id_lte?: string | null
  id_gt?: string | null
  id_gte?: string | null
  id_contains?: string | null
  id_not_contains?: string | null
  id_starts_with?: string | null
  id_not_starts_with?: string | null
  id_ends_with?: string | null
  id_not_ends_with?: string | null
  seasonsUID?: string | null
  seasonsUID_not?: string | null
  seasonsUID_in?: string[] | null
  seasonsUID_not_in?: string[] | null
  seasonsUID_lt?: string | null
  seasonsUID_lte?: string | null
  seasonsUID_gt?: string | null
  seasonsUID_gte?: string | null
  seasonsUID_contains?: string | null
  seasonsUID_not_contains?: string | null
  seasonsUID_starts_with?: string | null
  seasonsUID_not_starts_with?: string | null
  seasonsUID_ends_with?: string | null
  seasonsUID_not_ends_with?: string | null
  inventoryStatus?: InventoryStatus | null
  inventoryStatus_not?: InventoryStatus | null
  inventoryStatus_in?: InventoryStatus[] | null
  inventoryStatus_not_in?: InventoryStatus[] | null
  productStatus?: PhysicalProductStatus | null
  productStatus_not?: PhysicalProductStatus | null
  productStatus_in?: PhysicalProductStatus[] | null
  productStatus_not_in?: PhysicalProductStatus[] | null
  offloadMethod?: PhysicalProductOffloadMethod | null
  offloadMethod_not?: PhysicalProductOffloadMethod | null
  offloadMethod_in?: PhysicalProductOffloadMethod[] | null
  offloadMethod_not_in?: PhysicalProductOffloadMethod[] | null
  offloadNotes?: string | null
  offloadNotes_not?: string | null
  offloadNotes_in?: string[] | null
  offloadNotes_not_in?: string[] | null
  offloadNotes_lt?: string | null
  offloadNotes_lte?: string | null
  offloadNotes_gt?: string | null
  offloadNotes_gte?: string | null
  offloadNotes_contains?: string | null
  offloadNotes_not_contains?: string | null
  offloadNotes_starts_with?: string | null
  offloadNotes_not_starts_with?: string | null
  offloadNotes_ends_with?: string | null
  offloadNotes_not_ends_with?: string | null
  sequenceNumber?: number | null
  sequenceNumber_not?: number | null
  sequenceNumber_in?: number[] | null
  sequenceNumber_not_in?: number[] | null
  sequenceNumber_lt?: number | null
  sequenceNumber_lte?: number | null
  sequenceNumber_gt?: number | null
  sequenceNumber_gte?: number | null
  createdAt?: any | null
  createdAt_not?: any | null
  createdAt_in?: any[] | null
  createdAt_not_in?: any[] | null
  createdAt_lt?: any | null
  createdAt_lte?: any | null
  createdAt_gt?: any | null
  createdAt_gte?: any | null
  updatedAt?: any | null
  updatedAt_not?: any | null
  updatedAt_in?: any[] | null
  updatedAt_not_in?: any[] | null
  updatedAt_lt?: any | null
  updatedAt_lte?: any | null
  updatedAt_gt?: any | null
  updatedAt_gte?: any | null
  AND?: PhysicalProductScalarWhereInput[] | null
  OR?: PhysicalProductScalarWhereInput[] | null
  NOT?: PhysicalProductScalarWhereInput[] | null
}

export interface PhysicalProductUpdateDataInput {
  seasonsUID?: string | null
  location?: LocationUpdateOneWithoutPhysicalProductsInput | null
  productVariant?: ProductVariantUpdateOneRequiredWithoutPhysicalProductsInput | null
  inventoryStatus?: InventoryStatus | null
  productStatus?: PhysicalProductStatus | null
  offloadMethod?: PhysicalProductOffloadMethod | null
  offloadNotes?: string | null
  sequenceNumber?: number | null
  warehouseLocation?: WarehouseLocationUpdateOneWithoutPhysicalProductsInput | null
}

export interface PhysicalProductUpdateManyDataInput {
  seasonsUID?: string | null
  inventoryStatus?: InventoryStatus | null
  productStatus?: PhysicalProductStatus | null
  offloadMethod?: PhysicalProductOffloadMethod | null
  offloadNotes?: string | null
  sequenceNumber?: number | null
}

export interface PhysicalProductUpdateManyInput {
  create?: PhysicalProductCreateInput[] | null
  update?: PhysicalProductUpdateWithWhereUniqueNestedInput[] | null
  upsert?: PhysicalProductUpsertWithWhereUniqueNestedInput[] | null
  delete?: PhysicalProductWhereUniqueInput[] | null
  connect?: PhysicalProductWhereUniqueInput[] | null
  set?: PhysicalProductWhereUniqueInput[] | null
  disconnect?: PhysicalProductWhereUniqueInput[] | null
  deleteMany?: PhysicalProductScalarWhereInput[] | null
  updateMany?: PhysicalProductUpdateManyWithWhereNestedInput[] | null
}

export interface PhysicalProductUpdateManyWithWhereNestedInput {
  where: PhysicalProductScalarWhereInput
  data: PhysicalProductUpdateManyDataInput
}

export interface PhysicalProductUpdateManyWithoutLocationInput {
  create?: PhysicalProductCreateWithoutLocationInput[] | null
  delete?: PhysicalProductWhereUniqueInput[] | null
  connect?: PhysicalProductWhereUniqueInput[] | null
  set?: PhysicalProductWhereUniqueInput[] | null
  disconnect?: PhysicalProductWhereUniqueInput[] | null
  update?: PhysicalProductUpdateWithWhereUniqueWithoutLocationInput[] | null
  upsert?: PhysicalProductUpsertWithWhereUniqueWithoutLocationInput[] | null
  deleteMany?: PhysicalProductScalarWhereInput[] | null
  updateMany?: PhysicalProductUpdateManyWithWhereNestedInput[] | null
}

export interface PhysicalProductUpdateManyWithoutProductVariantInput {
  create?: PhysicalProductCreateWithoutProductVariantInput[] | null
  delete?: PhysicalProductWhereUniqueInput[] | null
  connect?: PhysicalProductWhereUniqueInput[] | null
  set?: PhysicalProductWhereUniqueInput[] | null
  disconnect?: PhysicalProductWhereUniqueInput[] | null
  update?: PhysicalProductUpdateWithWhereUniqueWithoutProductVariantInput[] | null
  upsert?: PhysicalProductUpsertWithWhereUniqueWithoutProductVariantInput[] | null
  deleteMany?: PhysicalProductScalarWhereInput[] | null
  updateMany?: PhysicalProductUpdateManyWithWhereNestedInput[] | null
}

export interface PhysicalProductUpdateWithWhereUniqueNestedInput {
  where: PhysicalProductWhereUniqueInput
  data: PhysicalProductUpdateDataInput
}

export interface PhysicalProductUpdateWithWhereUniqueWithoutLocationInput {
  where: PhysicalProductWhereUniqueInput
  data: PhysicalProductUpdateWithoutLocationDataInput
}

export interface PhysicalProductUpdateWithWhereUniqueWithoutProductVariantInput {
  where: PhysicalProductWhereUniqueInput
  data: PhysicalProductUpdateWithoutProductVariantDataInput
}

export interface PhysicalProductUpdateWithoutLocationDataInput {
  seasonsUID?: string | null
  productVariant?: ProductVariantUpdateOneRequiredWithoutPhysicalProductsInput | null
  inventoryStatus?: InventoryStatus | null
  productStatus?: PhysicalProductStatus | null
  offloadMethod?: PhysicalProductOffloadMethod | null
  offloadNotes?: string | null
  sequenceNumber?: number | null
  warehouseLocation?: WarehouseLocationUpdateOneWithoutPhysicalProductsInput | null
}

export interface PhysicalProductUpdateWithoutProductVariantDataInput {
  seasonsUID?: string | null
  location?: LocationUpdateOneWithoutPhysicalProductsInput | null
  inventoryStatus?: InventoryStatus | null
  productStatus?: PhysicalProductStatus | null
  offloadMethod?: PhysicalProductOffloadMethod | null
  offloadNotes?: string | null
  sequenceNumber?: number | null
  warehouseLocation?: WarehouseLocationUpdateOneWithoutPhysicalProductsInput | null
}

export interface PhysicalProductUpsertWithWhereUniqueNestedInput {
  where: PhysicalProductWhereUniqueInput
  update: PhysicalProductUpdateDataInput
  create: PhysicalProductCreateInput
}

export interface PhysicalProductUpsertWithWhereUniqueWithoutLocationInput {
  where: PhysicalProductWhereUniqueInput
  update: PhysicalProductUpdateWithoutLocationDataInput
  create: PhysicalProductCreateWithoutLocationInput
}

export interface PhysicalProductUpsertWithWhereUniqueWithoutProductVariantInput {
  where: PhysicalProductWhereUniqueInput
  update: PhysicalProductUpdateWithoutProductVariantDataInput
  create: PhysicalProductCreateWithoutProductVariantInput
}

export interface PhysicalProductWhereUniqueInput {
  id?: string | null
  seasonsUID?: string | null
}

export interface ProductCreateManyWithoutCategoryInput {
  create?: ProductCreateWithoutCategoryInput[] | null
  connect?: ProductWhereUniqueInput[] | null
}

export interface ProductCreateOneWithoutVariantsInput {
  create?: ProductCreateWithoutVariantsInput | null
  connect?: ProductWhereUniqueInput | null
}

export interface ProductCreateWithoutCategoryInput {
  id?: string | null
  slug: string
  name: string
  brand: BrandCreateOneWithoutProductsInput
  type?: ProductType | null
  description?: string | null
  externalURL?: string | null
  images?: ImageCreateManyInput | null
  modelHeight?: number | null
  retailPrice?: number | null
  model?: ProductModelCreateOneWithoutProductsInput | null
  modelSize?: SizeCreateOneInput | null
  color: ColorCreateOneInput
  secondaryColor?: ColorCreateOneInput | null
  tags?: TagCreateManyWithoutProductsInput | null
  functions?: ProductFunctionCreateManyInput | null
  innerMaterials?: ProductCreateinnerMaterialsInput | null
  outerMaterials?: ProductCreateouterMaterialsInput | null
  variants?: ProductVariantCreateManyWithoutProductInput | null
  status?: ProductStatus | null
  season?: string | null
  architecture?: ProductArchitecture | null
}

export interface ProductCreateWithoutVariantsInput {
  id?: string | null
  slug: string
  name: string
  brand: BrandCreateOneWithoutProductsInput
  category: CategoryCreateOneWithoutProductsInput
  type?: ProductType | null
  description?: string | null
  externalURL?: string | null
  images?: ImageCreateManyInput | null
  modelHeight?: number | null
  retailPrice?: number | null
  model?: ProductModelCreateOneWithoutProductsInput | null
  modelSize?: SizeCreateOneInput | null
  color: ColorCreateOneInput
  secondaryColor?: ColorCreateOneInput | null
  tags?: TagCreateManyWithoutProductsInput | null
  functions?: ProductFunctionCreateManyInput | null
  innerMaterials?: ProductCreateinnerMaterialsInput | null
  outerMaterials?: ProductCreateouterMaterialsInput | null
  status?: ProductStatus | null
  season?: string | null
  architecture?: ProductArchitecture | null
}

export interface ProductCreateinnerMaterialsInput {
  set?: string[] | null
}

export interface ProductCreateouterMaterialsInput {
  set?: string[] | null
}

export interface ProductFunctionCreateInput {
  id?: string | null
  name?: string | null
}

export interface ProductFunctionCreateManyInput {
  create?: ProductFunctionCreateInput[] | null
  connect?: ProductFunctionWhereUniqueInput[] | null
}

export interface ProductFunctionScalarWhereInput {
  id?: string | null
  id_not?: string | null
  id_in?: string[] | null
  id_not_in?: string[] | null
  id_lt?: string | null
  id_lte?: string | null
  id_gt?: string | null
  id_gte?: string | null
  id_contains?: string | null
  id_not_contains?: string | null
  id_starts_with?: string | null
  id_not_starts_with?: string | null
  id_ends_with?: string | null
  id_not_ends_with?: string | null
  name?: string | null
  name_not?: string | null
  name_in?: string[] | null
  name_not_in?: string[] | null
  name_lt?: string | null
  name_lte?: string | null
  name_gt?: string | null
  name_gte?: string | null
  name_contains?: string | null
  name_not_contains?: string | null
  name_starts_with?: string | null
  name_not_starts_with?: string | null
  name_ends_with?: string | null
  name_not_ends_with?: string | null
  AND?: ProductFunctionScalarWhereInput[] | null
  OR?: ProductFunctionScalarWhereInput[] | null
  NOT?: ProductFunctionScalarWhereInput[] | null
}

export interface ProductFunctionUpdateDataInput {
  name?: string | null
}

export interface ProductFunctionUpdateManyDataInput {
  name?: string | null
}

export interface ProductFunctionUpdateManyInput {
  create?: ProductFunctionCreateInput[] | null
  update?: ProductFunctionUpdateWithWhereUniqueNestedInput[] | null
  upsert?: ProductFunctionUpsertWithWhereUniqueNestedInput[] | null
  delete?: ProductFunctionWhereUniqueInput[] | null
  connect?: ProductFunctionWhereUniqueInput[] | null
  set?: ProductFunctionWhereUniqueInput[] | null
  disconnect?: ProductFunctionWhereUniqueInput[] | null
  deleteMany?: ProductFunctionScalarWhereInput[] | null
  updateMany?: ProductFunctionUpdateManyWithWhereNestedInput[] | null
}

export interface ProductFunctionUpdateManyWithWhereNestedInput {
  where: ProductFunctionScalarWhereInput
  data: ProductFunctionUpdateManyDataInput
}

export interface ProductFunctionUpdateWithWhereUniqueNestedInput {
  where: ProductFunctionWhereUniqueInput
  data: ProductFunctionUpdateDataInput
}

export interface ProductFunctionUpsertWithWhereUniqueNestedInput {
  where: ProductFunctionWhereUniqueInput
  update: ProductFunctionUpdateDataInput
  create: ProductFunctionCreateInput
}

export interface ProductFunctionWhereUniqueInput {
  id?: string | null
  name?: string | null
}

export interface ProductModelCreateOneWithoutProductsInput {
  create?: ProductModelCreateWithoutProductsInput | null
  connect?: ProductModelWhereUniqueInput | null
}

export interface ProductModelCreateWithoutProductsInput {
  id?: string | null
  name: string
  height: number
}

export interface ProductModelUpdateOneWithoutProductsInput {
  create?: ProductModelCreateWithoutProductsInput | null
  update?: ProductModelUpdateWithoutProductsDataInput | null
  upsert?: ProductModelUpsertWithoutProductsInput | null
  delete?: boolean | null
  disconnect?: boolean | null
  connect?: ProductModelWhereUniqueInput | null
}

export interface ProductModelUpdateWithoutProductsDataInput {
  name?: string | null
  height?: number | null
}

export interface ProductModelUpsertWithoutProductsInput {
  update: ProductModelUpdateWithoutProductsDataInput
  create: ProductModelCreateWithoutProductsInput
}

export interface ProductModelWhereUniqueInput {
  id?: string | null
  name?: string | null
}

export interface ProductScalarWhereInput {
  id?: string | null
  id_not?: string | null
  id_in?: string[] | null
  id_not_in?: string[] | null
  id_lt?: string | null
  id_lte?: string | null
  id_gt?: string | null
  id_gte?: string | null
  id_contains?: string | null
  id_not_contains?: string | null
  id_starts_with?: string | null
  id_not_starts_with?: string | null
  id_ends_with?: string | null
  id_not_ends_with?: string | null
  slug?: string | null
  slug_not?: string | null
  slug_in?: string[] | null
  slug_not_in?: string[] | null
  slug_lt?: string | null
  slug_lte?: string | null
  slug_gt?: string | null
  slug_gte?: string | null
  slug_contains?: string | null
  slug_not_contains?: string | null
  slug_starts_with?: string | null
  slug_not_starts_with?: string | null
  slug_ends_with?: string | null
  slug_not_ends_with?: string | null
  name?: string | null
  name_not?: string | null
  name_in?: string[] | null
  name_not_in?: string[] | null
  name_lt?: string | null
  name_lte?: string | null
  name_gt?: string | null
  name_gte?: string | null
  name_contains?: string | null
  name_not_contains?: string | null
  name_starts_with?: string | null
  name_not_starts_with?: string | null
  name_ends_with?: string | null
  name_not_ends_with?: string | null
  type?: ProductType | null
  type_not?: ProductType | null
  type_in?: ProductType[] | null
  type_not_in?: ProductType[] | null
  description?: string | null
  description_not?: string | null
  description_in?: string[] | null
  description_not_in?: string[] | null
  description_lt?: string | null
  description_lte?: string | null
  description_gt?: string | null
  description_gte?: string | null
  description_contains?: string | null
  description_not_contains?: string | null
  description_starts_with?: string | null
  description_not_starts_with?: string | null
  description_ends_with?: string | null
  description_not_ends_with?: string | null
  externalURL?: string | null
  externalURL_not?: string | null
  externalURL_in?: string[] | null
  externalURL_not_in?: string[] | null
  externalURL_lt?: string | null
  externalURL_lte?: string | null
  externalURL_gt?: string | null
  externalURL_gte?: string | null
  externalURL_contains?: string | null
  externalURL_not_contains?: string | null
  externalURL_starts_with?: string | null
  externalURL_not_starts_with?: string | null
  externalURL_ends_with?: string | null
  externalURL_not_ends_with?: string | null
  modelHeight?: number | null
  modelHeight_not?: number | null
  modelHeight_in?: number[] | null
  modelHeight_not_in?: number[] | null
  modelHeight_lt?: number | null
  modelHeight_lte?: number | null
  modelHeight_gt?: number | null
  modelHeight_gte?: number | null
  retailPrice?: number | null
  retailPrice_not?: number | null
  retailPrice_in?: number[] | null
  retailPrice_not_in?: number[] | null
  retailPrice_lt?: number | null
  retailPrice_lte?: number | null
  retailPrice_gt?: number | null
  retailPrice_gte?: number | null
  status?: ProductStatus | null
  status_not?: ProductStatus | null
  status_in?: ProductStatus[] | null
  status_not_in?: ProductStatus[] | null
  season?: string | null
  season_not?: string | null
  season_in?: string[] | null
  season_not_in?: string[] | null
  season_lt?: string | null
  season_lte?: string | null
  season_gt?: string | null
  season_gte?: string | null
  season_contains?: string | null
  season_not_contains?: string | null
  season_starts_with?: string | null
  season_not_starts_with?: string | null
  season_ends_with?: string | null
  season_not_ends_with?: string | null
  architecture?: ProductArchitecture | null
  architecture_not?: ProductArchitecture | null
  architecture_in?: ProductArchitecture[] | null
  architecture_not_in?: ProductArchitecture[] | null
  createdAt?: any | null
  createdAt_not?: any | null
  createdAt_in?: any[] | null
  createdAt_not_in?: any[] | null
  createdAt_lt?: any | null
  createdAt_lte?: any | null
  createdAt_gt?: any | null
  createdAt_gte?: any | null
  updatedAt?: any | null
  updatedAt_not?: any | null
  updatedAt_in?: any[] | null
  updatedAt_not_in?: any[] | null
  updatedAt_lt?: any | null
  updatedAt_lte?: any | null
  updatedAt_gt?: any | null
  updatedAt_gte?: any | null
  AND?: ProductScalarWhereInput[] | null
  OR?: ProductScalarWhereInput[] | null
  NOT?: ProductScalarWhereInput[] | null
}

export interface ProductUpdateManyDataInput {
  slug?: string | null
  name?: string | null
  type?: ProductType | null
  description?: string | null
  externalURL?: string | null
  modelHeight?: number | null
  retailPrice?: number | null
  innerMaterials?: ProductUpdateinnerMaterialsInput | null
  outerMaterials?: ProductUpdateouterMaterialsInput | null
  status?: ProductStatus | null
  season?: string | null
  architecture?: ProductArchitecture | null
}

export interface ProductUpdateManyWithWhereNestedInput {
  where: ProductScalarWhereInput
  data: ProductUpdateManyDataInput
}

export interface ProductUpdateManyWithoutCategoryInput {
  create?: ProductCreateWithoutCategoryInput[] | null
  delete?: ProductWhereUniqueInput[] | null
  connect?: ProductWhereUniqueInput[] | null
  set?: ProductWhereUniqueInput[] | null
  disconnect?: ProductWhereUniqueInput[] | null
  update?: ProductUpdateWithWhereUniqueWithoutCategoryInput[] | null
  upsert?: ProductUpsertWithWhereUniqueWithoutCategoryInput[] | null
  deleteMany?: ProductScalarWhereInput[] | null
  updateMany?: ProductUpdateManyWithWhereNestedInput[] | null
}

export interface ProductUpdateOneRequiredWithoutVariantsInput {
  create?: ProductCreateWithoutVariantsInput | null
  update?: ProductUpdateWithoutVariantsDataInput | null
  upsert?: ProductUpsertWithoutVariantsInput | null
  connect?: ProductWhereUniqueInput | null
}

export interface ProductUpdateWithWhereUniqueWithoutCategoryInput {
  where: ProductWhereUniqueInput
  data: ProductUpdateWithoutCategoryDataInput
}

export interface ProductUpdateWithoutCategoryDataInput {
  slug?: string | null
  name?: string | null
  brand?: BrandUpdateOneRequiredWithoutProductsInput | null
  type?: ProductType | null
  description?: string | null
  externalURL?: string | null
  images?: ImageUpdateManyInput | null
  modelHeight?: number | null
  retailPrice?: number | null
  model?: ProductModelUpdateOneWithoutProductsInput | null
  modelSize?: SizeUpdateOneInput | null
  color?: ColorUpdateOneRequiredInput | null
  secondaryColor?: ColorUpdateOneInput | null
  tags?: TagUpdateManyWithoutProductsInput | null
  functions?: ProductFunctionUpdateManyInput | null
  innerMaterials?: ProductUpdateinnerMaterialsInput | null
  outerMaterials?: ProductUpdateouterMaterialsInput | null
  variants?: ProductVariantUpdateManyWithoutProductInput | null
  status?: ProductStatus | null
  season?: string | null
  architecture?: ProductArchitecture | null
}

export interface ProductUpdateWithoutVariantsDataInput {
  slug?: string | null
  name?: string | null
  brand?: BrandUpdateOneRequiredWithoutProductsInput | null
  category?: CategoryUpdateOneRequiredWithoutProductsInput | null
  type?: ProductType | null
  description?: string | null
  externalURL?: string | null
  images?: ImageUpdateManyInput | null
  modelHeight?: number | null
  retailPrice?: number | null
  model?: ProductModelUpdateOneWithoutProductsInput | null
  modelSize?: SizeUpdateOneInput | null
  color?: ColorUpdateOneRequiredInput | null
  secondaryColor?: ColorUpdateOneInput | null
  tags?: TagUpdateManyWithoutProductsInput | null
  functions?: ProductFunctionUpdateManyInput | null
  innerMaterials?: ProductUpdateinnerMaterialsInput | null
  outerMaterials?: ProductUpdateouterMaterialsInput | null
  status?: ProductStatus | null
  season?: string | null
  architecture?: ProductArchitecture | null
}

export interface ProductUpdateinnerMaterialsInput {
  set?: string[] | null
}

export interface ProductUpdateouterMaterialsInput {
  set?: string[] | null
}

export interface ProductUpsertWithWhereUniqueWithoutCategoryInput {
  where: ProductWhereUniqueInput
  update: ProductUpdateWithoutCategoryDataInput
  create: ProductCreateWithoutCategoryInput
}

export interface ProductUpsertWithoutVariantsInput {
  update: ProductUpdateWithoutVariantsDataInput
  create: ProductCreateWithoutVariantsInput
}

export interface ProductVariantCreateInput {
  id?: string | null
  sku?: string | null
  color: ColorCreateOneWithoutProductVariantsInput
  internalSize?: SizeCreateOneInput | null
  manufacturerSizes?: SizeCreateManyInput | null
  weight?: number | null
  height?: number | null
  productID: string
  product: ProductCreateOneWithoutVariantsInput
  retailPrice?: number | null
  physicalProducts?: PhysicalProductCreateManyWithoutProductVariantInput | null
  total: number
  reservable: number
  reserved: number
  nonReservable: number
  offloaded: number
  stored: number
}

export interface ProductVariantCreateManyWithoutColorInput {
  create?: ProductVariantCreateWithoutColorInput[] | null
  connect?: ProductVariantWhereUniqueInput[] | null
}

export interface ProductVariantCreateManyWithoutProductInput {
  create?: ProductVariantCreateWithoutProductInput[] | null
  connect?: ProductVariantWhereUniqueInput[] | null
}

export interface ProductVariantCreateOneInput {
  create?: ProductVariantCreateInput | null
  connect?: ProductVariantWhereUniqueInput | null
}

export interface ProductVariantCreateOneWithoutPhysicalProductsInput {
  create?: ProductVariantCreateWithoutPhysicalProductsInput | null
  connect?: ProductVariantWhereUniqueInput | null
}

export interface ProductVariantCreateWithoutColorInput {
  id?: string | null
  sku?: string | null
  internalSize?: SizeCreateOneInput | null
  manufacturerSizes?: SizeCreateManyInput | null
  weight?: number | null
  height?: number | null
  productID: string
  product: ProductCreateOneWithoutVariantsInput
  retailPrice?: number | null
  physicalProducts?: PhysicalProductCreateManyWithoutProductVariantInput | null
  total: number
  reservable: number
  reserved: number
  nonReservable: number
  offloaded: number
  stored: number
}

export interface ProductVariantCreateWithoutPhysicalProductsInput {
  id?: string | null
  sku?: string | null
  color: ColorCreateOneWithoutProductVariantsInput
  internalSize?: SizeCreateOneInput | null
  manufacturerSizes?: SizeCreateManyInput | null
  weight?: number | null
  height?: number | null
  productID: string
  product: ProductCreateOneWithoutVariantsInput
  retailPrice?: number | null
  total: number
  reservable: number
  reserved: number
  nonReservable: number
  offloaded: number
  stored: number
}

export interface ProductVariantCreateWithoutProductInput {
  id?: string | null
  sku?: string | null
  color: ColorCreateOneWithoutProductVariantsInput
  internalSize?: SizeCreateOneInput | null
  manufacturerSizes?: SizeCreateManyInput | null
  weight?: number | null
  height?: number | null
  productID: string
  retailPrice?: number | null
  physicalProducts?: PhysicalProductCreateManyWithoutProductVariantInput | null
  total: number
  reservable: number
  reserved: number
  nonReservable: number
  offloaded: number
  stored: number
}

export interface ProductVariantSKUsInput {
  brandID: string
  colorID: string
  sizeNames: string[]
}

export interface ProductVariantScalarWhereInput {
  id?: string | null
  id_not?: string | null
  id_in?: string[] | null
  id_not_in?: string[] | null
  id_lt?: string | null
  id_lte?: string | null
  id_gt?: string | null
  id_gte?: string | null
  id_contains?: string | null
  id_not_contains?: string | null
  id_starts_with?: string | null
  id_not_starts_with?: string | null
  id_ends_with?: string | null
  id_not_ends_with?: string | null
  sku?: string | null
  sku_not?: string | null
  sku_in?: string[] | null
  sku_not_in?: string[] | null
  sku_lt?: string | null
  sku_lte?: string | null
  sku_gt?: string | null
  sku_gte?: string | null
  sku_contains?: string | null
  sku_not_contains?: string | null
  sku_starts_with?: string | null
  sku_not_starts_with?: string | null
  sku_ends_with?: string | null
  sku_not_ends_with?: string | null
  weight?: number | null
  weight_not?: number | null
  weight_in?: number[] | null
  weight_not_in?: number[] | null
  weight_lt?: number | null
  weight_lte?: number | null
  weight_gt?: number | null
  weight_gte?: number | null
  height?: number | null
  height_not?: number | null
  height_in?: number[] | null
  height_not_in?: number[] | null
  height_lt?: number | null
  height_lte?: number | null
  height_gt?: number | null
  height_gte?: number | null
  productID?: string | null
  productID_not?: string | null
  productID_in?: string[] | null
  productID_not_in?: string[] | null
  productID_lt?: string | null
  productID_lte?: string | null
  productID_gt?: string | null
  productID_gte?: string | null
  productID_contains?: string | null
  productID_not_contains?: string | null
  productID_starts_with?: string | null
  productID_not_starts_with?: string | null
  productID_ends_with?: string | null
  productID_not_ends_with?: string | null
  retailPrice?: number | null
  retailPrice_not?: number | null
  retailPrice_in?: number[] | null
  retailPrice_not_in?: number[] | null
  retailPrice_lt?: number | null
  retailPrice_lte?: number | null
  retailPrice_gt?: number | null
  retailPrice_gte?: number | null
  total?: number | null
  total_not?: number | null
  total_in?: number[] | null
  total_not_in?: number[] | null
  total_lt?: number | null
  total_lte?: number | null
  total_gt?: number | null
  total_gte?: number | null
  reservable?: number | null
  reservable_not?: number | null
  reservable_in?: number[] | null
  reservable_not_in?: number[] | null
  reservable_lt?: number | null
  reservable_lte?: number | null
  reservable_gt?: number | null
  reservable_gte?: number | null
  reserved?: number | null
  reserved_not?: number | null
  reserved_in?: number[] | null
  reserved_not_in?: number[] | null
  reserved_lt?: number | null
  reserved_lte?: number | null
  reserved_gt?: number | null
  reserved_gte?: number | null
  nonReservable?: number | null
  nonReservable_not?: number | null
  nonReservable_in?: number[] | null
  nonReservable_not_in?: number[] | null
  nonReservable_lt?: number | null
  nonReservable_lte?: number | null
  nonReservable_gt?: number | null
  nonReservable_gte?: number | null
  offloaded?: number | null
  offloaded_not?: number | null
  offloaded_in?: number[] | null
  offloaded_not_in?: number[] | null
  offloaded_lt?: number | null
  offloaded_lte?: number | null
  offloaded_gt?: number | null
  offloaded_gte?: number | null
  stored?: number | null
  stored_not?: number | null
  stored_in?: number[] | null
  stored_not_in?: number[] | null
  stored_lt?: number | null
  stored_lte?: number | null
  stored_gt?: number | null
  stored_gte?: number | null
  createdAt?: any | null
  createdAt_not?: any | null
  createdAt_in?: any[] | null
  createdAt_not_in?: any[] | null
  createdAt_lt?: any | null
  createdAt_lte?: any | null
  createdAt_gt?: any | null
  createdAt_gte?: any | null
  updatedAt?: any | null
  updatedAt_not?: any | null
  updatedAt_in?: any[] | null
  updatedAt_not_in?: any[] | null
  updatedAt_lt?: any | null
  updatedAt_lte?: any | null
  updatedAt_gt?: any | null
  updatedAt_gte?: any | null
  AND?: ProductVariantScalarWhereInput[] | null
  OR?: ProductVariantScalarWhereInput[] | null
  NOT?: ProductVariantScalarWhereInput[] | null
}

export interface ProductVariantUpdateDataInput {
  sku?: string | null
  color?: ColorUpdateOneRequiredWithoutProductVariantsInput | null
  internalSize?: SizeUpdateOneInput | null
  manufacturerSizes?: SizeUpdateManyInput | null
  weight?: number | null
  height?: number | null
  productID?: string | null
  product?: ProductUpdateOneRequiredWithoutVariantsInput | null
  retailPrice?: number | null
  physicalProducts?: PhysicalProductUpdateManyWithoutProductVariantInput | null
  total?: number | null
  reservable?: number | null
  reserved?: number | null
  nonReservable?: number | null
  offloaded?: number | null
  stored?: number | null
}

export interface ProductVariantUpdateManyDataInput {
  sku?: string | null
  weight?: number | null
  height?: number | null
  productID?: string | null
  retailPrice?: number | null
  total?: number | null
  reservable?: number | null
  reserved?: number | null
  nonReservable?: number | null
  offloaded?: number | null
  stored?: number | null
}

export interface ProductVariantUpdateManyWithWhereNestedInput {
  where: ProductVariantScalarWhereInput
  data: ProductVariantUpdateManyDataInput
}

export interface ProductVariantUpdateManyWithoutColorInput {
  create?: ProductVariantCreateWithoutColorInput[] | null
  delete?: ProductVariantWhereUniqueInput[] | null
  connect?: ProductVariantWhereUniqueInput[] | null
  set?: ProductVariantWhereUniqueInput[] | null
  disconnect?: ProductVariantWhereUniqueInput[] | null
  update?: ProductVariantUpdateWithWhereUniqueWithoutColorInput[] | null
  upsert?: ProductVariantUpsertWithWhereUniqueWithoutColorInput[] | null
  deleteMany?: ProductVariantScalarWhereInput[] | null
  updateMany?: ProductVariantUpdateManyWithWhereNestedInput[] | null
}

export interface ProductVariantUpdateManyWithoutProductInput {
  create?: ProductVariantCreateWithoutProductInput[] | null
  delete?: ProductVariantWhereUniqueInput[] | null
  connect?: ProductVariantWhereUniqueInput[] | null
  set?: ProductVariantWhereUniqueInput[] | null
  disconnect?: ProductVariantWhereUniqueInput[] | null
  update?: ProductVariantUpdateWithWhereUniqueWithoutProductInput[] | null
  upsert?: ProductVariantUpsertWithWhereUniqueWithoutProductInput[] | null
  deleteMany?: ProductVariantScalarWhereInput[] | null
  updateMany?: ProductVariantUpdateManyWithWhereNestedInput[] | null
}

export interface ProductVariantUpdateOneRequiredInput {
  create?: ProductVariantCreateInput | null
  update?: ProductVariantUpdateDataInput | null
  upsert?: ProductVariantUpsertNestedInput | null
  connect?: ProductVariantWhereUniqueInput | null
}

export interface ProductVariantUpdateOneRequiredWithoutPhysicalProductsInput {
  create?: ProductVariantCreateWithoutPhysicalProductsInput | null
  update?: ProductVariantUpdateWithoutPhysicalProductsDataInput | null
  upsert?: ProductVariantUpsertWithoutPhysicalProductsInput | null
  connect?: ProductVariantWhereUniqueInput | null
}

export interface ProductVariantUpdateWithWhereUniqueWithoutColorInput {
  where: ProductVariantWhereUniqueInput
  data: ProductVariantUpdateWithoutColorDataInput
}

export interface ProductVariantUpdateWithWhereUniqueWithoutProductInput {
  where: ProductVariantWhereUniqueInput
  data: ProductVariantUpdateWithoutProductDataInput
}

export interface ProductVariantUpdateWithoutColorDataInput {
  sku?: string | null
  internalSize?: SizeUpdateOneInput | null
  manufacturerSizes?: SizeUpdateManyInput | null
  weight?: number | null
  height?: number | null
  productID?: string | null
  product?: ProductUpdateOneRequiredWithoutVariantsInput | null
  retailPrice?: number | null
  physicalProducts?: PhysicalProductUpdateManyWithoutProductVariantInput | null
  total?: number | null
  reservable?: number | null
  reserved?: number | null
  nonReservable?: number | null
  offloaded?: number | null
  stored?: number | null
}

export interface ProductVariantUpdateWithoutPhysicalProductsDataInput {
  sku?: string | null
  color?: ColorUpdateOneRequiredWithoutProductVariantsInput | null
  internalSize?: SizeUpdateOneInput | null
  manufacturerSizes?: SizeUpdateManyInput | null
  weight?: number | null
  height?: number | null
  productID?: string | null
  product?: ProductUpdateOneRequiredWithoutVariantsInput | null
  retailPrice?: number | null
  total?: number | null
  reservable?: number | null
  reserved?: number | null
  nonReservable?: number | null
  offloaded?: number | null
  stored?: number | null
}

export interface ProductVariantUpdateWithoutProductDataInput {
  sku?: string | null
  color?: ColorUpdateOneRequiredWithoutProductVariantsInput | null
  internalSize?: SizeUpdateOneInput | null
  manufacturerSizes?: SizeUpdateManyInput | null
  weight?: number | null
  height?: number | null
  productID?: string | null
  retailPrice?: number | null
  physicalProducts?: PhysicalProductUpdateManyWithoutProductVariantInput | null
  total?: number | null
  reservable?: number | null
  reserved?: number | null
  nonReservable?: number | null
  offloaded?: number | null
  stored?: number | null
}

export interface ProductVariantUpsertNestedInput {
  update: ProductVariantUpdateDataInput
  create: ProductVariantCreateInput
}

export interface ProductVariantUpsertWithWhereUniqueWithoutColorInput {
  where: ProductVariantWhereUniqueInput
  update: ProductVariantUpdateWithoutColorDataInput
  create: ProductVariantCreateWithoutColorInput
}

export interface ProductVariantUpsertWithWhereUniqueWithoutProductInput {
  where: ProductVariantWhereUniqueInput
  update: ProductVariantUpdateWithoutProductDataInput
  create: ProductVariantCreateWithoutProductInput
}

export interface ProductVariantUpsertWithoutPhysicalProductsInput {
  update: ProductVariantUpdateWithoutPhysicalProductsDataInput
  create: ProductVariantCreateWithoutPhysicalProductsInput
}

export interface ProductVariantWhereUniqueInput {
  id?: string | null
  sku?: string | null
}

export interface ProductWhereUniqueInput {
  id?: string | null
  slug?: string | null
}

export interface ReservationCreateWithoutCustomerInput {
  id?: string | null
  user: UserCreateOneInput
  sentPackage?: PackageCreateOneInput | null
  returnedPackage?: PackageCreateOneInput | null
  location?: LocationCreateOneInput | null
  products?: PhysicalProductCreateManyInput | null
  reservationNumber: number
  shipped: boolean
  status: ReservationStatus
  shippedAt?: any | null
  receivedAt?: any | null
  reminderSentAt?: any | null
}

export interface ReservationScalarWhereInput {
  id?: string | null
  id_not?: string | null
  id_in?: string[] | null
  id_not_in?: string[] | null
  id_lt?: string | null
  id_lte?: string | null
  id_gt?: string | null
  id_gte?: string | null
  id_contains?: string | null
  id_not_contains?: string | null
  id_starts_with?: string | null
  id_not_starts_with?: string | null
  id_ends_with?: string | null
  id_not_ends_with?: string | null
  reservationNumber?: number | null
  reservationNumber_not?: number | null
  reservationNumber_in?: number[] | null
  reservationNumber_not_in?: number[] | null
  reservationNumber_lt?: number | null
  reservationNumber_lte?: number | null
  reservationNumber_gt?: number | null
  reservationNumber_gte?: number | null
  shipped?: boolean | null
  shipped_not?: boolean | null
  status?: ReservationStatus | null
  status_not?: ReservationStatus | null
  status_in?: ReservationStatus[] | null
  status_not_in?: ReservationStatus[] | null
  shippedAt?: any | null
  shippedAt_not?: any | null
  shippedAt_in?: any[] | null
  shippedAt_not_in?: any[] | null
  shippedAt_lt?: any | null
  shippedAt_lte?: any | null
  shippedAt_gt?: any | null
  shippedAt_gte?: any | null
  receivedAt?: any | null
  receivedAt_not?: any | null
  receivedAt_in?: any[] | null
  receivedAt_not_in?: any[] | null
  receivedAt_lt?: any | null
  receivedAt_lte?: any | null
  receivedAt_gt?: any | null
  receivedAt_gte?: any | null
  reminderSentAt?: any | null
  reminderSentAt_not?: any | null
  reminderSentAt_in?: any[] | null
  reminderSentAt_not_in?: any[] | null
  reminderSentAt_lt?: any | null
  reminderSentAt_lte?: any | null
  reminderSentAt_gt?: any | null
  reminderSentAt_gte?: any | null
  createdAt?: any | null
  createdAt_not?: any | null
  createdAt_in?: any[] | null
  createdAt_not_in?: any[] | null
  createdAt_lt?: any | null
  createdAt_lte?: any | null
  createdAt_gt?: any | null
  createdAt_gte?: any | null
  updatedAt?: any | null
  updatedAt_not?: any | null
  updatedAt_in?: any[] | null
  updatedAt_not_in?: any[] | null
  updatedAt_lt?: any | null
  updatedAt_lte?: any | null
  updatedAt_gt?: any | null
  updatedAt_gte?: any | null
  AND?: ReservationScalarWhereInput[] | null
  OR?: ReservationScalarWhereInput[] | null
  NOT?: ReservationScalarWhereInput[] | null
}

export interface ReservationUpdateManyDataInput {
  reservationNumber?: number | null
  shipped?: boolean | null
  status?: ReservationStatus | null
  shippedAt?: any | null
  receivedAt?: any | null
  reminderSentAt?: any | null
}

export interface ReservationUpdateManyWithWhereNestedInput {
  where: ReservationScalarWhereInput
  data: ReservationUpdateManyDataInput
}

export interface ReservationUpdateManyWithoutCustomerInput {
  create?: ReservationCreateWithoutCustomerInput[] | null
  delete?: ReservationWhereUniqueInput[] | null
  connect?: ReservationWhereUniqueInput[] | null
  set?: ReservationWhereUniqueInput[] | null
  disconnect?: ReservationWhereUniqueInput[] | null
  update?: ReservationUpdateWithWhereUniqueWithoutCustomerInput[] | null
  upsert?: ReservationUpsertWithWhereUniqueWithoutCustomerInput[] | null
  deleteMany?: ReservationScalarWhereInput[] | null
  updateMany?: ReservationUpdateManyWithWhereNestedInput[] | null
}

export interface ReservationUpdateWithWhereUniqueWithoutCustomerInput {
  where: ReservationWhereUniqueInput
  data: ReservationUpdateWithoutCustomerDataInput
}

export interface ReservationUpdateWithoutCustomerDataInput {
  user?: UserUpdateOneRequiredInput | null
  sentPackage?: PackageUpdateOneInput | null
  returnedPackage?: PackageUpdateOneInput | null
  location?: LocationUpdateOneInput | null
  products?: PhysicalProductUpdateManyInput | null
  reservationNumber?: number | null
  shipped?: boolean | null
  status?: ReservationStatus | null
  shippedAt?: any | null
  receivedAt?: any | null
  reminderSentAt?: any | null
}

export interface ReservationUpsertWithWhereUniqueWithoutCustomerInput {
  where: ReservationWhereUniqueInput
  update: ReservationUpdateWithoutCustomerDataInput
  create: ReservationCreateWithoutCustomerInput
}

export interface ReservationWhereUniqueInput {
  id?: string | null
  reservationNumber?: number | null
}

export interface SizeCreateInput {
  id?: string | null
  slug: string
  productType?: ProductType | null
  top?: TopSizeCreateOneInput | null
  bottom?: BottomSizeCreateOneInput | null
  display: string
}

export interface SizeCreateManyInput {
  create?: SizeCreateInput[] | null
  connect?: SizeWhereUniqueInput[] | null
}

export interface SizeCreateOneInput {
  create?: SizeCreateInput | null
  connect?: SizeWhereUniqueInput | null
}

export interface SizeScalarWhereInput {
  id?: string | null
  id_not?: string | null
  id_in?: string[] | null
  id_not_in?: string[] | null
  id_lt?: string | null
  id_lte?: string | null
  id_gt?: string | null
  id_gte?: string | null
  id_contains?: string | null
  id_not_contains?: string | null
  id_starts_with?: string | null
  id_not_starts_with?: string | null
  id_ends_with?: string | null
  id_not_ends_with?: string | null
  slug?: string | null
  slug_not?: string | null
  slug_in?: string[] | null
  slug_not_in?: string[] | null
  slug_lt?: string | null
  slug_lte?: string | null
  slug_gt?: string | null
  slug_gte?: string | null
  slug_contains?: string | null
  slug_not_contains?: string | null
  slug_starts_with?: string | null
  slug_not_starts_with?: string | null
  slug_ends_with?: string | null
  slug_not_ends_with?: string | null
  productType?: ProductType | null
  productType_not?: ProductType | null
  productType_in?: ProductType[] | null
  productType_not_in?: ProductType[] | null
  display?: string | null
  display_not?: string | null
  display_in?: string[] | null
  display_not_in?: string[] | null
  display_lt?: string | null
  display_lte?: string | null
  display_gt?: string | null
  display_gte?: string | null
  display_contains?: string | null
  display_not_contains?: string | null
  display_starts_with?: string | null
  display_not_starts_with?: string | null
  display_ends_with?: string | null
  display_not_ends_with?: string | null
  AND?: SizeScalarWhereInput[] | null
  OR?: SizeScalarWhereInput[] | null
  NOT?: SizeScalarWhereInput[] | null
}

export interface SizeUpdateDataInput {
  slug?: string | null
  productType?: ProductType | null
  top?: TopSizeUpdateOneInput | null
  bottom?: BottomSizeUpdateOneInput | null
  display?: string | null
}

export interface SizeUpdateManyDataInput {
  slug?: string | null
  productType?: ProductType | null
  display?: string | null
}

export interface SizeUpdateManyInput {
  create?: SizeCreateInput[] | null
  update?: SizeUpdateWithWhereUniqueNestedInput[] | null
  upsert?: SizeUpsertWithWhereUniqueNestedInput[] | null
  delete?: SizeWhereUniqueInput[] | null
  connect?: SizeWhereUniqueInput[] | null
  set?: SizeWhereUniqueInput[] | null
  disconnect?: SizeWhereUniqueInput[] | null
  deleteMany?: SizeScalarWhereInput[] | null
  updateMany?: SizeUpdateManyWithWhereNestedInput[] | null
}

export interface SizeUpdateManyWithWhereNestedInput {
  where: SizeScalarWhereInput
  data: SizeUpdateManyDataInput
}

export interface SizeUpdateOneInput {
  create?: SizeCreateInput | null
  update?: SizeUpdateDataInput | null
  upsert?: SizeUpsertNestedInput | null
  delete?: boolean | null
  disconnect?: boolean | null
  connect?: SizeWhereUniqueInput | null
}

export interface SizeUpdateWithWhereUniqueNestedInput {
  where: SizeWhereUniqueInput
  data: SizeUpdateDataInput
}

export interface SizeUpsertNestedInput {
  update: SizeUpdateDataInput
  create: SizeCreateInput
}

export interface SizeUpsertWithWhereUniqueNestedInput {
  where: SizeWhereUniqueInput
  update: SizeUpdateDataInput
  create: SizeCreateInput
}

export interface SizeWhereUniqueInput {
  id?: string | null
  slug?: string | null
}

export interface TagCreateManyWithoutProductsInput {
  create?: TagCreateWithoutProductsInput[] | null
  connect?: TagWhereUniqueInput[] | null
}

export interface TagCreateWithoutProductsInput {
  id?: string | null
  name: string
  description?: string | null
}

export interface TagScalarWhereInput {
  id?: string | null
  id_not?: string | null
  id_in?: string[] | null
  id_not_in?: string[] | null
  id_lt?: string | null
  id_lte?: string | null
  id_gt?: string | null
  id_gte?: string | null
  id_contains?: string | null
  id_not_contains?: string | null
  id_starts_with?: string | null
  id_not_starts_with?: string | null
  id_ends_with?: string | null
  id_not_ends_with?: string | null
  name?: string | null
  name_not?: string | null
  name_in?: string[] | null
  name_not_in?: string[] | null
  name_lt?: string | null
  name_lte?: string | null
  name_gt?: string | null
  name_gte?: string | null
  name_contains?: string | null
  name_not_contains?: string | null
  name_starts_with?: string | null
  name_not_starts_with?: string | null
  name_ends_with?: string | null
  name_not_ends_with?: string | null
  description?: string | null
  description_not?: string | null
  description_in?: string[] | null
  description_not_in?: string[] | null
  description_lt?: string | null
  description_lte?: string | null
  description_gt?: string | null
  description_gte?: string | null
  description_contains?: string | null
  description_not_contains?: string | null
  description_starts_with?: string | null
  description_not_starts_with?: string | null
  description_ends_with?: string | null
  description_not_ends_with?: string | null
  createdAt?: any | null
  createdAt_not?: any | null
  createdAt_in?: any[] | null
  createdAt_not_in?: any[] | null
  createdAt_lt?: any | null
  createdAt_lte?: any | null
  createdAt_gt?: any | null
  createdAt_gte?: any | null
  updatedAt?: any | null
  updatedAt_not?: any | null
  updatedAt_in?: any[] | null
  updatedAt_not_in?: any[] | null
  updatedAt_lt?: any | null
  updatedAt_lte?: any | null
  updatedAt_gt?: any | null
  updatedAt_gte?: any | null
  AND?: TagScalarWhereInput[] | null
  OR?: TagScalarWhereInput[] | null
  NOT?: TagScalarWhereInput[] | null
}

export interface TagUpdateManyDataInput {
  name?: string | null
  description?: string | null
}

export interface TagUpdateManyWithWhereNestedInput {
  where: TagScalarWhereInput
  data: TagUpdateManyDataInput
}

export interface TagUpdateManyWithoutProductsInput {
  create?: TagCreateWithoutProductsInput[] | null
  delete?: TagWhereUniqueInput[] | null
  connect?: TagWhereUniqueInput[] | null
  set?: TagWhereUniqueInput[] | null
  disconnect?: TagWhereUniqueInput[] | null
  update?: TagUpdateWithWhereUniqueWithoutProductsInput[] | null
  upsert?: TagUpsertWithWhereUniqueWithoutProductsInput[] | null
  deleteMany?: TagScalarWhereInput[] | null
  updateMany?: TagUpdateManyWithWhereNestedInput[] | null
}

export interface TagUpdateWithWhereUniqueWithoutProductsInput {
  where: TagWhereUniqueInput
  data: TagUpdateWithoutProductsDataInput
}

export interface TagUpdateWithoutProductsDataInput {
  name?: string | null
  description?: string | null
}

export interface TagUpsertWithWhereUniqueWithoutProductsInput {
  where: TagWhereUniqueInput
  update: TagUpdateWithoutProductsDataInput
  create: TagCreateWithoutProductsInput
}

export interface TagWhereUniqueInput {
  id?: string | null
  name?: string | null
}

export interface TopSizeCreateInput {
  id?: string | null
  letter?: LetterSize | null
  sleeve?: number | null
  shoulder?: number | null
  chest?: number | null
  neck?: number | null
  length?: number | null
}

export interface TopSizeCreateOneInput {
  create?: TopSizeCreateInput | null
  connect?: TopSizeWhereUniqueInput | null
}

export interface TopSizeUpdateDataInput {
  letter?: LetterSize | null
  sleeve?: number | null
  shoulder?: number | null
  chest?: number | null
  neck?: number | null
  length?: number | null
}

export interface TopSizeUpdateOneInput {
  create?: TopSizeCreateInput | null
  update?: TopSizeUpdateDataInput | null
  upsert?: TopSizeUpsertNestedInput | null
  delete?: boolean | null
  disconnect?: boolean | null
  connect?: TopSizeWhereUniqueInput | null
}

export interface TopSizeUpsertNestedInput {
  update: TopSizeUpdateDataInput
  create: TopSizeCreateInput
}

export interface TopSizeWhereUniqueInput {
  id?: string | null
}

export interface UpsertPhysicalProductInput {
  seasonsUID: string
  inventoryStatus: InventoryStatus
  productStatus: PhysicalProductStatus
}

export interface UpsertProductInput {
  name: string
  images: any[]
  brandID: string
  categoryID: string
  type: ProductType
  description: string
  modelID: string
  retailPrice: number
  modelSizeName: string
  modelSizeDisplay: string
  bottomSizeType?: BottomSizeType | null
  colorID: string
  secondaryColorID?: string | null
  tags: string[]
  functions: string[]
  innerMaterials: string[]
  outerMaterials: string[]
  status: ProductStatus
  season: string
  architecture: string
  variants: UpsertVariantInput[]
}

export interface UpsertVariantInput {
  sku: string
  internalSizeName: string
  sleeve?: number | null
  shoulder?: number | null
  chest?: number | null
  neck?: number | null
  length?: number | null
  bottomSizeType?: BottomSizeType | null
  waist?: number | null
  rise?: number | null
  hem?: number | null
  inseam?: number | null
  weight: number
  total: number
  physicalProducts: UpsertPhysicalProductInput[]
}

export interface UserCreateInput {
  id?: string | null
  auth0Id: string
  email: string
  firstName: string
  lastName: string
  role?: UserRole | null
  roles?: UserCreaterolesInput | null
  pushNotifications?: PushNotificationStatus | null
}

export interface UserCreateOneInput {
  create?: UserCreateInput | null
  connect?: UserWhereUniqueInput | null
}

export interface UserCreaterolesInput {
  set?: UserRole[] | null
}

export interface UserUpdateDataInput {
  auth0Id?: string | null
  email?: string | null
  firstName?: string | null
  lastName?: string | null
  role?: UserRole | null
  roles?: UserUpdaterolesInput | null
  pushNotifications?: PushNotificationStatus | null
}

export interface UserUpdateOneInput {
  create?: UserCreateInput | null
  update?: UserUpdateDataInput | null
  upsert?: UserUpsertNestedInput | null
  delete?: boolean | null
  disconnect?: boolean | null
  connect?: UserWhereUniqueInput | null
}

export interface UserUpdateOneRequiredInput {
  create?: UserCreateInput | null
  update?: UserUpdateDataInput | null
  upsert?: UserUpsertNestedInput | null
  connect?: UserWhereUniqueInput | null
}

export interface UserUpdaterolesInput {
  set?: UserRole[] | null
}

export interface UserUpsertNestedInput {
  update: UserUpdateDataInput
  create: UserCreateInput
}

export interface UserWhereUniqueInput {
  id?: string | null
  auth0Id?: string | null
  email?: string | null
}

export interface WarehouseLocationConstraintCreateManyWithoutLocationsInput {
  create?: WarehouseLocationConstraintCreateWithoutLocationsInput[] | null
  connect?: WarehouseLocationConstraintWhereUniqueInput[] | null
}

export interface WarehouseLocationConstraintCreateWithoutLocationsInput {
  id?: string | null
  category: CategoryCreateOneInput
  limit: number
}

export interface WarehouseLocationConstraintScalarWhereInput {
  id?: string | null
  id_not?: string | null
  id_in?: string[] | null
  id_not_in?: string[] | null
  id_lt?: string | null
  id_lte?: string | null
  id_gt?: string | null
  id_gte?: string | null
  id_contains?: string | null
  id_not_contains?: string | null
  id_starts_with?: string | null
  id_not_starts_with?: string | null
  id_ends_with?: string | null
  id_not_ends_with?: string | null
  limit?: number | null
  limit_not?: number | null
  limit_in?: number[] | null
  limit_not_in?: number[] | null
  limit_lt?: number | null
  limit_lte?: number | null
  limit_gt?: number | null
  limit_gte?: number | null
  createdAt?: any | null
  createdAt_not?: any | null
  createdAt_in?: any[] | null
  createdAt_not_in?: any[] | null
  createdAt_lt?: any | null
  createdAt_lte?: any | null
  createdAt_gt?: any | null
  createdAt_gte?: any | null
  updatedAt?: any | null
  updatedAt_not?: any | null
  updatedAt_in?: any[] | null
  updatedAt_not_in?: any[] | null
  updatedAt_lt?: any | null
  updatedAt_lte?: any | null
  updatedAt_gt?: any | null
  updatedAt_gte?: any | null
  AND?: WarehouseLocationConstraintScalarWhereInput[] | null
  OR?: WarehouseLocationConstraintScalarWhereInput[] | null
  NOT?: WarehouseLocationConstraintScalarWhereInput[] | null
}

export interface WarehouseLocationConstraintUpdateManyDataInput {
  limit?: number | null
}

export interface WarehouseLocationConstraintUpdateManyWithWhereNestedInput {
  where: WarehouseLocationConstraintScalarWhereInput
  data: WarehouseLocationConstraintUpdateManyDataInput
}

export interface WarehouseLocationConstraintUpdateManyWithoutLocationsInput {
  create?: WarehouseLocationConstraintCreateWithoutLocationsInput[] | null
  delete?: WarehouseLocationConstraintWhereUniqueInput[] | null
  connect?: WarehouseLocationConstraintWhereUniqueInput[] | null
  set?: WarehouseLocationConstraintWhereUniqueInput[] | null
  disconnect?: WarehouseLocationConstraintWhereUniqueInput[] | null
  update?: WarehouseLocationConstraintUpdateWithWhereUniqueWithoutLocationsInput[] | null
  upsert?: WarehouseLocationConstraintUpsertWithWhereUniqueWithoutLocationsInput[] | null
  deleteMany?: WarehouseLocationConstraintScalarWhereInput[] | null
  updateMany?: WarehouseLocationConstraintUpdateManyWithWhereNestedInput[] | null
}

export interface WarehouseLocationConstraintUpdateWithWhereUniqueWithoutLocationsInput {
  where: WarehouseLocationConstraintWhereUniqueInput
  data: WarehouseLocationConstraintUpdateWithoutLocationsDataInput
}

export interface WarehouseLocationConstraintUpdateWithoutLocationsDataInput {
  category?: CategoryUpdateOneRequiredInput | null
  limit?: number | null
}

export interface WarehouseLocationConstraintUpsertWithWhereUniqueWithoutLocationsInput {
  where: WarehouseLocationConstraintWhereUniqueInput
  update: WarehouseLocationConstraintUpdateWithoutLocationsDataInput
  create: WarehouseLocationConstraintCreateWithoutLocationsInput
}

export interface WarehouseLocationConstraintWhereUniqueInput {
  id?: string | null
}

export interface WarehouseLocationCreateOneWithoutPhysicalProductsInput {
  create?: WarehouseLocationCreateWithoutPhysicalProductsInput | null
  connect?: WarehouseLocationWhereUniqueInput | null
}

export interface WarehouseLocationCreateWithoutPhysicalProductsInput {
  id?: string | null
  type: WarehouseLocationType
  barcode: string
  locationCode: string
  itemCode: string
  constraints?: WarehouseLocationConstraintCreateManyWithoutLocationsInput | null
}

export interface WarehouseLocationUpdateOneWithoutPhysicalProductsInput {
  create?: WarehouseLocationCreateWithoutPhysicalProductsInput | null
  update?: WarehouseLocationUpdateWithoutPhysicalProductsDataInput | null
  upsert?: WarehouseLocationUpsertWithoutPhysicalProductsInput | null
  delete?: boolean | null
  disconnect?: boolean | null
  connect?: WarehouseLocationWhereUniqueInput | null
}

export interface WarehouseLocationUpdateWithoutPhysicalProductsDataInput {
  type?: WarehouseLocationType | null
  barcode?: string | null
  locationCode?: string | null
  itemCode?: string | null
  constraints?: WarehouseLocationConstraintUpdateManyWithoutLocationsInput | null
}

export interface WarehouseLocationUpsertWithoutPhysicalProductsInput {
  update: WarehouseLocationUpdateWithoutPhysicalProductsDataInput
  create: WarehouseLocationCreateWithoutPhysicalProductsInput
}

export interface WarehouseLocationWhereUniqueInput {
  id?: string | null
  barcode?: string | null
}

//==============================================================
// END Enums and Input Objects
//==============================================================
