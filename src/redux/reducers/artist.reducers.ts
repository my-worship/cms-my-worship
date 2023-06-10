import { createSlice } from "@reduxjs/toolkit";
import {
  BasePayload,
  BasePayloadPaginated,
  IPayloadDataPaginated,
} from "../../utilities/type-utils";
import { IResListArtist } from "../../model/response/IResListArtist";

const initState: IArtistReducers = {};

export const ArtistSlice = createSlice({
  name: "artist",
  initialState: initState,
  reducers: {
    createArtist: (state: IArtistReducers, action: BasePayload<boolean>) => {
      state.createArtist = action.payload.data;
    },
    listArtist: (
      state: IArtistReducers,
      action: BasePayloadPaginated<IResListArtist[]>
    ) => {
      state.listArtist = {
        paginated_data: action.payload.paginated_data,
        data: action.payload.data,
        loading: action.payload.loading,
      };
    },
  },
});

export interface IArtistReducers {
  createArtist?: boolean;
  listArtist?: IPayloadDataPaginated<IResListArtist[]>;
}
