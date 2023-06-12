import { UserRoleEnum } from "../../enums/UserRoleEnums";

export interface IResGetMeDataUser {
  name: string;
  username: string;
  role: UserRoleEnum;
  image: string;
}
