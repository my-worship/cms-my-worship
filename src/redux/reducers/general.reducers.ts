import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ActionsInitTypeEnum } from "../../enums/actions-init-type-enum";

const initState: IGeneralReducers = {
  isSuccessFetchApi: false,
  actionInitType: undefined,
  mainLoading: false,
  loading: false,
};
export const GeneralSlice = createSlice({
  name: "general",
  initialState: initState,
  reducers: {
    setIsFinishFetchApi: (
      state: IGeneralReducers,
      action: PayloadAction<IGeneralReducers>
    ) => {
      state.isSuccessFetchApi = action.payload.isSuccessFetchApi;
      state.actionInitType = action.payload.actionInitType;
      state.loading = action.payload.loading;
      state.mainLoading = action.payload.mainLoading;
    },
    setMainLoading: (
      state: IGeneralReducers,
      action: PayloadAction<IGeneralReducers>
    ) => {
      state.mainLoading = action.payload.mainLoading;
      state.actionInitType = action.payload.actionInitType;
    },
    setLoading: (
      state: IGeneralReducers,
      action: PayloadAction<IGeneralReducers>
    ) => {
      state.loading = action.payload.loading;
      state.actionInitType = action.payload.actionInitType;
    },
  },
});

export interface IGeneralReducers {
  isSuccessFetchApi?: boolean;
  actionInitType?: ActionsInitTypeEnum;
  mainLoading?: boolean;
  loading?: boolean;
}
