import BaseActions from "../BaseActions";
import { endpoint } from "../../constants/endpoint";
import { ArtistSlice } from "../reducers/artist.reducers";
import { IRequestNewArtist } from "../../model/request/IRequestNewArtist";
import { Dispatch } from "redux";
import { ActionsInitTypeEnum } from "../../enums/actions-init-type-enum";

export class ArtistActions extends BaseActions {
  private url = endpoint.artist;
  private artist = ArtistSlice.actions;

  public createArtist(data: IRequestNewArtist) {
    return async (dispatch: Dispatch) => {
      dispatch(
        this.general.setLoading({
          loading: true,
          actionInitType: ActionsInitTypeEnum.REQUEST_NEW_ARTIST,
        })
      );
      await this.httpService
        .POST<IRequestNewArtist>(this.url.create_artist(), data)
        .then(() => {
          dispatch(this.artist.createArtist({ data: true }));
          dispatch(
            this.general.setLoading({
              loading: false,
              actionInitType: ActionsInitTypeEnum.REQUEST_NEW_ARTIST,
            })
          );
        })
        .catch((e) => {
          dispatch(
            this.general.setLoading({
              loading: false,
              actionInitType: ActionsInitTypeEnum.REQUEST_NEW_ARTIST,
            })
          );
          this.errorService.fetchApiError(e);
        });
    };
  }

  public resetArtistReducers() {
    return async (dispatch: Dispatch) => {
      dispatch(this.artist.createArtist({ data: undefined }));
    };
  }
}
