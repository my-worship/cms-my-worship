import BaseActions from "../BaseActions";
import { endpoint } from "../../constants/endpoint";
import { LyricsSlice } from "../reducers/lyric.reducers";
import { IReqCreateNewLyrics } from "../../model/request/IReqCreateNewLyrics";
import { Dispatch } from "redux";

export class LyricsActions extends BaseActions {
  private url = endpoint.lyrics;
  private lyric = LyricsSlice.actions;

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
