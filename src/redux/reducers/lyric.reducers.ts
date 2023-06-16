import { BasePayload, IPayloadData } from "../../utilities/type-utils";
import { createSlice } from "@reduxjs/toolkit";

const initState: ILyricReducers = {};

export const LyricsSlice = createSlice({
  name: "lyric",
  initialState: initState,
  reducers: {
    createLyric: (state: ILyricReducers, action: BasePayload<boolean>) => {
      state.createLyric = {
        data: action.payload.data,
        loading: action.payload.loading,
      };
    },
  },
});

export interface ILyricReducers {
  createLyric?: IPayloadData<boolean>;
}
