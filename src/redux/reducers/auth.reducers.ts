import { BasePayload, IPayloadSuccess } from "../../utilities/type-utils";
import { createSlice } from "@reduxjs/toolkit";

const initState: IAuthReducers = {};

export const AuthSlice = createSlice({
  name: "auth",
  initialState: initState,
  reducers: {
    login: (state: IAuthReducers, action: BasePayload<boolean>) => {
      state.login = {
        success: action.payload.data,
        loading: action.payload.loading,
      };
    },
  },
});

export interface IAuthReducers {
  login?: IPayloadSuccess;
}
