import { createSlice } from "@reduxjs/toolkit";
import {
  BasePayload,
  BasePayloadPaginated,
  IPayloadData,
  IPayloadDataPaginated,
} from "../../utilities/type-utils";
import { IResListArtist } from "../../model/response/IResListArtist";
import { IResDetailArtist } from "../../model/response/IResDetailArtist";

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
    detailArtist: (
      state: IArtistReducers,
      action: BasePayload<IResDetailArtist>
    ) => {
      state.detailArtist = {
        loading: action.payload.loading,
        data: action.payload.data,
      };
    },
  },
});

export interface IArtistReducers {
  createArtist?: boolean;
  listArtist?: IPayloadDataPaginated<IResListArtist[]>;
  detailArtist?: IPayloadData<IResDetailArtist>;
}
