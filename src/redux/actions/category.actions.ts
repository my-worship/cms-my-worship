import BaseActions from "../BaseActions";
import { endpoint } from "../../constants/endpoint";
import { CategorySlice } from "../reducers/category.reducers";
import { Dispatch } from "redux";
import { BaseResponse } from "../../utilities/base-response";
import { IResGetListCategoriesSelect } from "../../model/response/IResGetListCategoriesSelect";

export class CategoryActions extends BaseActions {
  private url = endpoint.categories;
  private category = CategorySlice.actions;

  public getListCategorySelect() {
    return async (dispatch: Dispatch) => {
      dispatch(this.category.getListCategoriesSelect({ loading: true }));
      await this.httpService
        .GET(this.url.getListCategoriesSelect())
        .then((res: BaseResponse<IResGetListCategoriesSelect[]>) => {
          dispatch(
            this.category.getListCategoriesSelect({
              data: res.data.response_data,
              loading: false,
            })
          );
        })
        .catch((e) => {
          this.errorService.fetchApiError(e);
          dispatch(this.category.getListCategoriesSelect({}));
        });
    };
  }
}
