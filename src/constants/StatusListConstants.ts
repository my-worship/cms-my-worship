import { TypeArtistStatus } from "../utilities/type-utils";

export interface IStatusListConstants {
  label: string;
  value: TypeArtistStatus;
}

export const dataListStatus: IStatusListConstants[] = [
  { label: "All", value: "all" },
  { label: "Publish", value: "publish" },
  { label: "Pending", value: "pending" },
  { label: "Need Revision", value: "need-revision" },
  { label: "Draft", value: "draft" },
  { label: "Reject", value: "reject" },
];

export const dataListStatusSuperAdmin: IStatusListConstants[] = [
  { label: "All", value: "all" },
  { label: "Publish", value: "publish" },
  { label: "Pending", value: "pending" },
  { label: "Need Revision", value: "need-revision" },
  { label: "Reject", value: "reject" },
];
