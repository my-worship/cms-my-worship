import { StatusEnum } from "../../enums/statusEnum";

export interface IResListLyrics {
  title: string;
  slug: string;
  artis_name: string;
  artis_slug: string;
  status_enum: StatusEnum;
  status_string: string;
  image?: string;
  created_at: string;
  created_by: string;
  id: number;
}
