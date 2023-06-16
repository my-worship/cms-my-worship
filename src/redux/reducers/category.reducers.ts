import { BasePayload, IPayloadData } from "../../utilities/type-utils";
import { IResGetListCategoriesSelect } from "../../model/response/IResGetListCategoriesSelect";
import { createSlice } from "@reduxjs/toolkit";

const initValue: ICategoryReducers = {};
export const CategorySlice = createSlice({
  name: "categories",
  initialState: initValue,
  reducers: {
    getListCategoriesSelect: (
      state: ICategoryReducers,
      action: BasePayload<IResGetListCategoriesSelect[]>
    ) => {
      state.listCategorySelect = {
        data: action.payload.data,
        loading: action.payload.loading,
      };
    },
  },
});

export interface ICategoryReducers {
  listCategorySelect?: IPayloadData<IResGetListCategoriesSelect[]>;
}
