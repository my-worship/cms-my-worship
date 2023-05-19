import BaseActions from "../BaseActions";
import { AuthSlice } from "../reducers/auth.reducers";
import { endpoint } from "../../constants/endpoint";
import { ILoginRequest } from "../../model/request/ILoginRequest";
import { Dispatch } from "redux";
import { BaseResponse } from "../../utilities/base-response";
import { ILoginResponse } from "../../model/response/ILoginResponse";
import AuthServices from "../../services/AuthService";

export class AuthActions extends BaseActions {
  private url = endpoint.auth;
  private auth = AuthSlice.actions;
  private authService = new AuthServices();

  public login(data: ILoginRequest) {
    return async (dispatch: Dispatch) => {
      dispatch(this.auth.login({ data: undefined, loading: true }));
      await this.httpService
        .POST<ILoginRequest>(this.url.login(), data)
        .then((res: BaseResponse<ILoginResponse>) => {
          this.authService.successLogin(res.data.response_data.access_token);
          this.auth.login({ data: true, loading: false });
        })
        .catch((e) => {
          this.errorService.swallApiError(e);
          this.auth.login({ data: undefined, loading: false });
        });
    };
  }
}
