import {
  BasePayload,
  BasePayloadPaginated,
  IPayloadData,
  IPayloadDataPaginated,
} from "../../utilities/type-utils";
import { createSlice } from "@reduxjs/toolkit";
import { IResListLyrics } from "../../model/response/IResListLyrics";

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
    listPaginatedLyrics: (
      state: ILyricReducers,
      action: BasePayloadPaginated<IResListLyrics[]>
    ) => {
      state.listLyric = {
        data: action.payload.data,
        loading: action.payload.loading,
        paginated_data: action.payload.paginated_data,
      };
    },
  },
});

export interface ILyricReducers {
  createLyric?: IPayloadData<boolean>;
  listLyric?: IPayloadDataPaginated<IResListLyrics[]>;
}
