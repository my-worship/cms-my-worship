import { PayloadAction } from "@reduxjs/toolkit";
import { IResultPaginatedData } from "./base-response";

export interface IBreadCrumbList {
  label: string;
  path?: string;
}

export type SizeType = "sm" | "md" | "lg" | "xl";
export type FlexBoxType = "center" | "end" | "start" | "space-between";
export type ButtonVariant = "text" | "outlined" | "contained";
export type ColorType =
  | "inherit"
  | "primary"
  | "secondary"
  | "success"
  | "error"
  | "info"
  | "warning";

export type IFileType = "IMAGE" | "VIDEO" | "";

export const defaultPaginatedData: IPaginatedParams = {
  page: 0,
  size: 10,
  total_data: 0,
};

export interface IPaginatedParams {
  page: number;
  size: number;
  total_data: number;
  sort?: string;
}

export type TypeStatusCreateCampaign = "public" | "private" | string;

export type CategoriesType = "Fashion" | "Automotive" | "Travel";
export type LayoutTypeLoginPage =
  | "LOGIN"
  | "FORGOT_PASSWORD_FORM_EMAIL"
  | "VERIFICATION"
  | "NEW_PASSWORD_INPUT";

export type campaignCategoryType = "CONTENT_CREATION" | "READ_TO_POST";

export type PlatformType = "Instagram" | "Tiktok" | "Instagram,Tiktok";

export type PaymentStatus =
  | "ALL"
  | "WAITING_FOR_DP"
  | "DP_PAID"
  | "FULL_PAID"
  | "DP_PAYMENT"
  | "FULL_PAYMENT";

export type IStatusDataInfluencer =
  | "APPLIED"
  | "PENDING"
  | "NEED_REVISION"
  | "UPLOADED"
  | "APPROVED"
  | "SUBMITTED"
  | "ONGOING"
  | "COMPLETED"
  | "DP LUNAS"
  | "REJECTED"
  | "";

export type SubmissionStatus = "";

export type GenderType = "FEMALE" | "MALE" | "OTHER";

export interface IListDataContentTypePostEngagement {
  label: string;
  engagement: string;
  er: string;
}

export type typeVariantDetailInfluencer =
  | "CREATOR_MARKETPLACE_LIST"
  | "WAITING_APPROVAL_DETAIL_CAMPAIGN"
  | "TAB_SUBMISSION_DETAIL_CAMPAIGN";

export interface IDateValueList {
  date: string;
  value: number;
}

export interface ILabelValue<T> {
  label: string;
  value?: T;
}

export interface IKeyValue<T> {
  key: string;
  value: T;
}

export interface IFileDetail {
  size: number;
  name: string;
}

export type BasePayload<T> = PayloadAction<IBasePayload<T>>;
export type BasePayloadPaginated<T> = PayloadAction<IBasePayloadPaginated<T>>;

interface IBasePayload<T> {
  data?: T;
  loading?: boolean;
}

interface IBasePayloadPaginated<T> {
  data?: T;
  loading?: boolean;
  paginated_data?: IResultPaginatedData;
}

export interface IPayloadData<T> {
  data?: T;
  loading?: boolean;
}

export interface IPayloadDataPaginated<T> {
  data?: T;
  paginated_data?: IResultPaginatedData;
  loading?: boolean;
}

export interface IPayloadSuccess {
  success?: boolean;
  loading?: boolean;
}

export type TypeArtistStatus =
  | "all"
  | "pending"
  | "need-revision"
  | "draf"
  | "publish";

export interface ISidebarMenu {
  icon: any;
  activeIcon: string;
  title: string;
  items?: ItemsSidebarMenu[];
  path: string;
}

interface ItemsSidebarMenu {
  title: string;
  path: string;
}
