import { IResGetMeDataUser } from "../../model/response/IResGetMeData";
import { BasePayload, IPayloadData } from "../../utilities/type-utils";
import { createSlice } from "@reduxjs/toolkit";

const initState: IUserReducers = {};

export const UserSlice = createSlice({
  name: "user",
  initialState: initState,
  reducers: {
    getMeData: (
      state: IUserReducers,
      action: BasePayload<IResGetMeDataUser>
    ) => {
      state.getMeData = {
        data: action.payload.data,
        loading: action.payload.loading,
      };
    },
  },
});

export interface IUserReducers {
  getMeData?: IPayloadData<IResGetMeDataUser>;
}
