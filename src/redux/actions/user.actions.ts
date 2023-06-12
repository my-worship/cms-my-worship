import BaseActions from "../BaseActions";
import { endpoint } from "../../constants/endpoint";
import { UserSlice } from "../reducers/user.reducers";
import { Dispatch } from "redux";
import { BaseResponse } from "../../utilities/base-response";
import { IResGetMeDataUser } from "../../model/response/IResGetMeData";

export class UserActions extends BaseActions {
  private url = endpoint.user;
  private user = UserSlice.actions;

  public getMeData() {
    return async (dispatch: Dispatch) => {
      dispatch(this.user.getMeData({ loading: true }));
      await this.httpService
        .GET(this.url.getMeData())
        .then((res: BaseResponse<IResGetMeDataUser>) => {
          dispatch(
            this.user.getMeData({
              loading: false,
              data: res.data.response_data,
            })
          );
        })
        .catch((e) => {
          this.errorService.fetchApiError(e);
          dispatch(this.user.getMeData({ loading: false }));
        });
    };
  }
}
