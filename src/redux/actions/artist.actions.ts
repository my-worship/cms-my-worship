import BaseActions from "../BaseActions";
import { endpoint } from "../../constants/endpoint";
import { ArtistSlice } from "../reducers/artist.reducers";
import { IRequestNewArtist } from "../../model/request/IRequestNewArtist";
import { Dispatch } from "redux";
import { ActionsInitTypeEnum } from "../../enums/actions-init-type-enum";
import { TypeArtistStatus } from "../../utilities/type-utils";
import {
  BaseResponse,
  BaseResponsePaginated,
} from "../../utilities/base-response";
import { IResListArtist } from "../../model/response/IResListArtist";
import { IResDetailArtist } from "../../model/response/IResDetailArtist";

export class ArtistActions extends BaseActions {
  private url = endpoint.artist;
  private artist = ArtistSlice.actions;

  public approveArtist(slug: string) {
    return async (dispatch: Dispatch) => {
      dispatch(this.artist.approveArtist({ loading: true }));
      await this.httpService
        .PATCH(this.url.approveArtist(slug))
        .then(() => {
          dispatch(this.artist.approveArtist({ loading: false, data: true }));
        })
        .catch((e) => {
          this.errorService.fetchApiError(e);
          dispatch(this.artist.approveArtist({ loading: false, data: false }));
        });
    };
  }

  public getDetailArtistBySlug(slug: string) {
    return async (dispatch: Dispatch) => {
      dispatch(this.artist.detailArtist({ data: undefined, loading: true }));
      await this.httpService
        .GET(this.url.detailArtistBySlug(slug))
        .then((res: BaseResponse<IResDetailArtist>) => {
          dispatch(
            this.artist.detailArtist({
              data: res.data.response_data,
              loading: false,
            })
          );
        })
        .catch((e) => {
          this.errorService.fetchApiError(e);
          dispatch(
            this.artist.detailArtist({ data: undefined, loading: false })
          );
        });
    };
  }

  public getListArtist(status: TypeArtistStatus, param?: string) {
    return async (dispatch: Dispatch) => {
      dispatch(this.artist.listArtist({ loading: true, data: undefined }));
      await this.httpService
        .GET(this.url.getListArtist(status, param))
        .then((res: BaseResponsePaginated<IResListArtist[]>) => {
          dispatch(
            this.artist.listArtist({
              loading: false,
              data: res.data.response_data,
              paginated_data: res.data.pagination_data,
            })
          );
        })
        .catch((e) => {
          this.errorService.fetchApiError(e);
          dispatch(this.artist.listArtist({ loading: false, data: undefined }));
        });
    };
  }

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
      dispatch(this.artist.detailArtist({ data: undefined }));
      dispatch(this.artist.approveArtist({ data: undefined }));
      dispatch(this.artist.listArtist({ data: undefined }));
    };
  }
}
