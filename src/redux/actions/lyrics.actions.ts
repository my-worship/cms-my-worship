import BaseActions from "../BaseActions";
import { endpoint } from "../../constants/endpoint";
import { LyricsSlice } from "../reducers/lyric.reducers";
import { IReqCreateNewLyrics } from "../../model/request/IReqCreateNewLyrics";
import { Dispatch } from "redux";
import { TypeLyricStatus } from "../../utilities/type-utils";
import { BaseResponsePaginated } from "../../utilities/base-response";
import { IResListLyrics } from "../../model/response/IResListLyrics";

export class LyricsActions extends BaseActions {
  private url = endpoint.lyrics;
  private lyric = LyricsSlice.actions;

  public getListLyricPaginated(status: TypeLyricStatus, param?: string) {
    return async (dispatch: Dispatch) => {
      dispatch(this.lyric.listPaginatedLyrics({ loading: true }));
      await this.httpService
        .GET(this.url.list_paginated_lyric(status, param))
        .then((res: BaseResponsePaginated<IResListLyrics[]>) => {
          dispatch(
            this.lyric.listPaginatedLyrics({
              loading: false,
              data: res.data.response_data,
              paginated_data: res.data.pagination_data,
            })
          );
        })
        .catch((e) => {
          this.errorService.fetchApiError(e);
          dispatch(this.lyric.listPaginatedLyrics({ loading: false }));
        });
    };
  }

  public createLyric(data: IReqCreateNewLyrics) {
    return async (dispatch: Dispatch) => {
      dispatch(this.lyric.createLyric({ loading: true }));
      await this.httpService
        .POST<IReqCreateNewLyrics>(this.url.create_lyrics, data)
        .then(() => {
          dispatch(this.lyric.createLyric({ loading: false, data: true }));
        })
        .catch((e) => {
          this.errorService.fetchApiError(e);
          dispatch(
            this.lyric.createLyric({
              data: undefined,
              loading: false,
            })
          );
        });
    };
  }

  public resetLyricReducer() {
    return async (dispatch: Dispatch) => {
      dispatch(this.lyric.createLyric({ data: undefined }));
    };
  }
}
