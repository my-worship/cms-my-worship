import { createSlice } from "@reduxjs/toolkit";
import { BasePayload } from "../../utilities/type-utils";

const initState: IArtistReducers = {};

export const ArtistSlice = createSlice({
  name: "artist",
  initialState: initState,
  reducers: {
    createArtist: (state: IArtistReducers, action: BasePayload<boolean>) => {
      state.createArtist = action.payload.data;
    },
  },
});

export interface IArtistReducers {
  createArtist?: boolean;
}
