import { StatusEnum } from "../../enums/statusEnum";

export interface IResDetailArtist {
  name: string;
  slug: string;
  description?: string;
  created_by?: string;
  image: string;
  request_note: string;
  revision_notes: string;
  reject_reason: string;
  status: StatusEnum;
  created_date: Date;
  publish_date: Date;
}
