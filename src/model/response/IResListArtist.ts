import { StatusEnum } from "../../enums/statusEnum";

export interface IResListArtist {
  name: string;
  slug: string;
  description?: string;
  created_by?: string;
  status_enum: StatusEnum;
  status_string: string;
  created_at: string;
  image?: string;
}
