import { HttpService } from "../services/HttpService";
import ErrorService from "../services/ErrorService";
import { CaseReducerActions, PayloadAction } from "@reduxjs/toolkit";
import { GeneralSlice, IGeneralReducers } from "./reducers/general.reducers";
import QueryParamsHelper from "../helper/query-params-helper";
import { ActionsInitTypeEnum } from "../enums/actions-init-type-enum";

export default class BaseActions {
  get QueryParams(): QueryParamsHelper {
    return this._QueryParams;
  }

  get general(): CaseReducerActions<
    {
      setLoading: (
        state: IGeneralReducers,
        action: PayloadAction<IGeneralReducers>
      ) => {
        actionInitType: ActionsInitTypeEnum | undefined;
        loading: boolean | undefined;
      };
      setIsFinishFetchApi: (
        state: IGeneralReducers,
        action: PayloadAction<IGeneralReducers>
      ) => {
        actionInitType: ActionsInitTypeEnum | undefined;
        isSuccessFetchApi: boolean | undefined;
      };
      setMainLoading: (
        state: IGeneralReducers,
        action: PayloadAction<IGeneralReducers>
      ) => {
        mainLoading: boolean | undefined;
        actionInitType: ActionsInitTypeEnum | undefined;
      };
    },
    string
  > {
    return this._general;
  }

  get errorService(): ErrorService {
    return this._errorService;
  }

  get httpService(): HttpService {
    return this._httpService;
  }

  private _general = GeneralSlice.actions;
  private _httpService: HttpService = new HttpService();
  private _errorService: ErrorService = new ErrorService();
  private _QueryParams: QueryParamsHelper = new QueryParamsHelper();
}
