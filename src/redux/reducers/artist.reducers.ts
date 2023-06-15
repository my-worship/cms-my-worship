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
      state.createArtist = {
        loading: action.payload.loading,
        data: action.payload.data,
      };
    },
    saveDraftArtist: (state: IArtistReducers, action: BasePayload<boolean>) => {
      state.createArtist = {
        data: action.payload.data,
        loading: action.payload.loading,
      };
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
    approveArtist: (state: IArtistReducers, action: BasePayload<boolean>) => {
      state.approveArtist = {
        data: action.payload.data,
        loading: action.payload.loading,
      };
    },
    rejectArtist: (state: IArtistReducers, action: BasePayload<boolean>) => {
      state.rejectArtist = {
        data: action.payload.data,
        loading: action.payload.loading,
      };
    },
    reviseArtist: (state: IArtistReducers, action: BasePayload<boolean>) => {
      state.reviseArtist = {
        data: action.payload.data,
        loading: action.payload.loading,
      };
    },
    deleteArtist: (state: IArtistReducers, action: BasePayload<boolean>) => {
      state.reviseArtist = {
        data: action.payload.data,
        loading: action.payload.loading,
      };
    },
    editArtist: (state: IArtistReducers, action: BasePayload<boolean>) => {
      state.editArtist = {
        data: action.payload.data,
        loading: action.payload.loading,
      };
    },
  },
});

export interface IArtistReducers {
  createArtist?: IPayloadData<boolean>;
  listArtist?: IPayloadDataPaginated<IResListArtist[]>;
  detailArtist?: IPayloadData<IResDetailArtist>;
  approveArtist?: IPayloadData<boolean>;
  saveDraftArtist?: IPayloadData<boolean>;
  rejectArtist?: IPayloadData<boolean>;
  reviseArtist?: IPayloadData<boolean>;
  deleteArtist?: IPayloadData<boolean>;
  editArtist?: IPayloadData<boolean>;
}
